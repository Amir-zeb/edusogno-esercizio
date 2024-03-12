import { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

function PasswordInput({ errorMessage, ...props }) {
    const [showPass, setShowPass] = useState(false);

    const clickHandler = () => {
        setShowPass(!showPass)
    }

    return (
        <>
            <Form.Label>Inserisci la password</Form.Label>
            <InputGroup hasValidation className="mb-3" controlId="ControlInputEmail">
                <Form.Control isInvalid={errorMessage} type={!showPass ? "password" : "text"} placeholder="Scrivila qui" minLength={6} {...props} />
                <InputGroup.Text>
                    <i onClick={clickHandler} className={showPass ? 'fas fa-eye-slash icon_primary' : 'fas fa-eye icon_primary'}></i>
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                    {errorMessage || 'Please provide a valid password.'}
                </Form.Control.Feedback>
            </InputGroup>
        </>
    );
}

export default PasswordInput;