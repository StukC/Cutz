import { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import { PropTypes } from "prop-types";

import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

// var ps;

const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };

  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  // Initialize the state for submenu visibility
  const [isSubmenuOpen, setIsSubmenuOpen] = useState({});

  // Function to handle opening and closing of submenus
  const handleSubmenuToggle = (key) => {
    setIsSubmenuOpen((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  // creates the links that appear in the left menu / Sidebar
  // console.log('isOPen',isSubmenuOpen )
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.children) {
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.layout + prop.path}
              onClick={() => handleSubmenuToggle(key)}
              className={isSubmenuOpen[key] ? "active" : ""}
            >
              <i className={prop.icon} />
              {prop.name}
            </NavLink>
            <Collapse isOpen={isSubmenuOpen[key]}>
              <Nav>
                {prop.children.map((childProp, childKey) => (
                  <NavItem key={childKey}>
                    <NavLink
                      to={childProp.path}
                      tag={NavLinkRRD}
                      onClick={closeCollapse}
                    >
                      {childProp.name}
                    </NavLink>
                  </NavItem>
                ))}
              </Nav>
            </Collapse>
          </NavItem>
        );
      }

      return localStorage.getItem("isSuperAdmin") === "0" &&
        prop.name === "Admin" ? null : (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={closeCollapse}
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
  };

  const { routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <p
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              // to={
              //   localStorage.getItem("isSuperAdmin") === "1"
              //     ? "/admin/index"
              //     : "/admin/clients/manageclients"
              // }
              // style={{fontSize:"36px",fontFamily:"auto"}}
            >
              <img
                width={100}
                src={require("../../assets/img/imges/image_2023-01-19_224110357 2.png")}
                alt=""
              />
            </p>
          </NavbarBrand>
        ) : null}
        {/* User */}

        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
            {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                   /* <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>*/
                    <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={require("../../assets/img/imges/image_2023-01-19_224110357 2.png")}
                  />
                </span>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>{createLinks(routes)}</Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
