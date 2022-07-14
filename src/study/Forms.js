import React, { useState } from 'react';

import { Form, Button, Col, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar.js';


const Forms = () => {
    const onFormSubmit = (evt) => {
        setUser(evt.target.value);
        console.log(user);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.name &&
            user.password) {
            const newUser = { ...user, id: new Date().getTime().toString() };
            setUsers([...users, newUser]);
            setUser({ name: '', password: '' });
        }

    }


    const [user, setUser] = useState({ name: '', password: '' });

    const [users, setUsers] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name
        setUser({ ...user, [name]: value })

    }


    return (

        <form className='form' onSubmit={handleSubmit}>
            <div className='form-control gap-50'>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" >
                        <Form.Label htmlFor="inputUserName5">User Name: {user.name}</Form.Label>
                        <Form.Control
                            value={user.name}
                            type="username"
                            name="name"
                            id="inputUserName5"
                            aria-describedby="passwordHelpBlock"
                            onChange={handleChange}
                        />

                    </Form.Group>


                    <Form.Group as={Col} md="4" >

                        <Form.Label htmlFor="inputPassword5">Password:{user.password}</Form.Label>
                        <Form.Control
                            type="password"
                            id="inputPassword5"
                            name="password"
                            aria-describedby="passwordHelpBlock"
                            onChange={handleChange}
                            value={user.password}
                        />
                        <Form.Text id="passwordHelpBlock">
                            Your password must be 8-20 characters long, contain letters and numbers, and
                            must not contain spaces, special characters, or emoji.
                        </Form.Text>

                    </Form.Group>


                </Row>
                <Button type="submit">Submit form</Button>

            </div>
        </form>

    );
}

export default Forms;