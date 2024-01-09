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

import Header from "components/Headers/Header.js";
import Loader from "utilities/Loaders";
import axios from "axios";
import moment from "moment";
import { Urls } from "utilities/Urls";
import { ResultCounter } from "components/ResultCounter";
import { useNavigate } from "react-router-dom";
import { MyBottomTabs } from "components/MyBottomTabs";
import DataTable from "react-data-table-component";
import Popup from "reactjs-popup";
import { delVolunteerReservation } from "services/client";

function VolunteersSchedule() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [volunteerList, setVolunteerList] = useState([]);
  const [volunteerData, setVolunteerData] = useState([]);
  const [volunteerRes, setVolunteerRes] = useState([]);
  const [volunteerEvents, setVolunteerEvents] = useState([]);
  const [volunteerGroups, setVolunteerGroups] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [volunteerId, setVolunteerId] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const organization = localStorage.getItem("organization");
  const isSuperAdmin = localStorage.getItem("isSuperAdmin");

  const columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      // sortable: true,
    },
    {
      name: "First Name",
      sortable: true,
      selector: (row) => row.volunteer?.firstName,
      width: '200px',
    },
    {
      name: "Last Name",
      sortable: true,
      selector: (row) => row.volunteer?.lastName,
      width: '200px',
    },
    {
      name: "Organization",
      sortable: true,
      selector: (row) => row.event?.orgId?.organizationName,
      width: '200px',
    },
    {
      name: "Event",
      sortable: true,
      selector: (row) => row?.event?.eventType,
      width: '200px',
    },
    {
      name: "Location",
      sortable: true,
      selector: (row) => row?.event?.addresses?.[0].place,
      width: '200px',
    },
   // {
    //  name: "Reserved Time",
    //  sortable: true,
    //  selector: (row) =>
    //    moment(row?.group?.eventStartTime).utc().format("MM/DD/YY h:s A"),
   // },
   // {
    //  name: "End Time",
    //  sortable: true,
    //  selector: (row) =>
     //   moment(row?.group?.eventEndTime).utc().format("MM/DD/YY h:s A"),
   // },
    { width: '200px',
      name: "Check In",
      sortable: true,
      selector: (row) =>
        row.checkIN ? row.checkIN : "null",
    },
    {
      name: "Check Out",
      sortable: true,
      selector: (row) =>
        row.checkOut ? row.checkOut : "null",
        width: '200px',
    },
   // {
     // name: "Access",
     // sortable: true,
    // selector: (row) => "ended at",
   // },
   // {
    //  name: "Status",
     // sortable: true,
    //  selector: (row) => "Present at",
   // },
    {
      name: "Action",
      sortable: true,
      selector: (row) => <MyActionBtn v={row} />,
    },
  ];
  const MyActionBtn = ({ v }) => (
    <div>
      {console.log("data", v)}
      <Popup
        className="popup"
        trigger={
          <button className="edit" type="submit" position="center">
            Cancel
          </button>
        }
        modal
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
              Are you sure you want to Cancel this
            </h2>
            {/* <p>Are you sure you want to proceed?</p> */}
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
                  delVolunteerReservation(v._id, localStorage.getItem("token"))
                    .then(() => {
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
  );
  const getVolunteerRes = async () => {
    setLoading(true);
    await axios
      .get(Urls.BaseUrl + Urls.EVENTS_RESERVATION_VOLUNTEER + "/getall")
      .then((reserves) => {
        axios
          .get(`${Urls.BaseUrl}${Urls.GET_VOLUNTEER}/getall`)
          .then((volunteer) => {
            axios
              .get(`${Urls.BaseUrl}${Urls.TIMING}`)
              .then((groups) => {
                axios
                  .get(`${Urls.BaseUrl}${Urls.GET_EVENTS}`)
                  .then((events) => {
                    setVolunteerRes(reserves.data);
                    setVolunteerGroups(groups.data);
                    setVolunteers(volunteer.data);
                    setVolunteerEvents(events.data);
                    setLoading(false);
                  })
                  .catch((e) => {
                    setLoading(false);
                    alert(e);
                  });
              })
              .catch((e) => {
                setLoading(false);
                alert(e);
              });
          })
          .catch((e) => {
            setLoading(false);
            alert(e);
          });
      })
      .catch((e) => {
        setLoading(false);
        alert(e);
      });
  };
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    getVolunteerRes();
  }, []);

  useEffect(() => {
    let data = [];
    volunteerRes.map((reserve) => {
      let volunteer = volunteers.find((c) => c._id === reserve.volunteerID);
      let group = volunteerGroups.find((g) => g._id === reserve.eventGroupID);
      let event = volunteerEvents.find((e) => e._id === reserve.eventID);
      data.push({ ...reserve, volunteer, group, event });
    });
    let filterData;

    if (isSuperAdmin === "0") {
      filterData = data.filter(
        (item) => item?.event?.orgId?.organizationName === organization
      );
    } else filterData = data;

    setVolunteerList(filterData);
    setVolunteerData(filterData);
  }, [volunteerEvents]);

  return (
    <>
      <Header />

      <div className="mb-3 p-4 mb-6 admin">
        <div>
          <h1 className="admin">Volunteer Schedules</h1>
        </div>
        <div>
          <h5 className="admin">Welcome to your Volunteers Schedule Manager</h5>
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
                    <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
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

                              let filterData = volunteerData.filter(
                                (a) =>
                                  a.volunteer?.firstName
                                    .toLowerCase()
                                    .includes(s) ||
                                  a.volunteer?.lastName
                                    .toLowerCase()
                                    .includes(s) ||
                                  a.volunteer?.email.toLowerCase().includes(s)
                              );
                              setVolunteerList(filterData);
                            }}
                          />
                        </InputGroup>
                        <ResultCounter list={volunteerList} />
                      </FormGroup>
                    </Form>
                  </div>
                  {/* <div>
                    <button className="mainbuttons">Add Admin</button>

                  </div> */}
                </div>
              </CardHeader>
              <DataTable
                customStyles={{
                  headRow: {
                    style: {
                      backgroundColor: "#F07E2B",
                      color: "white",
                      fontWeight: "bold",
                    },
                  },
                }}
                progressPending={loading}
                columns={columns}
                data={volunteerList}
                pagination
                striped
              />
            </Card>
          </div>
        </Row>
        <div className="header bg-gradient-info pb-3 pt-5 pt-md-5">
          <MyBottomTabs screenType={2} />
        </div>
      </Container>
    </>
  );
}

export default VolunteersSchedule;
