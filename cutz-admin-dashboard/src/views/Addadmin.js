import React, { useEffect, useState } from "react";
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
function Addadmin() {
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = localStorage.getItem("token");
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    organization: "",
  });

  const navigate = useNavigate();

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate("/admin/index");
  };
  const onSubmit = async () => {
    setLoading(true);
    await axios
      .post(Urls.BaseUrl + "api/v1/admin/signup", state)
      .then((r) => {
        setLoading(false);
        navigateHome();
        // alert(r.data.message)
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
  }, []);

  return (
    <>
      <Header />

      <div className="mb-3 p-4 mb-6 admin">
        <div>
          <h1 className="admin">Create Organization</h1>
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
                    Add Organization
                  </h1>
                </div>
              </CardHeader>

              <div className="d-flex justify-content-around pt-5">
                <div className="inputborder">
                <div style={{ marginLeft: '10px' }}>
        <p>First Name</p>
      </div>
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
                <div style={{ marginLeft: '10px' }}>
        <p>Last Name</p>
      </div>
            
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
              <div className="d-flex justify-content-around pt-5">
                <div className="inputborder">
                <div style={{ marginLeft: '10px' }}>
        <p>Email</p>
      </div>
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
                <div style={{ marginLeft: '10px' }}>
        <p>Phone</p>
      </div>
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
              <div className="d-flex justify-content-around pt-5">
                <div className="inputborder">
                <div style={{ marginLeft: '10px' }}>
        <p>Password</p>
      </div>
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
                <div style={{ marginLeft: '10px' }}>
        <p>Confirm Password</p>
      </div>
                  <Input
                    className="inputborder"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Input>
                </div>
                <div>{/* <Input>asdf</Input> */}</div>
              </div>
              <div className="d-flex justify-content-around pt-5">
                <div className="inputborder">
                <div style={{ marginLeft: '10px' }}>
        <p>Organaization</p>
      </div>
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
                <div style={{ marginLeft: '10px' }}>
        <p>Address</p>
      </div>
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
                  Add Admin
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

export default Addadmin;
