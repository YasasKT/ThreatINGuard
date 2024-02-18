import React, { useState } from 'react';
import './signUp.css'


const Text = (props) => {
    return (
        <div className={props.styleClass}>{props.text}</div>
    )
}

const Sign = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        /*
        console.log('Submitted form data: ');
        console.log('Email:', email);
        console.log('Password', password); */

        //? Clear input fields after submit
        setEmail('');
        setPassword('');
    };

    return (
        <div className='container'>
            <div className='bordr'>
            <header className='header'>
                <h1>Sign In to Your Account</h1>
            </header>
            <Text text="Sign in using your admin or user account" styleClass='small-text' />
            <form onSubmit={handleSubmit}>
                <div className='form-container'>
                    <div className='label-input-container'>
                        <label htmlFor='email' className='label'>Email: </label>
                        <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required className='input' placeholder='Enter Your Email Address' />
                    </div>

                    <div className='label-input-container'>
                        <label htmlFor='password' className='label'>Password: </label>
                        <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required className='input' placeholder='Enter Your Password' />
                    </div>
                    
                    <button className='button'>Sign In</button>
                    <div className='text-link'>
                        Don't have an account? <a href='./SignUp'>Sign Up</a>
                    </div>
                </div>
            </form>
            </div>
        </div>
    );
};

export default Sign;