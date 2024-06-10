import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './style.css';


const Update = () => {
  const [data, setData] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [name, setName] = useState('');
  const [changeName, setChangeName] = useState('');

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

  //Get data of specific ID
  const fetchDetails = async () => {
    try {
      const fetchResponse = await fetch('http://localhost:4000/api/dataget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: searchId,
        }),
      });
      const fetchedData = await fetchResponse.json();
      if(fetchedData){
        setName(fetchedData.name);
      }
      else {
        setName('');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(()=> {
    fetchData();
  }, [])

  const activateSearch = (value) => {
    setSearchId(value);
    fetchDetails();
  }

  useEffect(()=> {
    fetchDetails();
  }, [searchId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(name !== changeName && changeName!== ''){
      const response = await fetch('http://localhost:4000/api/updatedata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: searchId,
          name: changeName
        }),
      });
    }
    else {
      console.log("Nothing to change");
    }
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
          <h1 className="title">U P D A T E</h1>
            <select
            className="student-id"
            onChange={(e) => activateSearch(e.target.value)}
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
          <form onSubmit={handleSubmit}>
            <input type="text" name="nameText" defaultValue={name} onInput={(e) => setChangeName(e.target.value)} />
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </>
)};

export default Update;
