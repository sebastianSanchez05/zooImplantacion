import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Table, Spinner, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

import { fetchData } from "../../functions/fetch.js";

const apiUrl = import.meta.env.VITE_URL_API;

const Animales = () => {

    const [animales, setAnimales] = useState([]);
    const [cargando, setCargando] = useState(true);


    useEffect(() => {
        fetchData('GET', `${apiUrl}/api/animales`)
            .then(response => {
                setAnimales(response);
                setCargando(false);
            })
            .catch(error => console.error(error));
    }, []);


    const handleEliminar = async (id) => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: "¡No podrás revertir esta acción!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed)
                fetchData('DELETE', `${apiUrl}/api/animales/${id}`)
                    .then(response => {
                        setAnimales(animales.filter(animal => animal._id !== id));
                        Swal.fire('Animal eliminado!', 'Se ha eliminado correctamente', 'success');
                    })
                    .catch(error => console.error(error));

        } catch (error) { Swal.fire('Hubo un problema', 'Ocurrio un error mientras se eliminaba el animal', 'error') }
    };

    return (
        <>
            <Container fluid>
                <Row>
                    <Col> <h3>Animales</h3> </Col>
                    <Col>
                        <Button variant="dark">
                            <Link to="/animales/registrar" style={{ color: '#FFFFFF' }}><span className="material-symbols-outlined">
                                add
                            </span>Animal</Link>
                        </Button>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Especie</th>
                                    <th>Edad</th>
                                    <th>Region</th>
                                    <th>Nombre científico</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cargando
                                        ? <tr>
                                            <td colSpan={7}>
                                                <Spinner animation="border" variant="warning" />
                                            </td>
                                        </tr>
                                        : animales.map((animal, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{animal.nombre}</td>
                                                <td>{animal.especie}</td>
                                                <td>{animal.edad}</td>
                                                <td>{animal.origen}</td>
                                                <td>
                                                    <a href={`${animal.wiki_url}`} className="link-primary" target="_blank" rel="noopener noreferrer">
                                                        {animal.nombre_cientifico}
                                                    </a>
                                                </td>
                                                <td>
                                                    <Button variant="warning">
                                                        <Link to={`/animales/editar/${animal._id}`}>
                                                            <span className="material-symbols-outlined text-white">edit</span>
                                                        </Link>
                                                    </Button>
                                                    <Button variant="danger" className="mx-2" onClick={() => handleEliminar(animal._id)}>
                                                        <span className="material-symbols-outlined">delete</span>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Animales;