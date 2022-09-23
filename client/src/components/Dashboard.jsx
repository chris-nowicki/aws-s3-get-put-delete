import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Dashboard() {
    const [user, setUser] = useState('')
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()

    // retrieve logged in user and return to login page if there is no logged in user
    useEffect(() => {
        axios.get('http://localhost:8000/api/users/getUser', { withCredentials: true })
            .then(res => {
                setUser(res.data)
                setLoaded(true)
            })
            .catch(err => {
                console.log(err)
                navigate('/')
            })
            // eslint-disable-next-line
    }, [])
    
    //  clears cookie and routes user to login screen
    const handleLogOut = () => {
        axios.post('http://localhost:8000/api/users/logout', {},
            { withCredentials: true, }
        )
            .then(res => {
                console.log(res)
                setUser('')
                setLoaded(false)
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    // upload profile picture to an s3 bucket, update the user's profileImage in the DOM and Database
    const uploadProfilePicture = async (e) => {
        e.preventDefault()
        
        // selects the value of the file from the input form
        const selectedFile = document.getElementById('file').files[0]

        // get secure s3 url
        const url  = await axios.get('http://localhost:8000/s3Url', { withCredentials: true })
            .then(res => res.data.url)
            .catch(err => {
                console.log(err)
            })
        
            console.log(url)

        await axios.put(url, selectedFile, { headers: {'Content-Type': 'multipart/form-data'}}, {withCredentials: true})

        // parse out the image url link and update the user profile image link to uploaded picture
        const imageUrl = url.split('?')[0]
        setUser({...user, profileImageURL:imageUrl})
    
        // update user in MongoDB with profile picture from the s3 bucket
        axios.put(`http://localhost:8000/api/users/profilePicture/${user._id}`, {
            profileImageURL: imageUrl
        }, { withCredentials: true })
            .then(res => {
                document.getElementById('file').value = ''
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    // delete profile picture from AWS and mongoDB
    const handleProfilePictureDelete = () => {
        const imageName = user.profileImageURL.split('/').slice(3).join('')

        axios.delete(`http://localhost:8000/s3image/delete/${imageName}`, { withCredentials: true })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        

        axios.put(`http://localhost:8000/api/users/profilePicture/${user._id}`, {
            profileImageURL: ''
        }, { withCredentials: true })
            .then(res => {
                console.log(res.data)
                setUser({...user, profileImageURL:''})
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            {/* page will only load if user is logged in and data is loaded */}
            { loaded &&
                <>
                    {/* upload profile picture section */}
                    <div className='flex flex-col justify-center items-center w-1/2 rounded p-6 shadow-lg shadow-gray-400 text-4xl'>
                        <p>Welcome, {user.firstName} {user.lastName}!</p>
                        <p className='text-lg'>Your email is: <span className='text-blue-600'>{user.email}</span></p>

                        {/* will only show profile picture if a link exists in the database */}
                        { user.profileImageURL && <img src={user.profileImageURL} width='250px' height='250px' className='mt-3' alt=''/> }
                        
                        <button type='submit' className='bg-indigo-600  hover:bg-indigo-700 text-xl text-white px-5 py-2 rounded w-full mt-3' onClick={() => handleLogOut()}>Logout</button>
                    </div>
                    <div className='mt-10'>
                        <form className='flex flex-col' onSubmit={(e) => uploadProfilePicture(e)}>
                            <label className='text-xl text-blue-600 text-center'>Upload Profile Picture</label>
                            <div className='flex flex-row'>
                                <input id='file' type='file' className='border border-black rounded p-2 w-3/4 mt-3 mr-3'/>
                                <button type='submit' className='border border-black hover:bg-black hover:text-white text-xl text-black px-3 py-2 w-1/4 rounded mt-3'>Upload</button>
                            </div>
                        </form>

                        {/* delete profile picture */}
                        <button className='bg-red-600  hover:bg-red-700 text-xl text-white px-5 py-2 rounded w-full mt-3' onClick={() => handleProfilePictureDelete()}>Delete Profile Picture</button>
                    </div>
                </>
            }
        </div>
    )
}

export default Dashboard