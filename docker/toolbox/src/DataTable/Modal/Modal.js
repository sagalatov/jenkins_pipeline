import React, {useEffect, useState} from 'react';
import './Modal.css';
import Form from 'react-bootstrap/Form';

export default function Modal({props, id}) {
    const [modalState, setModalState] = useState({data: []})

    useEffect(() => {
        setModalState({
            data: props.filter(item => item[0].value === id)

        })
    }, [])


    return (
        <div className="Modal">
            <Form>
                <Form.Group controlId="formGroupName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="value" placeholder="Name" />
                </Form.Group>
                <Form.Group controlId="formGroupAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" placeholder="age" />
                </Form.Group>
                <Form.Group controlId="formGroupPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="number" placeholder="phone" />
                </Form.Group>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter" />
                </Form.Group>
            </Form>
            <p>{id}</p>
        </div>
    )
}