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
import { Urls } from "utilities/Urls";
import axios from "axios";
import moment from "moment";
import { ResultCounter } from "components/ResultCounter";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { MyBottomTabs } from "components/MyBottomTabs";
import {} from "services/client";
import Popup from "reactjs-popup";
import { delClientReservation } from "services/client";

function ClientsSchedule() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientList, setClientList] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [clientId, setClientId] = useState("");
  const token = localStorage.getItem("token");
  const organization = localStorage.getItem("organization");
  const isSuperAdmin = localStorage.getItem("isSuperAdmin");

  const columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
    },
    {
      name: "First Name",
      sortable: true,
      selector: (row) => row.clientID?.firstName,
      width: '200px',
    },
    {
      name: "Last Name",
      sortable: true,
      selector: (row) => row.clientID?.lastName,
      width: '200px',
    },
    {
      name: "Family Size",
      sortable: true,
      selector: (row) => row.clientID.familySize,
      width: '150px',
    },
    {
      name: "Organization",
      sortable: true,
      selector: (row) => row.eventID?.orgId?.organizationName,
      width: '200px',
    },
    {
      name: "Event",
      sortable: true,
      selector: (row) => row.eventID?.eventType,
      width: '200px',
    },
    {
      name: "Location",
      sortable: true,
      selector: (row) => row.eventID?.addresses?.[0].place,
      width: '200px',
    },
   // {
     // name: "Reserved Time",
     // sortable: true,
     // selector: (row) =>
     //   moment(row.groupID?.eventStartTime).utc().format("MM/DD/YY"),
   // },
    {width: '200px',
      name: "Check In",
      sortable: true,
      selector: (row) =>
        row.checkIN ? row.checkIN: "null",
    },
    {width: '200px',
      name: "Check Out",
      sortable: true,
      selector: (row) =>
        row.checkOut ? row.checkOut : "null",
    },
   // {
    //  name: "Access",
   //   sortable: true,
   //   selector: (row) => <td className="text-right">ended at</td>,
   // },
   // {
    //  name: "Status",
    //  sortable: true,
    //  selector: (row) => <td className="text-right">present at</td>,
   // },
    {
      name: "Action",
      sortable: true,
      selector: (row) => <MyActionBtn c={row} />,
    },
  ];

  const MyActionBtn = ({ c }) => (
    <div>
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
                  delClientReservation(c._id, localStorage.getItem("token"))
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
  const getClientRes = async () => {
    setLoading(true);
    await axios
      .get(Urls.BaseUrl + Urls.EVENTS_RESERVATION_CLIENT + "/getall")
      .then((reserves) => {
        let filterData;

        if (isSuperAdmin === "0") {
          filterData = reserves.data.filter(
            (item) => item?.eventID?.orgId?.organizationName === organization
          );
        } else filterData = reserves.data;

        setClientList(filterData);
        setClientData(filterData);
        setLoading(false);
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
    getClientRes();
  }, []);

  return (
    <>
      <Header />

      <div className="mb-3 p-4 mb-6 admin">
        <div>
          <h1 className="admin">Clients Schedule</h1>
        </div>
        <div>
          <h5 className="admin">Welcome to your Clients Schedule Manager</h5>
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

                              let filterData = clientData.filter(
                                (a) =>
                                  a.clientID?.firstName
                                    .toLowerCase()
                                    .includes(s) ||
                                  a.clientID?.lastName
                                    .toLowerCase()
                                    .includes(s) ||
                                  a.clientID?.email.toLowerCase().includes(s)
                              );
                              setClientList(filterData);
                            }}
                          />
                        </InputGroup>
                        <ResultCounter list={clientList} />
                      </FormGroup>
                    </Form>
                  </div>
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
                data={clientList}
                pagination
                striped
              />
            </Card>
          </div>
        </Row>
        <MyBottomTabs screenType={1} />
      </Container>
    </>
  );
}

export default ClientsSchedule;
