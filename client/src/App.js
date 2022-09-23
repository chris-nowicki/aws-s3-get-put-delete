import React, {useState} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard'

function App() {

  return (
    <div className="flex flex-col">
      <Router>
        <Routes>
          <Route path='/' element={<Login />} default/>
          <Route path='/register' element={<Register  />} />
          <Route path='/dashboard' element={<Dashboard  />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
