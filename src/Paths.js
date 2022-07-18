import React from 'react';
import App from './study/App';
import Forms from './study/form';
import ErrorPage from './study/ErrorPage';
import NavBar from './study/NavBar'
import Test from './study/Test'
import DatatableComponent from './study/Datatable';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarouselTest from './CarouselTest';
import 'bootstrap/dist/css/bootstrap.min.css';


const Paths = () => {
    return (
        <div>
            {/* ROUTES == SWTICH in ver 5.* */}

            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="App" element={<App />} />
                    <Route path="CarouselTest" element={<CarouselTest />} />
                    <Route path="Forms" element={<Forms />} />
                    <Route path="Test" element={<Test />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default Paths;