import React, { useState } from 'react';
import './App.css';

function App() {
  const [numberId, setNumberId] = useState('');
  const [prevState, setPrevState] = useState([]);
  const [currState, setCurrState] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [average, setAverage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!numberId) {
      setError('Please enter a number ID');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:9876/numbers/${numberId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setPrevState(data.windowPrevState);
      setCurrState(data.windowCurrState);
      setNumbers(data.numbers);
      setAverage(data.avg);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Average Calculator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={numberId}
          onChange={(e) => setNumberId(e.target.value)}
          placeholder="Enter number ID (e.g., p, f, e, r)"
        />
        <button type="submit">Calculate Average</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="container">
        <div className="box">
          <h2>Previous State:</h2>
          <p>{prevState.join(', ')}</p>
        </div>
        <div className="box">
          <h2>Current State:</h2>
          <p>{currState.join(', ')}</p>
        </div>
        <div className="box">
          <h2>Numbers:</h2>
          <p>{numbers.join(', ')}</p>
        </div>
        <div className="box">
          <h2>Average:</h2>
          <p>{average}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
