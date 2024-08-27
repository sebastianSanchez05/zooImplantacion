import { Container, Row, Col, Image } from 'react-bootstrap';
import notFound from '../../public/not_found.png';

const NoEncotrado = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <img src={notFound} alt="Imagen que representa que la pagina no ha sido encontrado o ha sido borrada" height='300px' width='300px' />
                        <h1>404 No encontrado</h1>
                        <h3>Upps la págino no existe</h3>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default NoEncotrado;