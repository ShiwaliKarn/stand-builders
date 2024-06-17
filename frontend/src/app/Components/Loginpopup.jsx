'use client';

import { useState, useEffect } from 'react';
import './Navbar.css'
import './Loginpopup.css'
import { Input, Modal } from 'antd';
import axios from "axios";
import toast from 'react-hot-toast';


const Loginpopup = ({ setLoggedIn }) => {
    const [currState, setCurrState] = useState("Login");
    const [password, setPassword] = useState("");
    const [reEnteredPassword, setReEnteredPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setLoggedIn(true);
        }
    }, [setLoggedIn]);

    const registerUser = async (user) => {
        try {
            const response = await axios.post('http://localhost:8081/api/user/register', user);
            if (response.data.success) {
                console.log('Registration successful');
                toast.success('Account created successfully');
                localStorage.setItem('token', response.data.token);
                resetForm();
                setModalOpen(false);
                setLoggedIn(true);
                     
           
            } else {
                console.error('Registration failed');
                toast.error("Registration failed");
            }
        } catch (error) {
            console.error('Error', error);
            toast.error("An error occurred during registration");
        }
    };

    const loginUser = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:8081/api/user/login', credentials);
            if (response.data.success) {
                console.log('Login Successful');
                toast.success('Login successful');
                localStorage.setItem('token', response.data.token);
                resetForm();
                setModalOpen(false);
                setLoggedIn(true);
             
            } else {
                console.error('Login failed');
                toast.error("Login failed");
            }
        } catch (error) {
            console.error('Error', error);
            toast.error("An error occurred during login");
        }
    };

    const resetForm = () => {
        setName("");
        setEmail("");
        setPassword("");
        setReEnteredPassword("");
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (currState === "Sign Up" && password !== reEnteredPassword) {
            setPasswordsMatch(false);
            return;
        }
        setPasswordsMatch(true);

        const user = { name, email, password };

        if (currState === "Sign Up") {
            registerUser(user);
        } else {
            loginUser({ email, password });
        }
    };

    return (
        <>
            <button className='sign-in' title='Sign in' onClick={() => setModalOpen(true)}> Sign in</button>

            <Modal
                title={currState}
                centered
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
            >
                <form onSubmit={handleSubmit}>

                    <div className='login_popup_inputs'>
                        {currState === "Login" ? null : (

                            <Input
                                placeholder="Your name"
                                required
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />

                        )}

                        <Input
                            type="email"
                            placeholder='Your Email'
                            required
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />

                        <Input.Password
                            placeholder="Password"
                            required
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            className='password-input'
                        />

                        {currState === "Sign Up" && (
                            <>
                                <Input.Password
                                    placeholder="Re-enter password"
                                    required
                                    value={reEnteredPassword}
                                    onChange={event => setReEnteredPassword(event.target.value)}
                                    className='password-input'
                                />
                                {!passwordsMatch && <p className='error-message'>Passwords do not match!</p>}
                            </>
                        )}
                    </div>

                    <div className="button-align">
                        <button type="submit" className='sign-in'>{currState === "Sign Up" ? "Sign up" : "Login"}</button>
                    </div>
                    {currState === "Sign Up" && (
                        <div className='login_popup_condition'>
                            <input type="checkbox" required />
                            <p>By continuing, I agree to the terms of use and privacy policy.</p>
                        </div>
                    )}

                    {currState === "Login" ?
                        <p>Don't have an account? <span className='login-type' onClick={() => setCurrState("Sign Up")}>Create a new account</span></p> :
                        <p>Already have an account? <span className='login-type' onClick={() => setCurrState("Login")}>Login here</span></p>
                    }
                </form>
            </Modal>
        </>
    );
}

export default Loginpopup;



