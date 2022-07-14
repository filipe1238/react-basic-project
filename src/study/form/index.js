import React from 'react';
import ReactDOM from 'react-dom';
import Forms from './Forms'
import { BrowserRouter as Router, Route, Switch, Navigate } from 'react-router-dom';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
ReactDOM.render(
    <div>
        <Forms />
    </div>
    , document.getElementById('root'));

export default Forms;