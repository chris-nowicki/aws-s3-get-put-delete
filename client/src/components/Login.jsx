import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [error, setError] = useState('')
  const [userLogin, setUserLogin] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    
    axios.post('http://localhost:8000/api/users/login', userLogin, {
      withCredentials: true
    })
    .then(res => {
      console.log(res.data)
      navigate('/dashboard')
    })
    .catch(err => {
      setError('Invalid Email/Password!')
      console.log(err)
    })
  }

  const handleChange = (e) => {
    setUserLogin({...userLogin, [e.target.name]:e.target.value})
  }

  return (
    <div>
        <div className="flex flex-col min-h-full h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full items-center justify-center max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-center text-lg text-gray-600">
                Don't have an account?{' '}
                <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign Up
                </a>
                {
                  error &&
                  <p className='text-red-600 text-md mt-3'>{error}</p>
                }
              </p>
            </div>
            <form className=" space-y-6" action="#" method="POST" onSubmit={handleLogin}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only text-lg">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-4 text-lg text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login