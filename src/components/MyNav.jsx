import { Nav, NavLink, Navbar } from "react-bootstrap";

const MyNav = () => {
  return (
    <Navbar className="custom-navbar" bg="dark" variant="dark">
      <Nav className="mr-auto">
        <NavLink href="#home" className="nav-item-custom ms-3" to="/">
          Home
        </NavLink>
        <div className="nav-slash">/</div>
        <Nav.Link href="#weather" className="nav-item-custom">
          Weather
        </Nav.Link>
        <div className="nav-slash">/</div>
        <Nav.Link href="#gallery" className="nav-item-custom">
          Gallery
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default MyNav;
