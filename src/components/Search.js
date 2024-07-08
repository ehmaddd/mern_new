import { useState, useEffect } from "react";
import Navbar from './Navbar';
import { Link } from "react-router-dom";

const Search = () => {
    const [data, setData] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [message, setMessage] = useState('');

    const fetchData = async () => {
      try {
        const fetchResponse = await fetch('http://localhost:3000/fetchid', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const fetchedData = await fetchResponse.json();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

  useEffect(()=> {
    fetchData();
  }, [])

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/api/dataget', { // Updated URL
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: searchId,
    }),
  });
  const data = await response.json();
  setMessage(data.name);
  };

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
          <h1 className="title">S E A R C H</h1>
          <form onSubmit={handleSubmit2}>
            <select
            className="student-id"
            onChange={(e) => setSearchId(e.target.value)}
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
            <button type="submit">Submit</button>
          </form>
          <p>{message}</p>
        </div>
      </div>
    </>
)};


export default Search;
