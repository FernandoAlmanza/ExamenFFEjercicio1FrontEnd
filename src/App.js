import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Fragment} from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NewProduct from "./components/NewProduct";
import ModifyProduct from "./components/ModifyProduct";
import Register from "./components/Register";

function App() {
  return (
    <Fragment>
        <Router>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/inventory" element={<Dashboard />}/>
                <Route path="/inventory/add" element={<NewProduct />}/>
                <Route path="/inventory/modify/:id" element={<ModifyProduct />}/>
            </Routes>
        </Router>
    </Fragment>
  );
}

export default App;
