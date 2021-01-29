import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Moto } from "./Components/Moto";
import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Moto />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

<script src="https://unpkg.com/react-router-dom/umd/react-router-dom.min.js"></script>