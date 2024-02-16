import React from 'react';

const styles = {
    header: {
        fontSize: '3rem',
        fontWeight: 600,
        textAlign: 'center',
        lineHeight: '1.2',
    },
};

const Header = () => {
    return (
        <Header className={styles.header}>
            <h1>Create an Account</h1>
        </Header>
    );
};

export default Header;