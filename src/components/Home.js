import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './style.css';

const Home = () => {
  const [data, setData] = useState([]);

  //Get all data from database
  const fetchData = async () => {
    try {
        const fetchResponse = await fetch('http://localhost:3000/read', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!fetchResponse.ok) {
            throw new Error('Network response was not ok');
        }
        const fetchedData = await fetchResponse.json();
        setData(fetchedData);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
  };


  //Get data on refresh
  useEffect(()=> {
    fetchData();
  }, [])

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
          <h1 className="title">D A T A</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {data.map((datum) => (
                <tr key={datum.id}>
                  <td>{datum._id.slice(-2)}</td>
                  <td>{datum.name}</td>
                  <td>{datum.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
