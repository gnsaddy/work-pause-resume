import {BrowserRouter as Router} from "react-router-dom";
import React from 'react';

import App from "./App";

function Routes(props) {
    return (
        <>
            <Router>
                <App />
            </Router>
        </>
    );
}

export default Routes;