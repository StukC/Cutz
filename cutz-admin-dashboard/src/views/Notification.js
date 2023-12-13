import React, { useEffect, useState } from "react";
// reactstrap
import "../assets/css/argon-dashboard-react.min.css";
import { Card, Container, Row, CardHeader, Input } from "reactstrap";

import Header from "components/Headers/Header.js";
import axios from "axios";
import { Urls } from "../utilities/Urls";

function Notification() {
  const [notificationFields, setNotificationFields] = useState({
    organizations: [],
    events: [],
    eventLocation: [],
  });
  const [selectedNotificationFields, setSelectedNotificationFields] = useState({
    organization: "Select Organization",
    eventType: {
      eventType: "Select Event Type",
    },
    eventLocation: "Select Location",
    notificationText: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isSuperAdmin = localStorage.getItem("isSuperAdmin");
  const organization = localStorage.getItem("organization");
  const getNotificationFields = async () => {
    axios
      .post(
        Urls.BaseUrl + Urls.NOTIFICATION_FIELDS,
        {
          organization: isSuperAdmin === "0" ? organization : undefined,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((notificationFieldsResult) => {
        setNotificationFields(notificationFieldsResult.data);
        if (isSuperAdmin === "0") {
          setSelectedNotificationFields({
            ...selectedNotificationFields,
            organization: organization,
          });
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  const saveNotification = async () => {
    if (selectedNotificationFields.organization === "Select Organization") {
      setError("Select organization");
      return;
    } else if (
      selectedNotificationFields.eventType.eventType === "Select Event Type"
    ) {
      setError("Select Event Type");
      return;
    } else if (selectedNotificationFields.eventLocation === "Select Location") {
      setError("Select Event Location");
      return;
    } else if (selectedNotificationFields.notificationText === "") {
      setError("Enter notification content");
      return;
    }
    setError("");
    axios
      .post(Urls.BaseUrl + Urls.NOTIFICATION, selectedNotificationFields, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((notificationResult) => {
        alert(notificationResult.data.message);
        window.location.reload();
      })
      .catch((e) => {
        alert(e);
      });
  };

  useEffect(() => {
    getNotificationFields();
  }, []);

  return (
    <>
      <Header />
      <div className="mb-3 p-4 mb-6 admin">
        <div>
          <h1 className="admin">Notification</h1>
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
                    Send Notification
                  </h1>
                </div>
              </CardHeader>
              <div className="d-flex pb-4 justify-content-around pt-5">
                {isSuperAdmin === "1" ? (
                  <div className="inputborder">
                    <select
                      className="form-select pt-3 inputborder"
                      style={{ colo: "#666CA3" }}
                      aria-label="Default select example"
                      onChange={(e) =>
                        setSelectedNotificationFields({
                          ...selectedNotificationFields,
                          organization: e.target.value,
                        })
                      }
                    >
                      <option selected>Select Organization</option>
                      {notificationFields.organizations.map((org) => (
                        <option value={org}>{org}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="inputborder">
                    <Input
                      className="inputborder"
                      type="text"
                      value={selectedNotificationFields.organization}
                      placeholder="Organaization"
                      disabled
                    ></Input>
                  </div>
                )}
                <div className="inputborder">
                <select
                  className="form-select pt-3 inputborder"
                  aria-label="Default select example"
                  onChange={(e) => {
                    // Check if the default option is selected
                    if (e.target.value === "default") {
                      setSelectedNotificationFields({
                        ...selectedNotificationFields,
                        eventType: { eventType: "Select Event Type" },
                        eventLocation: "Select Location"
                      });
                      return;
                    }

                    // Try parsing the JSON and update state accordingly
                    try {
                      let event = JSON.parse(e.target.value);
                      setSelectedNotificationFields({
                        ...selectedNotificationFields,
                        eventType: event.eventType,
                        eventLocation: event.addresses?.[0]?.place || "Select Location"
                      });
                    } catch (error) {
                      console.error("Error parsing event type selection:", error);
                      // Handle the error appropriately (e.g., set an error state or show a notification)
                    }
                  }}
                >
                  <option value="default" selected>Select Event Type</option>
                  {notificationFields.events.map((event, index) => (
                    <option key={index} value={JSON.stringify(event)}>
                      {event.eventType}
                    </option>
                  ))}
                </select>
                </div>
              </div>
              <div
                className="justify-content-start"
                style={{ padding: "5px 25px" }}
              >
                <p>Enter The Notification Message — </p>
                <textarea
                  id="w3review"
                  placeholder="Send notification"
                  name="w3review"
                  rows="4"
                  cols="50"
                  onChange={(e) =>
                    setSelectedNotificationFields({
                      ...selectedNotificationFields,
                      notificationText: e.target.value,
                    })
                  }
                  value={selectedNotificationFields.notificationText}
                  style={{ width: "100%" }}
                ></textarea>
                <p style={{ color: "red" }}>{error}</p>
              </div>
              <div className="addevents">
                <button
                  className="mainbuttons mr-2 mt-1"
                  onClick={saveNotification}
                >
                  Send
                </button>
                <p>
                  <span style={{ color: "#666CA3", fontWeight: 500 }}>
                    BEFORE YOU SEND:&nbsp;
                  </span>
                  Proofread the notification you typed by reading it backwards.
                  <span style={{ color: "#666CA3", fontWeight: 500 }}>
                    {" "}
                    What time is it?{" "}
                  </span>{" "}
                  The notification you send may wake the people you are
                  notifying.{" "}
                </p>
              </div>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Notification;
