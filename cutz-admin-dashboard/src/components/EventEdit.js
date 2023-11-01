import React, { useState } from "react";
import "../assets/css/argon-dashboard-react.min.css";
import { Card, Container, Row, CardHeader, Input } from "reactstrap";

import Header from "components/Headers/Header.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import loaderAnimation from "assets/Loaders";
import { Urls } from "utilities/Urls";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loaderAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
function EventEdit({ event }) {
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, setState] = useState(event);

  const navigate = useNavigate();

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate("/admin/index");
  };
  const onSubmit = async () => {
    let data = {
      eventType: state.eventType,
      addresses: [state.addresses[0], state.addresses[1]],
    };
    setLoading(true);
    await axios
      .patch(Urls.BaseUrl + "api/v1/event/" + event._id, data)
      .then((r) => {
        setLoading(false);
        window.location.reload();
        // alert(r.data.message)
      })
      .catch((e) => {
        setLoading(false);
        alert(e);
      });
  };

  return (
    <Container className=" pb-5 bg-gradient-info pt-2 " fluid>
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
              {/* <div className="inputborder">
                  <Input
                    className="inputborder"
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="Organaization"
                  ></Input>
                </div> */}
              <div className="inputborder">
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
                <Input
                  className="inputborder"
                  type="text"
                  placeholder="House"
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
                <Input
                  className="inputborder"
                  type="text"
                  placeholder="Zip"
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
  );
}

export default EventEdit;
