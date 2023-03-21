// src/components/Szamla.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Szamla = () => {
  const [szamlak, setSzamlak] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSzamlak = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/szamlak');
        setSzamlak(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching szamlak:', error);
        setIsLoading(false);
      }
    };
    fetchSzamlak();
  }, []);

  return (
    <div>
      <h2>Számlák</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {szamlak.map((szamla) => (
            <li key={szamla._id}>
              {szamla.szamlaSorszam} - {szamla.kiallito} - {szamla.vevo}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Szamla;
