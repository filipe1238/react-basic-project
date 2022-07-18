import React from 'react';
import ReactDOM from 'react-dom';
import Paths from './Paths'
import { BrowserRouter as Router, Route, Switch, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <div>
        <Paths />
    </div>
    , document.getElementById('root'));
