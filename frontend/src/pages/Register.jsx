import { useContext, useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PasswordInput from '../components/PasswordInput';
import TextInput from '../components/TextInput';
import { baseUrl } from '../contants';
import { useNavigate } from "react-router-dom";
import { ToastContext } from '../context/custom-toast';

function Register() {
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const { addToast } = useContext(ToastContext);

    const handleFormSubmission = (event) => {
        event.preventDefault();
        setErrorMessage('')
        const form = event.currentTarget;
        setValidated(true);
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            setIsLoading(true);
            axios.post(`${baseUrl}?route=register`, { name, lastName, email, password }).then((res) => {
                setIsLoading(false)
                addToast(
                    {
                        type: "success",
                        message: "Your account has been registered. Please Login to your account.",
                        duration: "4000"
                    }
                )
                navigate('/login');
            }).catch(error => {
                setIsLoading(false)
                if (error?.response?.data) {
                    setValidated(false);
                    setErrorMessage(error?.response?.data?.message)
                }
            })
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h2 className='form-heading mb-3 mb-md-4'>Crea il tuo account</h2>
                    <div className="form_container">
                        <Form noValidate validated={validated} onSubmit={handleFormSubmission}>
                            <TextInput label='Inserisci il nome' defaultMessage='Please provide a value.' value={name} onChange={e => setName(e.target.value)} required type="text" placeholder="Mario" />
                            <TextInput label='Inserisci il cognome' defaultMessage='Please provide a value.' value={lastName} onChange={e => setLastName(e.target.value)} required type="text" placeholder="Rossi" />
                            <TextInput label='Inserisci l’email' defaultMessage='Please provide valid email.' errorMessage={errorMessage} value={email} onChange={e => setEmail(e.target.value)} required type="email" placeholder="name@example.com" />
                            <PasswordInput required value={password} onChange={e => setPassword(e.target.value)} />
                            <Button variant="primary" type="submit" disabled={isLoading} className='w-100 my-2 my-md-4'>
                                REGISTRATI{isLoading && <Spinner className='ms-1' animation="border" size="sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>}
                            </Button>
                            <div className='text-center'>
                                <Link to='/login'>Hai già un account? Accedi</Link>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;