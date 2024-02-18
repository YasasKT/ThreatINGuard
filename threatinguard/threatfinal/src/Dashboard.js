import React from 'react';
import Navigation from './Navigation';
import SearchBar from './Searchbar';


const Dashboard = () => {
    return (
        <div className='dashboard-container'>
            <Navigation />
            <SearchBar />
        </div>
    );
};


export default Dashboard;
