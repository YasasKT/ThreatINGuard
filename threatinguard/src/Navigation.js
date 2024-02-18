import React from 'react';
import './css/Dashboard.css'

const Navigation = () => {
    return (
        <div className='navigation-panel'>
            <div className='logo'>ThreatINGuard</div>
            <ul className='navigation-sections'>
                <li><a href='/Landing'>Dashboard</a></li>
                <li><a href='/Landing'>Monitoring</a></li>
                <li><a href='/Landing'>Threats</a></li>
                <li><a href='/Landing'>Alerts</a></li>
                <li><a href='/Landing'>Users</a></li>
                <li><a href='/Landing'>Reports</a></li>
                <li><a href='/Landing'>Logout</a></li>
            </ul>
        </div>
    );
};

export default Navigation;