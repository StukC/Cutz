
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardBody, CardTitle, Container, Row, Col,
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
import moment from "moment";
import DataTable from "react-data-table-component";
import Loader from "utilities/Loaders";
import axios from "axios";

import { Urls } from "utilities/Urls";

import { ResultCounter } from "components/ResultCounter";
import Header from "components/Headers/Header.js";
import { MyBottomTabs } from "components/MyBottomTabs";

import '../../assets/css/argon-dashboard-react.min.css';


function EventRecord() {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [eventRecord, setEventRecord] = useState([]);
    const organization = localStorage.getItem("organization");
    const isSuperAdmin = localStorage.getItem("isSuperAdmin");

    useEffect(()=>{
        const getEventRecords = async () =>{
            await axios.get(Urls.BaseUrl + "api/v1/eventRecord/")
              .then((result)=>{
                let filterData;
                if(isSuperAdmin === '0'){ 
                    filterData = result.data.filter((item)=> item?.organizationName === organization)
                 } else filterData = result.data;
                 
                setEventRecord(filterData)
                setLoading(false);
              }).catch((error)=>{
                setLoading(false);
                console.log('Error', error);
              })
        }
        getEventRecords();
    },[])

    const columns = [
    {
        name: "ID",
        selector: (row, index) => index + 1,
    },
    {
        name: "# People",
        sortable: true,
        selector: (row) => row.eventCapacity,
    },
   // {
     //   name: "# Groups",
      //  sortable: true,
     //   selector: (row) =>row.numberOfGroups,
   // },
  //  {
   //     name: "Group Size",
   //     sortable: true,
  //      selector: (row) => Math.floor(row.eventCapacity / row.numberOfGroups),
   // },
    {
        name: "Organization",
        sortable: true,
        selector: (row) => row.organizationName,
    },
    {
        name: "Event",
        sortable: true,
        selector: (row) => row.eventType,
    },
    {
        name: "Location",
        sortable: true,
        selector: (row) => row.addresses[0].house,
    },
    {
        name: "Start Time",
        sortable: true,
        selector: (row) =>
        moment(row.eventStartTime).utc().format("MM/DD/YY h:s A"),
    },
    {
        name: "End Time",
        sortable: true,
        selector: (row) =>
        moment(row.eventEndTime).utc().format("MM/DD/YY h:s A"),
    },
   // {
    //    name: "Served",
    //    sortable: true,
    //    selector: (row) => row.numberOfClientsServed,
   // },
   // {
     //   name: "Total number",
     //   sortable: true,
       // selector: (row) => row.totalNumberOfPeopleServed,
   // }
    ];

    return (
        <>
            <Header />

            <div className="mb-3 p-4 mb-6 admin">
                <div><h1 className="admin">Event Records</h1></div>
                <div><h5 className="admin">Welcome to your Events Record Manager</h5></div>
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
                                                        let filterData = eventRecord.filter(
                                                          (a) =>
                                                            a.organizationName.toLowerCase().includes(s) ||
                                                            a.eventType.toLowerCase().includes(s) ||
                                                            a.addresses[0].house.toLowerCase().includes(s)
                                                        );
                                                        setEventRecord(filterData);
                                                    }}
                                                    />
                                                </InputGroup>
                                                <ResultCounter list={eventRecord} />
                                            </FormGroup>
                                        </Form>
                                    </div>
                                    {/* <div>
                                        <button onClick={navigateHome} className="mainbuttons">Add Event</button>
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
                                progressComponent={<Loader />}
                                data={eventRecord}
                                columns={columns}
                                pagination
                                striped
                            />
                        </Card>
                    </div>
                </Row>
                <MyBottomTabs screenType={3}/>
            </Container>
        </>
    );
};

export default EventRecord;
