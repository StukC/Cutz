import React, { useEffect, useState } from "react";
import "../assets/css/argon-dashboard-react.min.css";
import { Card, Container, Row, CardHeader } from "reactstrap";
import Header from "components/Headers/Header.js";
import axios from "axios";
import { Urls } from "../utilities/Urls";
import Lottie from "react-lottie";
import loaderAnimation from "../assets/Loaders";

function Description() {
  const [description, setDescription] = useState({ _id: "", description: "" });
  const [isDescriptionAvailable, setIsDescriptionAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const onSubmit = async () => {
    if (!description.description) {
      setError("Enter description");
    } else {
      setError("");
      setLoading(true);
      if (isDescriptionAvailable) {
        axios
          .put(
            Urls.BaseUrl + Urls.DESCRIPTION + `/${description._id}`,
            { description: description.description },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((r) => {})
          .catch((e) => {
            alert(e);
          })
          .finally(async () => {
            setLoading(false);
            await getDescription();
          });
      } else {
        axios
          .post(
            Urls.BaseUrl + Urls.DESCRIPTION,
            { description: description.description },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((r) => {})
          .catch((e) => {
            alert(e);
          })
          .finally(async () => {
            setLoading(false);
            await getDescription();
          });
      }
    }
  };

  const getDescription = async () => {
    axios
      .get(Urls.BaseUrl + Urls.DESCRIPTION, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((descriptionResult) => {
        if (descriptionResult.data.length > 0) {
          setIsDescriptionAvailable(true);
          setDescription(descriptionResult.data[0]);
        } else {
          setIsDescriptionAvailable(false);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  useEffect(() => {
    getDescription();
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loaderAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <Header />

      <div className="mb-3 p-4 mb-6 admin">
        <div>
          <h1 className="admin">App Description</h1>
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
                  How to Use The App
                  </h1>
                </div>
              </CardHeader>
              <div
                className="justify-content-start"
                style={{ padding: "25px" }}
              >
                <p>Add Description</p>
                <textarea
                  id="w3review"
                  onChange={(e) =>
                    setDescription({
                      ...description,
                      description: e.target.value,
                    })
                  }
                  value={description.description}
                  placeholder="add description"
                  name="w3review"
                  rows="4"
                  cols="50"
                  style={{ width: "100%" }}
                ></textarea>
                <p style={{ color: "red" }}>{error}</p>
              </div>

              <div className="addevents">
                <button className="mainbuttons" onClick={onSubmit}>
                  {loading ? (
                    <Lottie
                      style={{}}
                      options={defaultOptions}
                      height={35}
                      width={37}
                      isClickToPauseDisabled
                    />
                  ) : (
                    "Send"
                  )}
                </button>
              </div>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Description;
