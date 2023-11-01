import loaderAnimation from "assets/Loaders";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
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
import { getVolunteer } from "services/client";
import { getClients } from "services/client";
import { Urls } from "utilities/Urls";

export const MyBottomTabs = ({screenType = 0}) => {
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [state, setState] = useState({
    newAccount: 0,
    totalAccount: 0,
    activeAccount: 0,
    inactiveAccount: 0,
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loaderAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    let newAccount = 0;
    let totalAccount = 0;
    let activeAccount = 0;
    let inactiveAccount = 0;

    newAccount= findNewAccount();
    totalAccount = findTotalAccount();
    activeAccount= findActiveAccount();
    inactiveAccount= findInactiveAccount();

    setState({ ...state, newAccount,totalAccount,activeAccount,inactiveAccount });
  }, [volunteers]);

  const findTotalAccount = () => {
    if (screenType === 0) {
      return admins.length;
    } else if (screenType === 1) {
      return clients.length;
    } else if (screenType === 2) {
      return volunteers.length;
    } else {
      return clients.length + volunteers.length + admins.length
    }
  }

  const findActiveAccount = () => {
    let newClients= clients.filter(
      (c) =>c.activeStatus
    )
    let newVolunteers= volunteers.filter(
      (v) =>
      v.activeStatus
    )
    let newAdmins= admins.filter(
      (a) =>
      a.activeStatus
    )

    if (screenType === 0) {
      return newAdmins.length;
    } else if (screenType === 1) {
      return newClients.length;
    } else if (screenType === 2) {
      return newVolunteers.length;
    } else {
      return newClients.length + newVolunteers.length + newAdmins.length
    }
  };
  const findInactiveAccount = () => {
    let newClients= clients.filter(
      (c) =>!c.activeStatus
    )
    let newVolunteers= volunteers.filter(
      (v) =>
      !v.activeStatus
    )
    let newAdmins= admins.filter(
      (a) =>
      !a.activeStatus
    )

    if (screenType === 0) {
      return newAdmins.length;
    } else if (screenType === 1) {
      return newClients.length;
    } else if (screenType === 2) {
      return newVolunteers.length;
    } else {
      return newClients.length + newVolunteers.length + newAdmins.length
    }
  };
  const findNewAccount = () => {
    let newClients= clients.filter(
      (c) =>
        moment(c.dateCreated).utc().format("DD/MM/YY") ===
        moment().utc().format("DD/MM/YY")
    )
    let newVolunteers= volunteers.filter(
      (v) =>
        moment(v.dateCreated).utc().format("DD/MM/YY") ===
        moment().utc().format("DD/MM/YY")
    )
    let newAdmins= admins.filter(
      (a) =>
        moment(a.dateCreated).utc().format("DD/MM/YY") ===
        moment().utc().format("DD/MM/YY")
    )

    if (screenType === 0) {
      return newAdmins.length;
    } else if (screenType === 1) {
      return newClients.length;
    } else if (screenType === 2) {
      return newVolunteers.length;
    } else {
      return newClients.length + newVolunteers.length + newAdmins.length
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(Urls.BaseUrl + "api/v1/admin/getall")
      .then((admins) => {
        getClients()
          .then((clients) => {
            getVolunteer()
              .then((volunteers) => {
                setAdmins(admins.data);
                setClients(clients.data);
                setVolunteers(volunteers.data);
                setLoading(false);
              })
              .catch((e) => {
                alert(e);
                setLoading(false);
              });
          })
          .catch((e) => {
            alert(e);
            setLoading(false);
          });
      })
      .catch((e) => {
        alert(e);
        setLoading(false);
      });
  }, []);

  return (
    <div
      className="header bg-gradient-info pb-3 pt-5 pt-md-5"
      style={{ marginTop: "5vh" }}
    >
      <Container fluid>
        <div className="header-body">
          {/* Card stats */}
          <Row>
            <Col lg="6" xl="3">
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0"
                      >
                        New Accounts
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">
                        {loading ? (
                          <Lottie
                            style={{}}
                            options={defaultOptions}
                            height={30}
                            width={30}
                            isClickToPauseDisabled
                          />
                        ) : (
                          <b> {state.newAccount}</b>
                        )}
                      </span>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <i className="fas fa-chart-bar" />
                      </div>
                    </Col>
                  </Row>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    
                    <span className="text-nowrap">1 day</span>
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" xl="3">
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0"
                      >
                        Total Accounts
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">
                        {loading ? (
                          <Lottie
                            style={{}}
                            options={defaultOptions}
                            height={30}
                            width={30}
                            isClickToPauseDisabled
                          />
                        ) : (
                          <b> {state.totalAccount}</b>
                        )}
                      </span>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                        <i className="fas fa-chart-pie" />
                      </div>
                    </Col>
                  </Row>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-danger mr-2">
                      {/* <i className="fas fa-arrow-down" /> */}
                    </span>{" "}
                    <span className="text-nowrap">Accounts</span>
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" xl="3">
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0"
                      >
                        Active Accounts
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">
                        {loading ? (
                          <Lottie
                            style={{}}
                            options={defaultOptions}
                            height={30}
                            width={30}
                            isClickToPauseDisabled
                          />
                        ) : (
                          <b> {state.activeAccount}</b>
                        )}
                      </span>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                        <i className="fas fa-users" />
                      </div>
                    </Col>
                  </Row>
                  <p className="mt-3 mb-0 text-muted text-sm">
                   
                    <span className="text-nowrap">30 days</span>
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" xl="3">
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0"
                      >
                        Inactive Accounts
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">
                        {loading ? (
                          <Lottie
                            style={{}}
                            options={defaultOptions}
                            height={30}
                            width={30}
                            isClickToPauseDisabled
                          />
                        ) : (
                          <b> {state.inactiveAccount}</b>
                        )}
                      </span>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                        <i className="fas fa-percent" />
                      </div>
                    </Col>
                  </Row>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    
                    <span className="text-nowrap">30 days</span>
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};
