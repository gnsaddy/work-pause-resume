import React from 'react';
import {Link} from "react-router-dom";

function NavbarComponent(props) {
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-light font-weight-bold shadow fixed-top bg-white">
                <Link className="navbar-brand" to={'/'}># Notify 21</Link>
            </nav>
        </>
);
}

export default NavbarComponent;