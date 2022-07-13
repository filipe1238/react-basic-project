import React from 'react';
import App from './study/App';
import Forms from './study/Forms';
import NavBar from './study/NavBar'
import Test from './study/Test'
import DatatableComponent from './study/Datatable';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CarouselTest from './CarouselTest';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const Paths = () => {
    return (
        <div>
            <NavBar />
            <Router>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="App" element={<App />} />
                    <Route path="CarouselTest" element={<CarouselTest />} />
                    <Route path="Forms" element={<Forms />} />
                    <Route path="Test" element={<Test />} />
                </Routes>
            </Router>
        </div>
    );
}

export default Paths;