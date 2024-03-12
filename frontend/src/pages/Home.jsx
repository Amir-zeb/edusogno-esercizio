import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { protectedRoute } from "../hoc/protectedRoute";
import axios from 'axios';
import { useEffect, useState } from "react";
import { baseUrl } from "../contants";

function Home() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseUrl}?route=evento`);
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h2 className='form-heading mb-3 mb-md-4'>Ciao NOME ecco i tuoi eventi</h2>
                    {isLoading &&
                        <div className="text-center">
                            <Spinner className='ms-1 text-primary' animation="border" size="lg" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        </div>
                    }
                    {!isLoading && !items.length &&
                        <div className="data_not_found">Data Not Found.</div>
                    }
                    {!isLoading &&
                        items.length ?
                        <div class="d-flex flex-column flex-sm-row justify-content-between gap-sm-3 gap-md-5">
                            {items.map(ele => {
                                return (
                                    <Card className="event_cards mb-3 mb-sm-0">
                                        <Card.Body>
                                            <Card.Title>{ele?.nome_evento || ''}</Card.Title>
                                            <Card.Text>
                                                {ele?.data_evento || ''}
                                            </Card.Text>
                                            <Button variant="primary" className="w-100 text-uppercase">Join</Button>
                                        </Card.Body>
                                    </Card>
                                )
                            })}
                        </div>
                        : null
                    }
                </Col>
            </Row>
        </Container>
    );
}

export default protectedRoute(Home);