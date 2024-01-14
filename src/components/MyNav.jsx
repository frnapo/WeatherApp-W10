import { Button, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";

const MyNav = () => {
  return (
    <Navbar className="custom-navbar fixed-top bg-transparent">
      <Nav className="mr-auto">
        <Button className="ms-3 mt-2" variant="outline-light rounded-5">
          <NavLink className="nav-link nav-button" to="/">
            <ArrowLeft className="fs-1 mx-3" />
          </NavLink>
        </Button>
      </Nav>
    </Navbar>
  );
};

export default MyNav;
