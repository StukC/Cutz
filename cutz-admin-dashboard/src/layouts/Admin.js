import React from "react";
import { useLocation, Route, Routes } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import ClientsRecord from "views/clients/ClientsRecord";
import ManageClients from "views/clients/ManageClients";
import ClientsSchedule from "views/clients/ClientsSchedule";
import Volunteers from "views/volunteers/Volunteers";
import VolunteersSchedule from "views/volunteers/VolunteersSchedule";
import VolunteersRecord from "views/volunteers/VolunteersRecord";
import ManageEvent from "views/events/ManageEvent";
import EventRecord from "views/events/EventRecord";
import Addadmin from "views/Addadmin";
import CreateEvent from "views/events/CreateEvent";
import Notification from "views/Notification";
import Description from "views/Description";
import EditProfile from "views/EditProfile";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const isSuperAdmin = localStorage.getItem("isSuperAdmin");

  console.log("location", location);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        if (prop.children) {
          // console.log('child', prop.children)
          return prop.children.map((item, Index) => {
            return (
              <Route path={item.path} element={item.component} key={Index} />
            );
          });
        } else {
          return (
            <Route path={prop.path} element={prop.component} key={key} exact />
          );
        }
      } else {
        return null;
      }
    });
  };
  // console.log('routes', getRoutes(routes))
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink:
            isSuperAdmin === "1"
              ? "/admin/index"
              : "/admin/clients/manageclients",
          imgSrc: require("../assets/img/brand/argon-react.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props?.location?.pathname)}
        />
        <Routes>
          {getRoutes(routes)}
          {/* <Route path="*" element={<Navigate to="/admin/index" replace />} /> */}
        </Routes>
        <Container fluid>
          {location.pathname === "/admin/clients/manageclients" && (
            <ManageClients />
          )}
          {location.pathname === "/admin/clients/clientrecord" && (
            <ClientsRecord />
          )}
          {location.pathname === "/admin/clients/clientschedule" && (
            <ClientsSchedule />
          )}
          {location.pathname === "/admin/vlounteers/managevolunteers" && (
            <Volunteers />
          )}
          {location.pathname === "/admin/vlounteers/volunteerschedule" && (
            <VolunteersSchedule />
          )}
          {location.pathname === "/admin/vlounteers/volunteersrecord" && (
            <VolunteersRecord />
          )}
          {location.pathname === "/admin/Events/manageevent" && <ManageEvent />}
          {location.pathname === "/admin/Events/eventrecord" && <EventRecord />}
          {location.pathname === "/admin/addadmin" && <Addadmin />}
          {location.pathname === "/admin/createvent" && <CreateEvent />}
          {location.pathname === "/admin/notification" && <Notification />}
          {location.pathname === "/admin/desription" && <Description />}
          {location.pathname === "/admin/user-profile" && <EditProfile />}
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
