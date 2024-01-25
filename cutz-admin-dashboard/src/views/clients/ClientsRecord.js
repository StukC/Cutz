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

import Header from "../../components/Headers/Header.js";
import axios from "axios";
import Loader from "utilities/Loaders";
import { Urls } from "utilities/Urls";
import moment from "moment";
import { ResultCounter } from "components/ResultCounter";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { MyBottomTabs } from "components/MyBottomTabs";

function ClientsRecord() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientList, setClientList] = useState([]);
  const [clientData, setClientData] = useState([]);
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
      selector: (row) => row.firstName,
      width: '200px',
    },
    {
      name: "Last Name",
      sortable: true,
      selector: (row) => row.lastName,
      width: '200px',
    },
    {
      name: "Family Size",
      sortable: true,
      selector: (row) => row.familySize,
      width: '150px',
    },
    {
      name: "Organization",
      sortable: true,
      selector: (row) => row.organizationName,
      width: '200px',
    },
    {
      name: "Event",
      sortable: true,
      selector: (row) => row.eventType,
      width: '200px',
    },
    {
      name: "Location",
      sortable: true,
      selector: (row) => row.addresses?.[0].place,
      width: '200px',
    },
   // {
    //  name: "Reserved Time",
    //  sortable: true,
    //  selector: (row) =>
     //   row.reservedTime
       //   ? moment(row.reservedTime).utc().format("MM/DD/YY")
       //   : "null",
   // },
    {width: '200px',
      name: "Check In",
      sortable: true,
      selector: (row) =>
        row.checkIn ? row.checkIn : "null",
    },
    { width: '200px',
      name: "Check Out",
      sortable: true,
      selector: (row) =>
        row.checkOut ? row.checkOut: "null",
    },
  ];

  const getClientRecords = async () => {
    setLoading(true);
    await axios
      .get(Urls.BaseUrl + "api/v1/clientRecord/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((reserves) => {
        let filterData;

        if (isSuperAdmin === "0") {
          filterData = reserves.data.filter(
            (item) => item?.organizationName === organization
          );
        } else filterData = reserves.data;

        setClientList(filterData);
        setClientData(filterData);
        console.log("DATA", reserves.data);
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
    getClientRecords();
  }, []);

  return (
    <>
      <Header />

      <div className="mb-3 p-4 mb-6 admin">
        <div>
          <h1 className="admin">Client Records</h1>
        </div>
        <div>
          <h5 className="admin">Welcome to your Client Record Manager</h5>
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
                                  a.firstName
                                    .toLowerCase()
                                    .includes(s) ||
                                  a.lastName.toLowerCase().includes(s)
                              );
                              setClientList(filterData);
                            }}
                          />
                        </InputGroup>
                        <ResultCounter list={clientList} />
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

export default ClientsRecord;
