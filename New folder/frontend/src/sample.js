// App.js

import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [sum, setSum] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/calculate', { number1, number2 });
      setSum(response.data.sum);
    } catch (error) {
      console.error('Error calculating sum:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Number 1:
          <input
            type="number"
            value={number1}
            onChange={(e) => setNumber1(e.target.value)}
          />
        </label>
        <br />
        <label>
          Number 2:
          <input
            type="number"
            value={number2}
            onChange={(e) => setNumber2(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Calculate Sum</button>
      </form>
      {sum !== null && <p>Sum: {sum}</p>}
    </div>
  );
}

export default App;
