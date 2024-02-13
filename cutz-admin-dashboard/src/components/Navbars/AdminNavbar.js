import { Link } from "react-router-dom";
// Import components from Reactstrap library for styling
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  // Form,
  // FormGroup,
  // InputGroupAddon,
  // InputGroupText,
  // Input,
  // InputGroup,
  Navbar,
  Nav,
  // Container,
  Media,
  Modal,
} from "reactstrap";
import { Popup } from "reactjs-popup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// Functional component for Admin navbar on top of webpage
const AdminNavbar = (props) => {
  const token = localStorage.getItem("token");
  const isSuperAdmin = localStorage.getItem("isSuperAdmin");
  const { user } = useSelector((state) => state.CreateUserReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to navigate to notification page
  const navigateNotification = () => {
    navigate("/admin/notification");
  };

  // Function to navigate to description page
  const navigateDescription = () => {
    navigate("/admin/desription");
  };

  // Return JSX rendering of componnet
  return (
    <>
      {/* Render the top navigation bar */}
      <Navbar
        className="navbar-top navbar-dark d-flex justify-content-end "
        expand="md"
        id="navbar-main"
      >
        {/* Render bell icon if user is a super admin */}
        {isSuperAdmin === "1" && (
          <span
            className="ni ni-bell-55 mr-3"
            onClick={navigateDescription}
            alt="asdf"
          ></span>
        )}

        {/* Render envelope icon for navigation to home page */}
        <span
          className="fas fa-envelope mr-2"
          onClick={navigateNotification}
          alt="asdf"
        ></span>

        {/* Render user profile information */}
        <Nav
          className="align-items-center d-none d-md-flex pr-4 d-sm-block"
          navbar
        >
          {/* Dropdown menu for user profile options */}
          <UncontrolledDropdown nav>
            <DropdownToggle className="pr-0" nav>
              <Media className="align-items-center">
                {/* Render user profile picture */}
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={require("../../assets/img/imges/image_2023-01-19_224110357 2.png")}
                  />
                </span>
                {/* Render user name */}
                <Media className="ml-2 d-none d-lg-block">
                  <span
                    className="mb-0 text-sm font-weight-bold"
                    style={{ color: "#666CA3" }}
                  >
                    {/* Get user name from local storage */}
                    {localStorage.getItem("firstName") +
                      " " +
                      localStorage.getItem("lastName")}
                  </span>
                </Media>
              </Media>
            </DropdownToggle>
            {/* Dropdown menu items */}
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              {/* Menu item for user profile */}
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              
              <DropdownItem divider />

              {/* Menu item for log out */}
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                <i className="ni ni-user-run" />
                <button
                  className="rdinppx1"
                  type="submit"
                  // Clear local storage and reload the page on log out
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                  position="center"
                >
                  Log out
                </button>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* </Container> */}
      </Navbar>
    </>
  );
};

export default AdminNavbar;
