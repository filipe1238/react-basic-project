import React from 'react';
import { Container } from 'react-bootstrap';
import {Link} from 'react-router-dom';


const ErrorPage = () => {
    return (
        <div   className='form-control d-flex justify-content-center'>
            <Container>
                <div   className='d-flex justify-content-center'>
                    <h3><strong>This page doesn't exist</strong></h3>
                </div>
                <div   className='d-flex justify-content-center'>
                    <Link to="/">Turn back</Link>
                </div>
            </Container>
            <hr />
        </div>
    );
}

export default ErrorPage;