import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Form, Col, Row, Button } from "react-bootstrap";

import { fetchData } from "../../functions/fetch.js";

const apiUrl = import.meta.env.VITE_URL_API;

const EditarAnimal = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        _id: "",
        nombre: "",
        especie: "",
        nombre_cientifico: "",
        origen: "",
        edad: "",
        wiki_url: ""
    });

    useEffect(() => {
        fetchData('GET', `${apiUrl}/api/animales/${id}`)
            .then(response => {
                setFormData(response); 
            })
            .catch(error => console.error("Error al obtener datos del animal:", error));
    }, [id]);

    // Manejador de cambios en los campos del formulario
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            fetchData('PUT', `${apiUrl}/api/animales/${formData._id}`, formData)
            .then(response => {
                navigate('/animales');
            })
            .catch(error => console.error(error));
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="nombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nombre del animal"
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="especie">
                        <Form.Label>Especie</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Especie del animal"
                            value={formData.especie}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="nombre_cientifico">
                    <Form.Label>Nombre científico</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nombre científico del animal"
                        value={formData.nombre_cientifico}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" controlId="origen">
                        <Form.Label>Región</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Región del animal"
                            value={formData.origen}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="edad">
                        <Form.Label>Edad</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Edad del animal"
                            value={formData.edad}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="wiki_url">
                    <Form.Label>Url de la wiki</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="URL"
                        value={formData.wiki_url}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    <span className="material-symbols-outlined">send</span> Enviar
                </Button>
            </Form>
        </>
    );
}

export default EditarAnimal;