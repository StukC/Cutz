import React, { useEffect, useState } from "react";
// reactstrap
import "../assets/css/argon-dashboard-react.min.css";
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
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Urls } from "utilities/Urls";
import { delAdmin } from "services/client";
import Lottie from "react-lottie";
import loaderAnimation from "assets/Loaders";
import Loader from "utilities/Loaders";
import { ResultCounter } from "components/ResultCounter";
import AdminEdit from "components/AdminEdit";
import DataTable from "react-data-table-component";
import { MyBottomTabs } from "components/MyBottomTabs";

function Index() {
  const navigate = useNavigate();
  const columns = [
    {
      name: "ID",
      selector: (row,index) => index+1,
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
      name: "Organization",
      sortable: true,
      selector: (row) => row.organization,
      width: '200px',
    },
    {
      name: "Email",
      sortable: true,
      selector: (row) => row.email,
      width: '250px',
    },
    {
      name: "Address",
      sortable: true,
      selector: (row) => row.address,
      width: '200px',
    },
    {width: '150px',
      name: "Activation",
      sortable: true,
      selector: (row) => (row.activeStatus ? "Activated" : "Deactivated"),
    },
   // {
     // name: "Last Seen",
    //  sortable: true,
    //  selector: (row) => moment(row.lastLogin).utc().format("DD/MM/YY"),
   // },
    {width: '150px',
      name: "Status",
      sortable: true,
      selector: (row) => moment(row.dateCreated).utc().format("DD/MM/YY") ===
      moment().utc().format("DD/MM/YY")
        ? "New Account"
        : "Old Account",
    },
    {
      name: "Action",
      sortable: true,
      selector: (row) => <MyActionBtn a={row} />,
    },
  ];



  const navigateHome = () => {
    // 👇️ navigate to /
    navigate("/admin/addadmin");
  };
  const [loading, setLoading] = useState(false);
  const [adminData, setAdminData] = useState([]);
  const [adminList, setAdminList] = useState([]);
  const [adminId, setAdminId] = useState("");
  const [admin, setAdmin] = useState({});
  const token = localStorage.getItem("token");
  const { user } = useSelector((state) => state.CreateUserReducer);
  // const handleYes = () => {
  //       // Handle "Yes" button click
  //       // navigate('/redeemed')
  //   };

  //   const handleNo = () => {
  //     // Handle "No" button click
  //     Popup.close();;
  // };
  const MyActionBtn = ({ a }) => (
    <>
      <div className="mr-2">
        <Popup
          className="popup"
          trigger={
            <button
              className="edit"
              type="submit"
              position="center"
              onMouseOver={() => setAdmin(a)}
            >
              Edit
            </button>
          }
          modal
          closeOnDocumentClick
          contentStyle={{
            // maxWidth: "300px",
            // padding: "20px",
            width: "80%",
            // height:"1"
            // background: "#fff",
          }}
          overlayStyle={{
            background: "rgba(0, 0, 0, 0.7)",
          }}
        >
          {(close) => <AdminEdit user={admin} />}
        </Popup>
      </div>
      <div>
        <Popup
          className="popup"
          trigger={
            <button
              className="edit"
              type="submit"
              position="center"
              onMouseOver={() => {
                setAdminId(a._id);
              }}
            >
              Delete
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
                Are you sure you want to delete this item
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
                    delAdmin(adminId, localStorage.getItem("token"))
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
    </>
  );

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    setLoading(true);
    axios
      .get(Urls.BaseUrl + "api/v1/admin/getall")
      .then((r) => {
        let filterData = r.data.filter((item)=> item._id !== '6497447e1169a729de270e02')
        setAdminData(filterData);
        setAdminList(filterData);
        setLoading(false);
      })
      .catch((e) => {
        alert(e);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />

      <div className="mb-3 p-4 mb-6 admin">
        <div>
          <h1 className="admin">Cutz Owner Dashboard</h1>
        </div>
        <div>
          <h3 className="admin">
          Welcome Michele!
            <br /> 
          </h3>
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
                              let filterData = adminData.filter(
                                (a) =>
                                  a.firstName.toLowerCase().includes(s) ||
                                  a.lastName.toLowerCase().includes(s) ||
                                  a.email.toLowerCase().includes(s)
                              );
                              setAdminList(filterData);
                            }}
                          />
                        </InputGroup>
                        <ResultCounter list={adminList} />
                      </FormGroup>
                    </Form>
                  </div>
                  <div>
                    <button onClick={navigateHome} className="mainbuttons">
                      Add Organization
                    </button>
                  </div>
                </div>
              </CardHeader>
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
                data={adminList}
                pagination
                striped

              />
            </Card>

          </div>
        </Row>
        <MyBottomTabs screenType={0}/>
      </Container>
    </>
  );
}

export default Index;
