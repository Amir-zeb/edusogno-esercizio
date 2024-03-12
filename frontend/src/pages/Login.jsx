import { useContext, useState } from 'react';
import { Container, Row, Col, Form, Button,Spinner } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PasswordInput from '../components/PasswordInput';
import TextInput from '../components/TextInput';
import { baseUrl } from '../contants';
import { useNavigate } from "react-router-dom";
import { ToastContext } from '../context/custom-toast';
import { loginUser } from '../store/reducer'
import { useDispatch } from 'react-redux';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const { addToast } = useContext(ToastContext);
    const dispatch = useDispatch()

    const handleFormSubmission = async (event) => {
        event.preventDefault();
        setErrorMessage('')
        const form = event.currentTarget;
        setValidated(true);
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            setIsLoading(true);
            axios.post(`${baseUrl}?route=login`, { email, password }).then((res) => {
                const user=res?.data?.data
                setIsLoading(false);
                addToast(
                    {
                        type: "success",
                        message: res?.data?.message,
                        duration: "3000"
                    }
                )
                dispatch(loginUser(user))
                navigate('/');
            }).catch(error => {
                if (error?.response?.data) {
                    setValidated(false);
                    setErrorMessage(error?.response?.data?.message)
                    setIsLoading(false);
                }
            })
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h2 className='form-heading mb-3 mb-md-4'>Hai già un account?</h2>
                    <div className="form_container">
                        <Form noValidate validated={validated} onSubmit={handleFormSubmission}>
                            <TextInput label='Inserisci l’email' defaultMessage='Please provide valid email.' errorMessage={errorMessage} value={email} onChange={e => setEmail(e.target.value)} required type="email" placeholder="name@example.com" />
                            <PasswordInput errorMessage={errorMessage} required value={password} onChange={e => setPassword(e.target.value)} />
                            <Button variant="primary" type="submit" disabled={isLoading} className='w-100 my-2 my-md-4'>
                                ACCEDI{isLoading && <Spinner className='ms-1' animation="border" size="sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>}
                            </Button>
                            <div className='text-center'>
                                <Link to='/register'>Non hai ancora un profilo? Registrati</Link>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;