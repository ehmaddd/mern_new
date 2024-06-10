import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './style.css';

const Delete = () => {
  const [data, setData] = useState([]);
  const [delId, setDelId] = useState('');

  //Get all IDs for dropdown
  const fetchData = async () => {
    try {
      const fetchResponse = await fetch('http://localhost:4000/api/fetchid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const fetchedData = await fetchResponse.json();
      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // fetch data initially
  useEffect(()=> {
    fetchData();
  }, [])

  // Action after button click
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(delId){
      const response = await fetch('http://localhost:4000/api/deletedata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: delId,
        }),
      });
    }
    else {
      console.log("Nothing to delete");
    }
  }

  // Show on the webpage
  return (
    <>
      <div className="grid-container">
        <div className="box top-box">
          <Link className="home-link" to="/">H O M E</Link>
        </div>
        <div className="box top-box">
          <h1 className="header">STUDENTS MANAGEMENT SYSTEM</h1>
        </div>
        <div className="box bottom-box nav-box">
            <Navbar />
        </div>
        <div className="box bottom-box data-box">
          <h1 className="title">D E L E T E</h1>
          <form onSubmit={handleSubmit}>
          <select
            className="student-id"
            onChange={(e)=> setDelId(e.target.value)}
            required
            >
            <option value="null">Select Student</option>
            {
            data.map((datum) => {
              return (
                <option>{datum.id}</option>
              )
            })
            }
            </select>
            <button type="submit">Delete</button>
          </form>
        </div>
      </div>
    </>
)};

export default Delete;
