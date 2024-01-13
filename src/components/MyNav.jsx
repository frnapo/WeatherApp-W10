import { Button, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const MyNav = () => {
  return (
    <Navbar className="custom-navbar fixed-top bg-transparent">
      <Nav className="mr-auto">
        <Button className="ms-3 mt-2" variant="outline-light rounded-5 px-4">
          <NavLink className="nav-item-custom nav-link nav-button" to="/">
            Home
          </NavLink>
        </Button>
      </Nav>
    </Navbar>
  );
};

export default MyNav;
