import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './style.css';

const Insert = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/api/data', { // Updated URL
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: id,
      name: name
    }),
   });
  }

  return (
    <>
      <div class="grid-container">
        <div class="box top-box">
          <Link className="home-link" to="/">H O M E</Link>
        </div>
        <div class="box top-box">
          <h1 className="header">STUDENTS MANAGEMENT SYSTEM</h1>
        </div>
        <div class="box bottom-box nav-box">
            <Navbar />
        </div>
        <div class="box bottom-box data-box">
          <h1 className="title">I N S E R T</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="id" value={id} onChange={(e) => setId(e.target.value)} required />
            <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} required />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
)};

export default Insert;
