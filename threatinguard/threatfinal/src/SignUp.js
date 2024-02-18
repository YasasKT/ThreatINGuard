import React, { useState } from 'react';
import './signUp.css'


const Text = (props) => {
    return (
      <div className={props.styleClass}>{props.text}</div>
    )
}

const SignUp = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

       /* alert('Submitted form data:
            Name: ${name}
            Email: ${email}
            Role: ${role}
            Password: ${password}
            Confirm Password: ${confirmPassword}
        ');*/

        //? clear input fields after submit
        setName('');
        setEmail('');
        setRole('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div className='container'>
            <div className='bordr-up'>
            <header className='header'>
                <h1>Create An Account</h1>
            </header>
            <Text text="Please provide your information to create an account" styleClass='small-text' />
            <form onSubmit={handleSubmit}>
                <div className='form-container'>
                    <div className='label-input-container'>
                        <label  htmlFor='name' className='label'>Name: </label>
                        <input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} required className='input' placeholder='Full Name'/>
                    </div>
                    
                    <div className='label-input-container'>
                        <label htmlFor='email' className='label'>Email: </label>
                       <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required className='input' placeholder='Email Address'/>
                    </div>
                    
                    <div className='label-input-container'>
                        <label htmlFor='role' className='label'>Role: </label>
                        <select id='role' value={role} onChange={(e) => setRole(e.target.value)} required className='input'>
                            <option value=''>Select a Role</option>
                            <option value='admin'>Admin</option>
                            <option value='user'>User</option>
                        </select>
                    </div>
                    
                    <div className='label-input-container'>
                        <label htmlFor='password' className='label'>Password: </label>
                        <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required className='input' placeholder='Enter Password'/>
                    </div>

                    <div className='label-input-container'>
                        <label htmlFor='confirmPassword' className='label'>Confirm Password: </label>
                        <input type='password' id='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className='input' placeholder='Re-enter Password'/>
                    </div>
                    
                    <button className='button' type='submit'>Sign Up</button>
                    <div className='text-link'>
                        Already have an account? <a href='/Landing'>Login</a>
                    </div>
                </div>
            </form>
            </div>
        </div>
    );
};

export default SignUp;