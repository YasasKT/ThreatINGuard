import React from 'react';
import './Dashboard.css'
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { faHome, faChartBar, faExclamationCircle, faBell, faUsers, faFileAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
    return (
        <div className='navigation-panel'>
            <div className='logo'>ThreatINGuard</div>
            <ul className='navigation-sections'>
                <li><FontAwesomeIcon icon={faHome} /><a href='/Landing'>  Dashboard</a></li>
                <li><FontAwesomeIcon icon={faChartBar} /><a href='/Landing'>  Monitoring</a></li>
                <li><FontAwesomeIcon icon={faExclamationCircle} /><a href='/Landing'>  Threats</a></li>
                <li><FontAwesomeIcon icon={faBell} /><a href='/Landing'>  Alerts</a></li>
                <li><FontAwesomeIcon icon={faUsers} /><a href='/Landing'>  Users</a></li>
                <li><FontAwesomeIcon icon={faFileAlt} /><a href='/Landing'>  Reports</a></li>
                <li><FontAwesomeIcon icon={faSignOutAlt} /><a href='/Landing'>  Logout</a></li>
            </ul>
        </div>
    );
};

export default Navigation;