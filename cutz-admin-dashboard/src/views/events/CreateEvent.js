import React, { useEffect, useState } from "react";
import "../../assets/css/argon-dashboard-react.min.css";
import { Card, Container, Row, CardHeader, Input } from "reactstrap";
import moment from "moment";

import Header from "components/Headers/Header.js";
import {
  createOrganization,
  getAdminOrganizations,
} from "services/Organization";
import { getOrganizations } from "services/Organization";
import { createEvent } from "services/Event";
import loaderAnimation from "assets/Loaders";
import Lottie from "react-lottie";
import axios from "axios";
import { Urls } from "utilities/Urls";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loaderAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function CreateEvent() {
  const isSuperAdmin = localStorage.getItem("isSuperAdmin");
  const [loading, setLoading] = useState(false);
  const [orgList, setOrgList] = useState([]);
  const [adminOrgList, setAdminOrgList] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [timings, setTimings] = useState({
    eventId: "",
    priorEventStartTime: "",
    priorEventEndTime: "",
    eventStartTime: Math.floor(moment(new Date()).valueOf() / 1000),
    eventEndTime: Math.floor(moment(new Date()).valueOf() / 1000),
    afterEventStartTime: "",
    afterEventEndTime: "",
    capacity: 100,
  });
  const [state, setState] = useState({
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    orgId: "",
    event_id: 23,
    eventType: "",
    addresses: [
      {
        location: {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        place: "",
        house: "",
        zip: "",
        _id: "64352db63be4664fe6a9cfbf",
      },
    ],
    eventCapacity: 99,
    groupServicePeriod: "30 min",
    volunteerCapacity: 20,
    eventCode: "",
    eventStartTime: Math.floor(moment(new Date()).valueOf() / 1000),
    eventEndTime: Math.floor(moment(new Date()).valueOf() / 1000),
    checkInCode: 0,
    checkOutCode: 0,
  });

  const createTiming = async (id) => {
    let times = { ...timings };

    times.eventStartTime = moment(times.eventStartTime * 1000).format(
      "yyyy-MM-DDTHH:mm"
    );
    times.eventEndTime = moment(times.eventEndTime * 1000).format(
      "yyyy-MM-DDTHH:mm"
    );

    await axios
      .post(Urls.BaseUrl + "api/v1/timing", {
        ...times,
        eventId: id,
      })
      .then((r) => {
        setLoading(false);
        alert("Event added successfully");
        window.location.assign("/admin/Events/manageevent");
      })
      .catch((e) => {
        alert(e);
        setLoading(false);
      });
  };

  const addEvent = (data) => {
    createEvent(data)
      .then((r) => {
        createTiming(r.data.id);
      })
      .catch((e) => {
        alert(e);
        setLoading(false);
      });
  };

  const onSubmit = () => {
    setLoading(true);
    const res = orgList.find(
      (o) => o.organizationName.toLowerCase() === selectedOrg.toLowerCase()
    );
    if (res) {
      // res.organizationName
      addEvent({ ...state, orgId: res._id });
    } else {
      createOrganization({ organizationName: selectedOrg })
        .then((r) => {
          addEvent({ ...state, orgId: r.data.id });
        })
        .catch((e) => {
          alert(e);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (isSuperAdmin === "1") {
      getAdminOrganizations().then((r) => {
        setAdminOrgList(r.data);
        setSelectedOrg(r.data[0]?.organization);
      });
    } else {
      setSelectedOrg(localStorage.getItem("organization"));
    }
    getOrganizations().then((r) => {
      setOrgList(r.data);
    });
  }, []);

  return (
    <>
      <Header />

      <div className="mb-3 p-4 mb-6 admin">
        <div>
          <h1 className="admin">Create Event</h1>
        </div>
      </div>

      {/* Page content */}
      <Container className="mt--7 mb-5 bg-gradient-info " fluid>
        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader
                className="bg-transparent"
                style={{ borderBottom: "2px solid #666CA3" }}
              >
                <div>
                  <h1 className="text-center d-flex align-item-center justify-content-center">
                    Add Event
                  </h1>
                </div>
              </CardHeader>
              <div className="d-flex justify-content-around pt-5">
                {isSuperAdmin === "1" ? (
                  <div className="inputborder">
                    <select
                      className="form-select pt-3 inputborder"
                      style={{ colo: "#666CA3" }}
                      aria-label="Default select example"
                      onChange={(e) => setSelectedOrg(e.target.value)}
                    >
                      {adminOrgList.map((org) => (
                        <option key={org.id} value={org.organization}>
                          {org.organization}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="inputborder">
                    <Input
                      className="inputborder"
                      type="text"
                      value={selectedOrg}
                      onChange={(e) => setSelectedOrg(e.target.value)}
                      placeholder="Organaization"
                      disabled
                    ></Input>
                  </div>
                )}
                <div className="inputborder">
                <lable className="evnetcolor" style={{ marginLeft: '10px' }}>Event Type</lable>
                  <Input
                    className="inputborder"
                    type="text"
                    placeholder="Type Event"
                    value={state.eventType}
                    onChange={(e) =>
                      setState({ ...state, eventType: e.target.value })
                    }
                  ></Input>
                </div>
                <div></div>
              </div>

              <div className="d-flex justify-content-around pt-5">
                <div className="inputborder">
                <lable className="evnetcolor" style={{ marginLeft: '10px' }}>Event Site Name</lable>
                  <Input
                    className="inputborder"
                    type="text"
                    value={state.addresses[0].place}
                    onChange={(e) =>
                      setState({
                        ...state,
                        addresses: [
                          { ...state.addresses[0], place: e.target.value },
                          state.addresses[1],
                        ],
                      })
                    }
                    placeholder="Place"
                  ></Input>
                </div>
                <div className="inputborder">
                <lable className="evnetcolor" style={{ marginLeft: '10px' }}>Address</lable>
                  <Input
                    className="inputborder"
                    type="text"
                    placeholder="Address"
                    value={state.addresses[0].house}
                    onChange={(e) =>
                      setState({
                        ...state,
                        addresses: [
                          { ...state.addresses[0], house: e.target.value },
                          state.addresses[1],
                        ],
                      })
                    }
                  ></Input>
                </div>
                <div>{/* <Input>asdf</Input> */}</div>
              </div>
              <div className="pt-5 d-flex justify-content-center">
                <div
                  className="inputborder"
                  style={{ width: "100%", paddingRight: "1%" }}
                >
                 <lable className="evnetcolor" style={{ marginLeft: '10px' }}>Zip Code</lable>
                  <Input
                    className="inputborder"
                    type="text"
                    placeholder="Zip Code"
                    value={state.addresses[0].zip}
                    onChange={(e) =>
                      setState({
                        ...state,
                        addresses: [
                          { ...state.addresses[0], zip: e.target.value },
                          state.addresses[1],
                        ],
                      })
                    }
                  ></Input>
                </div>
                <div
                  className="inputborder"
                  style={{ width: "100%", paddingRight: "1%" }}
                >
                <lable className="evnetcolor" style={{ marginLeft: '10px' }}>Same As Check In Code</lable>
                  <Input
                    className="inputborder"
                    type="text"
                    minLength={4}
                    maxLength={4}
                    placeholder="Event Code"
                    value={state.eventCode}
                    onChange={(e) =>
                      setState({
                        ...state,
                        eventCode: e.target.value,
                      })
                    }
                  ></Input>
                </div>
              </div>
              <div className="d-flex justify-content-around pt-5">
                <div className="inputborder">
                <lable className="evnetcolor" style={{ marginLeft: '10px' }}>Prep Event Start Time</lable>
                  <Input
                    className="inputborder"
                    type="datetime-local"
                    placeholder="Enter a date"
                    value={timings.priorEventStartTime}
                    onChange={(e) => {
                      setTimings({
                        ...timings,
                        priorEventStartTime: e.target.value,
                      });
                    }}
                  ></Input>
                </div>
                <div className="inputborder">
                <lable className="evnetcolor" style={{ marginLeft: '10px' }}>Prep Event End Time</lable>
                  <Input
                    className="inputborder"
                    type="datetime-local"
                    placeholder="Type Event"
                    value={timings.priorEventEndTime}
                    onChange={(e) =>
                      setTimings({
                        ...timings,
                        priorEventEndTime: e.target.value,
                      })
                    }
                  ></Input>
                </div>
                <div>{/* <Input>asdf</Input> */}</div>
              </div>
              <div className="d-flex justify-content-around pt-5">
                <div className="inputborder">
                <lable className="evnetcolor" style={{ marginLeft: '10px' }}>Event Start Time</lable>
                  <Input
                    className="inputborder"
                    type="datetime-local"
                    placeholder="Enter a date"
                    value={moment(timings.eventStartTime * 1000).format(
                      "yyyy-MM-DDTHH:mm"
                    )}
                    onChange={(e) => {
                      setState({
                        ...state,
                        eventStartTime: moment(e.target.value).valueOf() / 1000,
                      });
                      setTimings({
                        ...timings,
                        eventStartTime: moment(e.target.value).valueOf() / 1000,
                      });
                    }}
                  ></Input>
                </div>
                <div className="inputborder">
                <lable className="evnetcolor" style={{ marginLeft: '10px' }}>Event End Time</lable>
                  <Input
                    className="inputborder"
                    type="datetime-local"
                    placeholder="Type Event"
                    value={moment(timings.eventEndTime * 1000).format(
                      "yyyy-MM-DDTHH:mm"
                    )}
                    onChange={(e) => {
                      setState({
                        ...state,
                        eventEndTime: moment(e.target.value).valueOf() / 1000,
                      });
                      setTimings({
                        ...timings,
                        eventEndTime: moment(e.target.value).valueOf() / 1000,
                      });
                    }}
                  ></Input>
                </div>
                <div>{/* <Input>asdf</Input> */}</div>
              </div>

              <div className="d-flex justify-content-around pt-5">
                <div className="inputborder">
                <lable className="evnetcolor" style={{ marginLeft: '10px' }}>Clean Up Start Time</lable>
                  <Input
                    className="inputborder"
                    type="datetime-local"
                    placeholder="Enter a date"
                    value={timings.afterEventStartTime}
                    onChange={(e) =>
                      setTimings({
                        ...timings,
                        afterEventStartTime: e.target.value,
                      })
                    }
                  ></Input>
                </div>
                <div className="inputborder">
                <lable className="evnetcolor" style={{ marginLeft: '10px' }}>Clean Up End Time</lable>
                  <Input
                    className="inputborder"
                    type="datetime-local"
                    placeholder="Type Event"
                    value={timings.afterEventEndTime}
                    onChange={(e) =>
                      setTimings({
                        ...timings,
                        afterEventEndTime: e.target.value,
                      })
                    }
                  ></Input>
                </div>
                <div>{/* <Input>asdf</Input> */}</div>
              </div>
              <div className="d-flex pb-4 justify-content-around pt-4">
                <div className="inputborder" style={{ marginTop: "23px" }}>
                <lable className="evnetcolor" style={{ marginLeft: '10px' }}>Total Capacity for This Event</lable>
                  <Input
                    className="inputborder"
                    type="number"
                    placeholder="Event Capacity"
                    value={state.eventCapacity}
                    onChange={(e) =>
                      setState({ ...state, eventCapacity: e.target.value })
                    }
                  ></Input>
                </div>
                <div className="inputborder">
                <lable className="evnetcolor" style={{ marginLeft: '10px' }}>Duration for Each Group</lable>
                  <select
                    class="form-select pt-3 inputborder"
                    style={{ colo: "#666CA3" }}
                    aria-label="Default select example"
                    onChange={(e) =>
                      setState({ ...state, groupServicePeriod: e.target.value })
                    }
                  >
                    <option selected hidden disabled>
                      Group service period
                    </option>
                    <option value="30 min">30 min</option>
                    <option value="1 hour">1 hour</option>
                  </select>
                </div>
                <div>{/* <Input>asdf</Input> */}</div>
              </div>
              <div className="d-flex pb-4 justify-content-around pt-4">
                <div className="inputborder">
                <lable className="evnetcolor" style={{ marginLeft: '10px' }}>Check In Code</lable>
                  <Input
                    className="inputborder"
                    type="number"
                    maxLength={4}
                    placeholder="Check In Code"
                    value={state.checkInCode}
                    onChange={(e) =>
                      setState({ ...state, checkInCode: e.target.value })
                    }
                  ></Input>
                </div>
                <div className="inputborder">
                <lable className="evnetcolor" style={{ marginLeft: '10px' }}>Check Out Code</lable>
                  <Input
                    className="inputborder"
                    type="number"
                    maxLength={4}
                    placeholder="Check Out Code"
                    value={state.checkOutCode}
                    onChange={(e) =>
                      setState({ ...state, checkOutCode: e.target.value })
                    }
                  ></Input>
                </div>
                <div>{/* <Input>asdf</Input> */}</div>
              </div>

              <div className="addevents">
                <button className="mainbuttons" onClick={onSubmit}>
                  Add Event
                </button>
                {loading ? (
                  <Lottie
                    style={{}}
                    options={defaultOptions}
                    height={30}
                    width={30}
                    isClickToPauseDisabled
                  />
                ) : (
                  <></>
                )}
              </div>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default CreateEvent;
