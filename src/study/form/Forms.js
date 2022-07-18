import React, { useState, useReducer, useContext } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { reducer } from './reducer'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const UserContext = React.createContext();

const Forms = () => {

    /*const onFormSubmit = (evt) => {
        setUser(evt.target.value);
        console.log(user);
    };*/
    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.name &&
            user.password) {
            const newUser = { ...user, id: new Date().getTime().toString() };
            dispatch({ type: 'ADD_USER', payload: newUser })
            setUser({ name: '', password: '' })
        }


    }

    const defaultState = {
        users: []
    }
    const [state, dispatch] = useReducer(reducer, defaultState);
    const [user, setUser] = useState({ name: '', password: '' });

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name
        setUser({ ...user, [name]: value })

    }
    const contextProps = {
        users: state.users,
        dispatch
    }

    return (
        <>
            <form className='form' onSubmit={handleSubmit}>
                <div className='form-control d-flex justify-content-center'>
                    <Row className="mb-8">
                        <Form.Group as={Col} md="3" >
                            <Form.Label htmlFor="inputUserName5">User Name: {user.name}</Form.Label>
                            <Form.Control
                                required
                                value={user.name}
                                type="username"
                                name="name"
                                onInvalid={e => e.target.setCustomValidity('Enter User Name Here')}
                                onInput={e => e.target.setCustomValidity('')}
                                id="inputUserName5"
                                onChange={handleChange}
                            />

                        </Form.Group>


                        <Form.Group as={Col} md="4" >

                            <Form.Label htmlFor="inputPassword5">Password:{user.password}</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                onInvalid={e => e.target.setCustomValidity('Enter Password Here')}
                                onInput={e => e.target.setCustomValidity('')}
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


                        <div>
                            <Button type="submit">Submit form</Button>
                        </div>

                    </Row>
                </div>
            </form>
            <Container>
                <div className='form-control d-flex justify-content-start'>
                    <Container>
                        <Form.Label><strong>Name</strong></Form.Label>
                    </Container>
                    <Container>
                        <Form.Label><strong>Password</strong></Form.Label>
                    </Container>
                    <Container>
                        <Form.Label><strong>Remove</strong></Form.Label>
                    </Container>
                </div>
                <UserContext.Provider value={contextProps}>
                    <UserList />
                </UserContext.Provider>
            </Container>
            <hr />
        </>

    );
}
const UserList = () => {
    const { dispatch,users } = useContext(UserContext);
    return (
        <>
            {users.map((user) => {
                //needs the return here
                return <div className='form-control d-flex' key={user.id}>
                    <Container>
                        {user.name}
                    </Container>
                    <Container>
                        {user.password}
                    </Container>
                    <Container>
                        <button type="button" className="btn btn-white" onClick={() => dispatch({ type: 'DELETE_USER', payload: user.id })}>
                            <i className="bi bi-trash-fill"></i>
                        </button>
                    </Container>
                </div>
            })}
        </>

    );
}
export default Forms;