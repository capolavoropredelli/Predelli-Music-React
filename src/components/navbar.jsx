import { Link } from 'react-router-dom';
import { useState } from 'react';
import './../style/navbar.css'

function Navbar() {
    const [current, setCurrent] = useState(1)
    return (
        <nav>
            <Link to="/" className={current == 1 ? "current" : ""} onClick={() => setCurrent(1)}>Home</Link>
            <Link to="/queue" className={current == 2 ? "current" : ""} onClick={() => setCurrent(2)}>queue</Link>
            <Link to="/library" className={current == 3 ? "current" : ""} onClick={() => setCurrent(3)}>library</Link>
            <Link to="/download" className={current == 4 ? "current" : ""} onClick={() => setCurrent(4)}>download</Link>
            <Link to="/settings" className={current == 5 ? "current" : ""} onClick={() => setCurrent(5)}>settings</Link>
        </nav>
    )
}

export default Navbar