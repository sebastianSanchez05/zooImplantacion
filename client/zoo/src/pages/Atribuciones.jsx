import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';

const Atribuciones = () => {
    const atribuciones = [
        {
            url: 'https://www.flaticon.com/free-icons/zoo',
            title: 'zoo icons',
            madeBy: 'Zoo icons created by Freepik - Flaticon'
        },
        {
            url: 'https://www.flaticon.com/free-icons/flying-saucer',
            title: 'flying saucer icons',
            madeBy: 'Flying saucer icons created by LAFS - Flaticon'
        },
    ];

    return (
        <>
            <h1>Atribuciones</h1>
            <p>Estas personas han compatido su talento con este proyecto, gracias!</p>
            <Container>
                <Row>
                    <Col>
                        <ListGroup>
                            {
                                atribuciones.map((atribucion, index) => (
                                    <ListGroup.Item key={index}>
                                        <a href={`${atribucion.url}`} target="_blank" rel="noopener noreferrer" title={`${atribucion.title}`}>{`${atribucion.madeBy}`}</a>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Atribuciones;