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
function VolunteerEdit({user}) {
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, setState] = useState(user);

  const navigate = useNavigate();

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate("/admin/index");
  };
  const onSubmit = async () => {
    let data = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      phoneNumber: state.phoneNumber,
      organization: state.organization,
      address: state.address,
    };
    setLoading(true);
    await axios
      .patch(Urls.BaseUrl+"api/v1/volunteer/"+user._id, data,{
        headers:{
          Authorization:"Bearer "+localStorage.getItem("token")
        }
      })
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
                  Edit Volunteer
                </h1>
              </div>
            </CardHeader>

            <div className="d-flex justify-content-around ">
              <div className="inputborder">
                <Input
                  className="inputborder"
                  type="text"
                  placeholder="First Name"
                  value={state.firstName}
                  onChange={(e) =>
                    setState({ ...state, firstName: e.target.value })
                  }
                ></Input>
              </div>
              <div className="inputborder">
                <Input
                  className="inputborder"
                  type="text"
                  placeholder="Last Name"
                  value={state.lastName}
                  onChange={(e) =>
                    setState({ ...state, lastName: e.target.value })
                  }
                ></Input>
              </div>
              <div>{/* <Input>asdf</Input> */}</div>
            </div>
            <div className="d-flex justify-content-around ">
              <div className="inputborder">
                <Input
                  className="inputborder"
                  type="email"
                  placeholder="Email"
                  value={state.email}
                  onChange={(e) =>
                    setState({ ...state, email: e.target.value })
                  }
                ></Input>
              </div>
              <div className="inputborder">
                <Input
                  className="inputborder"
                  type="tel"
                  placeholder="Phone"
                  value={state.phoneNumber}
                  onChange={(e) =>
                    setState({ ...state, phoneNumber: e.target.value })
                  }
                ></Input>
              </div>
              <div>{/* <Input>asdf</Input> */}</div>
            </div>
            {/* <div className="d-flex justify-content-around ">
              <div className="inputborder">
                <Input
                  className="inputborder"
                  type="password"
                  placeholder="Password"
                  value={state.password}
                  onChange={(e) =>
                    setState({ ...state, password: e.target.value })
                  }
                ></Input>
              </div>
              <div className="inputborder">
                <Input
                  className="inputborder"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Input>
              </div>
            </div> */}
            <div className="d-flex justify-content-around ">
              <div className="inputborder">
                <Input
                  className="inputborder"
                  type="text"
                  placeholder="Organaization"
                  value={state.organization}
                  onChange={(e) =>
                    setState({ ...state, organization: e.target.value })
                  }
                ></Input>
              </div>
              <div className="inputborder">
                <Input
                  className="inputborder"
                  type="text"
                  placeholder="Address"
                  value={state.address}
                  onChange={(e) =>
                    setState({ ...state, address: e.target.value })
                  }
                ></Input>
              </div>
              <div>{/* <Input>asdf</Input> */}</div>
            </div>

            <div className="addevents">
              <button className="mainbuttons" onClick={onSubmit}>
                Save
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

export default VolunteerEdit;
