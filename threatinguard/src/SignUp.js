import React, { useState } from 'react';



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

        setName('');
        setEmail('');
        setRole('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div>
            <header style={{ fontSize: '40px', fontWeight: 600, lineHeight: '58px', textAlign: 'center' }}>
                <h1>Create An Account</h1>
            </header>
            <div style={{ fontSize: '20px', fontWeight: 500, lineHeight: '24px', textAlign: 'center' }}>
            <Text text="Please provide your information to create an account"></Text>
            </div>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
                    <label  htmlFor='name'>Name: </label>
                    <input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} required />
                    
                    <label htmlFor='email'>Email: </label>
                    <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    
                    <label htmlFor='role'>Role: </label>
                    <select id='role' value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value=''>Select a Role</option>
                        <option value='admin'>Admin</option>
                        <option value='user'>User</option>
                    </select>

                    <label htmlFor='password'>Password: </label>
                    <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input type='password' id='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

                    <button type='submit'>Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;