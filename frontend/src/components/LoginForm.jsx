import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const LoginForm = () => {

    const navigate = useNavigate();
    const [login, setLogin] = useState('Login');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const URL = "http://localhost:4000"
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = login === 'SignUp' ? '/api/user/create' : '/api/user/login';
            const res = await axios.post(`${URL}${endpoint}`, formData);
            alert(`${login} successful: ${res.data.message || 'User authenticated!'}`);
            navigate('/dashbord')

        } catch (error) {
            console.error(`${login} error:`, error?.response?.data || error.message);
            alert(`${login} error: ${error?.response?.data?.message || error.message}`);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            {login === 'SignUp' ?
                <div className="mb-3">
                    <label for="exampleInputPass" className="form-label">User Name</label>
                    <input name='name' onChange={handleChange} type="text" className="form-control" id="exampleInputPass" placeholder='User name ' aria-describedby="passHelp" />

                </div> :
                <></>
            }
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input name='email' onChange={handleChange} type="email" className="form-control" placeholder='email address' id="exampleInputEmail1" aria-describedby="emailHelp" />

            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input name='password' onChange={handleChange} type="password" placeholder='password' className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <br />
            {login === 'Login' ?
                <p style={{ cursor: 'pointer' }}>Dont have account <span onClick={() => setLogin('SignUp')}>SignUp</span></p> :
                <p style={{ cursor: 'pointer' }}>ALready have account <span onClick={() => setLogin('Login')}>Login</span></p>
            }

        </form>

    )
}

export default LoginForm