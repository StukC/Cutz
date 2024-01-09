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
import { Urls } from "utilities/Urls";
import moment from "moment";
import { ResultCounter } from "components/ResultCounter";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { MyBottomTabs } from "components/MyBottomTabs";

function VolunteersRecord() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [volunteerList, setVolunteerList] = useState([]);
  const [volunteerData, setVolunteerData] = useState([]);
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
    {width: '200px',
      name: "First Name",
      sortable: true,
      selector: (row) => row?.firstName,
    },
    {width: '200px',
      name: "Last Name",
      sortable: true,
      selector: (row) => row?.lastName,
    },
    {width: '200px',
      name: "Organization",
      sortable: true,
      selector: (row) => row?.organizationName,
    },
    {width: '200px',
      name: "Event",
      sortable: true,
      selector: (row) => row?.eventType,
    },
    {width: '200px',
      name: "Location",
      sortable: true,
      selector: (row) => row?.addresses?.[0].place,
    },
   // {
     // name: "Reserved Time",
    //  sortable: true,
    //  selector: (row) =>
   //     moment(row?.reservedTime).utc().format("MM/DD/YY h:s A"),
   // },
   // {
    //  name: "End Time",
   //   sortable: true,
  //    selector: (row) => moment(row?.endTime).utc().format("MM/DD/YY h:s A"),
  //  },
    {width: '200px',
      name: "Check In",
      sortable: true,
      selector: (row) =>
      row.checkIn ? row.checkIn : "null",
    },
    {width: '200px',
      name: "Check Out",
      sortable: true,
      selector: (row) =>
      row.checkOut ? row.checkOut : "null",
    },
   // {
    // name: "Status",
     // sortable: true,
     // selector: (row) => "Present at",
   // },
  ];

  const getVolunteerRecords = async () => {
    setLoading(true);
    await axios
      .get(Urls.BaseUrl + "api/v1/volunteerRecord/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((record) => {
        let filterData;

        if (isSuperAdmin === "0") {
          filterData = record.data.filter(
            (item) => item?.organizationName === organization
          );
        } else filterData = record.data;

        setVolunteerList(filterData);
        setVolunteerData(filterData);
        console.log("DATA", record.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        alert(e);
      });
  };

  // const getVolunteerRes = async () => {
  //   setLoading(true);
  //   await axios
  //     .get(Urls.BaseUrl + Urls.EVENTS_RESERVATION_VOLUNTEER + "/getall")
  //     .then((reserves) => {
  //       axios
  //         .get(`${Urls.BaseUrl}${Urls.GET_VOLUNTEER}/getall`)
  //         .then((volunteer) => {
  //           axios
  //             .get(`${Urls.BaseUrl}${Urls.TIMING}`)
  //             .then((groups) => {
  //               axios
  //                 .get(`${Urls.BaseUrl}${Urls.GET_EVENTS}`)
  //                 .then((events) => {
  //                   setVolunteerRes(reserves.data);
  //                   setVolunteerGroups(groups.data);
  //                   setVolunteers(volunteer.data);
  //                   setVolunteerEvents(events.data);
  //                   setLoading(false);
  //                 })
  //                 .catch((e) => {
  //                   setLoading(false);
  //                   alert(e);
  //                 });
  //             })
  //             .catch((e) => {
  //               setLoading(false);
  //               alert(e);
  //             });
  //         })
  //         .catch((e) => {
  //           setLoading(false);
  //           alert(e);
  //         });
  //     })
  //     .catch((e) => {
  //       setLoading(false);
  //       alert(e);
  //     });
  // };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    getVolunteerRecords();
  }, []);

  // useEffect(() => {
  //   let data = [];
  //   volunteerRes.map((reserve) => {
  //     let volunteer = volunteers.find((c) => c._id === reserve.volunteerID);
  //     let group = volunteerGroups.find((g) => g._id === reserve.eventGroupID);
  //     let event = volunteerEvents.find((e) => e._id === reserve.eventID);
  //     data.push({ ...reserve, volunteer, group, event });
  //   });

  //   let filterData;
  //   if (isSuperAdmin === '0'){
  //     filterData = data.filter((item) => item?.volunteer?.organization === organization)
  //   } else filterData = data

  //   setVolunteerList(filterData);
  //   setVolunteerData(filterData);
  // }, [volunteerEvents]);

  return (
    <>
      <Header />

      <div className="mb-3 p-4 mb-6 admin">
        <div>
          <h1 className="admin">Volunteer Records</h1>
        </div>
        <div>
          <h5 className="admin">Welcome to your Volunteers Record Manager</h5>
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
                                  a.firstName
                                    .toLowerCase()
                                    .includes(s) ||
                                  a.lastName.toLowerCase().includes(s)
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

export default VolunteersRecord;
