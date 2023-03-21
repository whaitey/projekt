// src/components/UjSzamla.js
import React, { useState } from 'react';
import axios from 'axios';

const UjSzamla = () => {
  const [szamlaSorszam, setSzamlaSorszam] = useState('');
  const [kiallito, setKiallito] = useState('');
  const [vevo, setVevo] = useState('');
  const [kelt, setKelt] = useState('');
const [teljesites, setTeljesites] = useState('');
const [fizetesiHatarido, setFizetesiHatarido] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    const keltDate = new Date(kelt);
    const teljesitesDate = new Date(teljesites);
    const fizetesiHataridoDate = new Date(fizetesiHatarido);

    const keltIsoString = keltDate.toISOString().split("T")[0];
  const teljesitesIsoString = teljesitesDate.toISOString().split("T")[0];
  const fizetesiHataridoIsoString = fizetesiHataridoDate.toISOString().split("T")[0];

    const newSzamla = {
      szamlaSorszam,
    kiallito,
    vevo,
    kelt: keltIsoString,
      teljesites: teljesitesIsoString,
      fizetesiHatarido: fizetesiHataridoIsoString,
    };
    try {
      await axios.post('/api/szamlak', newSzamla);
      alert('Számla sikeresen létrehozva!');
      setSzamlaSorszam('');
      setKiallito('');
      setVevo('');
    } catch (error) {
      console.error('Error creating szamla:', error);
      alert('Hiba történt a számla létrehozása közben. Kérjük, próbálja újra.');
    }
  };

  return (
    <div>
      <h2>Új számla létrehozása</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Számla sorszám: </label>
          <input
            type="text"
            value={szamlaSorszam}
            onChange={(e) => setSzamlaSorszam(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Kiállító: </label>
          <input
            type="text"
            value={kiallito}
            onChange={(e) => setKiallito(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Vevő: </label>
          <input
            type="text"
            value={vevo}
            onChange={(e) => setVevo(e.target.value)}
            required
          />
        </div>
        <div>
        <label htmlFor="kelt">Kelt:</label>
        <input type="date" id="kelt" value={kelt} onChange={(e) => setKelt(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="teljesites">Teljesítés:</label>
        <input type="date" id="teljesites" value={teljesites} onChange={(e) => setTeljesites(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="fizetesiHatarido">Fizetési határidő:</label>
        <input type="date" id="fizetesiHatarido" value={fizetesiHatarido} onChange={(e) => setFizetesiHatarido(e.target.value)} required />
      </div>
        <button type="submit">Számla létrehozása</button>
      </form>
    </div>
  );
};

export default UjSzamla;
