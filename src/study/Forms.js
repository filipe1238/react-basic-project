import React, { useState } from 'react';

import { Form, Button, Col, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar.js';


const Forms = () => {
    const onFormSubmit = (evt) => {
        setUser(evt.target.value);
        console.log(user);
    };
    const [user, setUser] = useState("user padrao");
    const [password, setPassword] = useState("pass padrao");


    const handleChangeUser = (evt) => {
        setUser(evt.target.value);
    }
    const handleChangePass = (evt) => {
        setPassword(evt.target.value);
    }


    return (

        <div>
            <form onSubmit={onFormSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" >
                        <Form.Label htmlFor="inputUserName5">User Name: {user}</Form.Label>
                        <Form.Control
                            value={user}
                            type="username"
                            id="inputUserName5"
                            aria-describedby="passwordHelpBlock"
                            onChange={handleChangeUser}
                        />

                    </Form.Group>


                    <Form.Group as={Col} md="4" controlId="formBasicPassword"   >

                        <Form.Label htmlFor="inputPassword5">Password:{password }</Form.Label>
                        <Form.Control
                            type="password"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                            onChange={handleChangePass}
                            value={password}
                        />
                        <Form.Text id="passwordHelpBlock">
                            Your password must be 8-20 characters long, contain letters and numbers, and
                            must not contain spaces, special characters, or emoji.
                        </Form.Text>

                    </Form.Group>


                </Row>
                <Button type="submit">Submit form</Button>


            </form>

        </div >
    );
}

export default Forms;