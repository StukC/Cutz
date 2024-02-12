import React, {  useEffect, useId, useState } from "react";
import axios from "axios";
import Lottie from "react-lottie";
import { Card, Container, Row, CardHeader, Input } from "reactstrap";
import { Urls } from "utilities/Urls";
import Header from "components/Headers/Header.js";
import loaderAnimation from "assets/Loaders";
import "../assets/css/argon-dashboard-react.min.css";

// Default options for Lottie animation
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loaderAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

// Functional component for editing user profile
function EditProfile() {
  const [loading, setLoading] = useState(false);
  // Get userId and token from local storagex
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem('userId');

  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    organization: "",
  });

  // Fetch user profile info when component mounts
  useEffect(()=>{
    getProfile();
  },[]);

  // Function to retrieve user information
  const getProfile = async () =>{
    setLoading(true);
    // Send HTTP request and check token for authentication
    await axios.get(Urls.BaseUrl + `api/v1/admin/${userId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    // Update state with fetch user info
    .then((result)=>{
      setState({...state, 
        firstName: result.data.firstName, 
        lastName: result.data.lastName,
        email: result.data.email,
        password:result.data.password,
        organization: result.data.organization,
        phoneNumber: result.data.phoneNumber,
        address: result.data.address
      })
      setConfirmPassword(result.data.password);
      setLoading(false);
    }).catch((error)=>{
      setLoading(false);
      console.log('Error', error);
    })
  }

  // Function to handle form submission
  const onSubmit = async (id) => {
    setLoading(true);
    // Prepare data to be submitted
    const data = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      phoneNumber: state.phoneNumber,
      address: state.address,
      password: state.password
    }
    // Send PATCH request to update user profile
    await axios
      .patch(Urls.BaseUrl + `api/v1/admin/${userId}`, data, {
        headers:{
          Authorization:"Bearer "+token
        }
      })
      .then((r) => {
        setLoading(false);
        alert(r.data.message)
        getProfile();
      })
      .catch((e) => {
        setLoading(false);
        alert(e);
      });
  };

  return (
    <>
      <Header />

      <div className="mb-3 p-4 mb-6 admin">
        <div>
          <h1 className="admin">Profile</h1>
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
                    Edit Profile
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
        <p>Phone Number</p>
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
               
              </div>
              <div className="d-flex justify-content-around">
                <div className="inputborder">
                <div style={{ marginLeft: '10px' }}>
        <p>Organaization</p>
      </div>
                  <Input
                    className="inputborder"
                    type="text"
                    placeholder="Organaization"
                    value={state.organization}
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
    </>
  );
}

export default EditProfile;
