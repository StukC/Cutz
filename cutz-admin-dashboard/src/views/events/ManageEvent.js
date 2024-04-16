import React, { useEffect, useState } from "react";
import "../../assets/css/argon-dashboard-react.min.css";
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  Table,
  CardHeader,
  CardFooter,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
} from "reactstrap";

import { Popup } from "reactjs-popup";
import Header from "components/Headers/Header.js";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Urls } from "utilities/Urls";
import { getEvent } from "services/Event";
import { getOrganizationById } from "services/Organization";
import { delEvent } from "services/Event";
import Loader from "utilities/Loaders";
import { useSelector } from "react-redux";
import { ResultCounter } from "components/ResultCounter";
import EventEdit from "components/EventEdit";
import { getOrganizations } from "services/Organization";
import moment from "moment";
import DataTable from "react-data-table-component";
import { MyBottomTabs } from "components/MyBottomTabs";

function ManageEvent() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [eventData, setEventData] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [eventId, setEventId] = useState("");
  const [event, setEvent] = useState({});
  const [events, setEvents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.CreateUserReducer);
  const token = localStorage.getItem("token");
  const organization = localStorage.getItem("organization");
  const isSuperAdmin = localStorage.getItem("isSuperAdmin");

  // Define columns in the Manage Events table
  const columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      // sortable: true,
    },
    {
      name: "# People",
      sortable: true,
      selector: (row) => row.eventCapacity,
      width: '150px',
    },
    {
      name: "# Groups",
      sortable: true,
      selector: (row) => row.numberOfGroups,
      width: '150px',
    },
    // {
    //   name: "Group Size",
    //   sortable: true,
    //   selector: (row) => Math.floor(row.eventCapacity / row.numberOfGroups),
    //   width: '150px',
    // },
    {
      name: "Units to Distribute",
      sortable: true,
      selector: (row) => row.unitsToDistribute,
      width: '175px',
    },
    {
      name: "Price Per Unit",
      sortable: true,
      selector: (row) => {
        const unitPrice = parseFloat(row.unitPrice);
        return isNaN(unitPrice) ? '' : unitPrice.toFixed(2);
      },
      width: '150px',
    },
    {
      name: "Group Time",
      sortable: true,
      selector: (row) => row.groupServicePeriod ,
      width: '150px',
    },
    {
      name: "Organization",
      sortable: true,
      selector: (row) => row.orgId.organizationName,
      width: '150px',
    },
    {
      name: "Event Type",
      sortable: true,
      selector: (row) => row.eventType,
      width: '150px',
    },
    {
      name: "Location",
      sortable: true,
      selector: (row) => row.addresses[0].house,
      width: '200px',
    },
    {
      name: "Start Time",
      sortable: true,
      selector: (row) =>
        moment(row?.group?.eventStartTime).utc().format("MM/DD/YY h:ss A"),
        width: '200px',
    },
    {
      name: "End Time",
      sortable: true,
      selector: (row) =>
        moment(row?.group?.eventEndTime).utc().format("MM/DD/YY h:ss A"),
        width: '200px',
    },
    {
      name: "Delete",
      sortable: true,
      selector: (row) => <MyActionBtn e={row} />,
    },
    // Comment out for report column in Manage Clients
    // No functionality to support reporting admins
    // {
    //   name: "Report",
    //   sortable: true,
    //   selector: (row) => (
    //     <div className="d-flex">
    //       <div onClick={() => addEventRecord(row)}>
    //         <img
    //           width={30}
    //           src={require("../../assets/img/imges/Group (2).png")}
    //           alt=""
    //           style={{ color: "black" }}
    //         />
    //       </div>
    //     </div>
    //   ),
    // 
    //
    // },
  ];

  // Function component for rendering delete action button
  const MyActionBtn = ({ e }) => (
    <div className="">
      <div>
        {/* Popup component for confirmation dialog */}
        <Popup
          className="popup"
          trigger={
            <button
              className="edit"
              type="submit"
              position="fixed"
              onMouseOver={() => setEventId(e._id)}
            >
              Delete
            </button>
          }
          modal
          // Close the popup when clicking outside
          closeOnDocumentClick
          contentStyle={{
            maxWidth: "300px",
            padding: "20px",
            background: "#fff",
          }}
          overlayStyle={{
            background: "rgba(0, 0, 0, 0.7)",
          }}
        >
          {(close) => (
            <div>
              <h2 className="text-center d-flex justfy-content-center align-item-center readyreadeem">
                Are you sure you want to delete this item
              </h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <button
                  className="mainbuttonss "
                  onClick={() => {
                    // handleNo();
                    close();
                  }}
                >
                  No
                </button>
                <button
                  className="mainbuttonss"
                  type="submit"
                  onClick={() => {
                    close();
                    // Call the delEvent function to delete the event
                    delEvent(eventId)
                      .then(() => {
                        // Reload the page after deletion
                        window.location.reload();
                      })
                      .catch((e) => {
                        alert(e);
                      });
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </div>
  );

  useEffect(() => {
    // Redirect to login page if token is not available
    if (!token) {
      navigate("/");
    }
    setLoading(true);
    getEvent()
      .then((events) => {
        getOrganizations()
          // Fetch organization data
          .then((orgs) => {
            axios
              .get(`${Urls.BaseUrl}${Urls.TIMING}`)
              .then((groups) => {
                // Set state variables with fetched data
                setEvents(events.data);
                setOrgs(orgs.data);
                setGroups(groups.data);
                console.log("groups.data", groups.data);
                setLoading(false);
              })
              .catch((e) => {
                setLoading(false);
                alert(e);
              });
          })
          .catch(() => {
            setLoading(false);
          });
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // Merge organization data with event data
  const mergeOrgData = () => {
    let data = [];
    events.map((event) => {
      // Find corresponding organization and group data for each event
      let org = orgs.find((o) => o._id === event.orgId);
      let group = groups.find((g) => g.eventId?._id === event._id);
      // Push the merged data into the 'data' array
      data.push({ ...event, org, group });
    });

    // Filter data based on user's role (super admin or not)
    let filterData;
    if (isSuperAdmin === "0") {
      filterData = data.filter(
        (item) => item.orgId.organizationName === organization
      );
    } else filterData = data;

    setEventList(filterData);
    setEventData(filterData);
  };

  // Effect hook to call mergeOrgData function when 'orgs' state variable changes
  useEffect(() => {
    mergeOrgData();
  }, [orgs]);

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate("/admin/createvent");
  };

  // Function to add an event record
  const addEventRecord = async (row) => {
    console.log("row data", row);
    let data = {
      eventId: row._id,
      orgId: row.orgId._id,
      eventType: row.eventType,
      location: row.location,
      addresses: row.addresses,
      eventCapacity: row.eventCapacity,
      groupServicePeriod: row.groupServicePeriod,
      volunteerCapacity: row.volunteerCapacity,
      checkInCode: "abc",
      checkOutCode: "abc",
      numberOfGroups: 8,
      unitsToDistribute: row.unitsToDistribute,
      unitPrice: row.unitPrice,
      organizationName: row.orgId?.organizationName,
      priorEventStartTime: row.group?.eventStartTime,
      priorEventEndTime: row.group?.priorEventEndTime,
      eventStartTime: row.group?.eventStartTime,
      eventEndTime: row.group?.eventEndTime,
      afterEventStartTime: row.group?.afterEventStartTime,
      afterEventEndTime: row.group?.afterEventEndTime,
      groupSize: Math.floor(row.eventCapacity / 8),
    };

    // Send a POST request to create the event record
    await axios
      .post(Urls.BaseUrl + "api/v1/eventRecord", data)
      .then((result) => {
        alert(result.data.message);
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
      <Header />

      <div className="mb-3 p-4 mb-6 admin">
        <div>
          <h1 className="admin">Events</h1>
        </div>
        <div>
          <h5 className="admin">Welcome to your Event Manager</h5>
        </div>
      </div>

      {/* Page content */}
      <Container className="mt--7 bg-gradient-info " fluid>
        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <div className="d-flex justify-content-between">
                  <div>
                    <Form className="navbar-search navbar-search-dark form-inline mr-3 ml-lg-auto">
                      <FormGroup className="mb-0">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fas fa-search" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Search"
                            type="text"
                            onChange={(e) => {
                              let s = e.target.value;
                              let filterData = eventData.filter(
                                (a) =>
                                  a.orgId?.organizationName
                                    .toLowerCase()
                                    .includes(s) ||
                                  a.eventType.toLowerCase().includes(s) ||
                                  a.addresses[0].house.toLowerCase().includes(s)
                              );
                              setEventList(filterData);
                            }}
                          />
                        </InputGroup>
                        <ResultCounter list={eventList} />
                      </FormGroup>
                    </Form>
                  </div>
                  <div>
                    <button onClick={navigateHome} className="mainbuttons">
                      Add Event
                    </button>
                  </div>
                </div>
              </CardHeader>
              {/* <Loader /> */}
              <DataTable
                customStyles={{
                  headRow: {
                    style: {
                      backgroundColor: "#FF6B1D",
                      color: "white",
                      fontWeight: "bold",
                    },
                  },
                }}
                progressPending={loading}
                columns={columns}
                data={eventList}
                pagination
                striped
              />
            </Card>
          </div>
        </Row>
        <MyBottomTabs screenType={3} />
      </Container>
    </>
  );
}

export default ManageEvent;
