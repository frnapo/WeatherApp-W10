import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const MyNav = () => {
  return (
    <Navbar className="custom-navbar bg-dark bg-opacity-25" variant="dark" style={{ zIndex: 1 }}>
      <Nav className="mr-auto">
        <NavLink className="nav-item-custom ms-3 nav-link" to="/">
          Home
        </NavLink>
        <div className="nav-slash">/</div>
        <Nav.Link className="nav-item-custom">Weather</Nav.Link>
        <div className="nav-slash">/</div>
        <Nav.Link className="nav-item-custom">Gallery</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default MyNav;
