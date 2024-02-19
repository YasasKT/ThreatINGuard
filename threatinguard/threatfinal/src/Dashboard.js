import React from 'react';
import Navigation from './Navigation';
import SearchBar from './Searchbar';


const Dashboard = () => {
    return (
        <div className='dashboard-container'>
            <Navigation />
            <div className='grey-back'>
                <div className='search-container'>
                    <SearchBar />
                </div>
            </div>
        </div>
    );
};


export default Dashboard;
