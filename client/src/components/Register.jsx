import React, {useState} from 'react'
import axios from 'axios'
import Input from './elements/Input'
import {useNavigate} from 'react-router-dom'

function Register() {
    const [errors, setErrors] = useState([])
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:8000/api/users/register', user, {
            withCredentials: true
        })
            .then(user => {
                console.log(user.data)
                setErrors([])
                navigate('/dashboard')
            })
            .catch(err => {
                console.log(err.response.data.errors)
                setErrors(err.response.data.errors)
            })
    }

    const handleChange = (e) => {
        setUser({...user, [e.target.name]:e.target.value})
    }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <div className='flex flex-col justify-center items-center w-1/4 rounded p-6 shadow-lg shadow-gray-400'>
            <div>
                <img
                    className="mx-auto h-12 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 mb-6">
                    Register your account
                </h2>
            </div>
            
            {/* registration form */}
            <form onSubmit={handleSubmit} className='w-full'>
                <Input label='First Name' type='text' name='firstName' onChangeProp={(e) => handleChange(e)} errorProps={errors ? errors.firstName : false} />
                <Input label='Last Name' type='text'  name='lastName' onChangeProp={(e) => handleChange(e)}  errorProps={errors ? errors.lastName : false}/>
                <Input label='Email' type='email'  name='email' onChangeProp={(e) => handleChange(e)} errorProps={errors ? errors.email : false} />
                <Input label='Password' type='password'  name='password' onChangeProp={(e) => handleChange(e)}  errorProps={errors ? errors.password : false}/>
                <Input label='Confirm Password' type='password' name='confirmPassword' onChangeProp={(e) => handleChange(e)}  errorProps={errors ? errors.confirmPassword : false}/>
                <button type='submit' className='bg-indigo-600  hover:bg-indigo-700 text-xl text-white px-5 py-2 rounded w-full mt-3'>Register</button>
            </form>
        </div>
    </div>
  )
}

export default Register