import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [number, setNumber] = useState('');
  const [numbersList, setNumbersList] = useState([]);

  useEffect(() => {
   
    fetchNumbers();
  }, []);

  const fetchNumbers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/values/all');
      setNumbersList(response.data);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSaveNumber = async () => {
    try {
      await axios.post('http://localhost:5000/values', { value: number });
      setNumber(''); 
      fetchNumbers();
    } catch (error) {
      console.error('Error saving number:', error);
    }
  };

  return (
    <div>
      <h1>Sample Devoplyment Task for Knovator technologies!</h1>
      <div>
        <label>Enter a Number: </label>
        <input type="number" value={number} onChange={handleNumberChange} />
        <button onClick={handleSaveNumber}>Save</button>
      </div>
      <div>
        <h2>All Numbers:</h2>
        <ul>
        {numbersList.map((num) => (
  <li key={num.id}>{num.number}</li>


          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
