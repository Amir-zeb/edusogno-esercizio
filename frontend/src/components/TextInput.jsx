import { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

function TextInput({label,errorMessage,defaultMessage,...props}) {
    return (
        <Form.Group className="mb-3" controlId="ControlInputEmail">
            <Form.Label>{label}</Form.Label>
            <InputGroup hasValidation>
                <Form.Control isInvalid={errorMessage} {...props} />
                <Form.Control.Feedback type="invalid">
                    {errorMessage||defaultMessage}
                </Form.Control.Feedback>
            </InputGroup>
        </Form.Group>
    );
}

export default TextInput;