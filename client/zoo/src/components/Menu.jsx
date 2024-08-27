import { Link } from "react-router-dom";
import {
    Container,
    Nav,
    Navbar,
    Offcanvas
} from 'react-bootstrap';
import zooPlus from "../../public/zoo.png";

function Menu() {
    const expand = 'lg';
    return (
        <>
            <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
                <Container fluid>
                    <Navbar.Brand href="/">
                        <img src={zooPlus} alt="Logo de Sena Zoo Plus"
                            width="30"
                            height="30"
                            className="d-inline-block align-top" />
                        Zoo Plus
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                Offcanvas
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Link to="/" className='mx-1' style={{ color: '#AAAAAA' }}>
                                    <Nav>Inicio</Nav>
                                </Link>
                                <Link to="/animales" className='mx-1' style={{ color: '#AAAAAA' }}>
                                    <Nav>Ver animales</Nav>
                                </Link>
                                <Link to="/atribuciones" className='mx-1' style={{ color: '#AAAAAA' }}>
                                    <Nav>Atribuciones</Nav>
                                </Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
}

export default Menu;