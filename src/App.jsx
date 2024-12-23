import React, { useState, useEffect } from 'react';
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [pays, setPays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = 'https://restcountries.com/v3.1/all';

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Problème de récupération des données');
        }
        return response.json();
      })
      .then((data) => {
        setPays(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center">Chargement...</div>;
  }

  if (error) {
    return <div className="text-center">Erreur: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Liste des pays</h1>
      <div className="row">
        {pays.map((paysItem, index) => (
          <div className="col-md-4" key={index}>
            <div className="card mb-4">
              {paysItem.flags && paysItem.flags.svg && (
                <img
                  src={paysItem.flags.svg}
                  alt={`${paysItem.name.common} flag`}
                  className="card-img-top"
                  style={{ height: '150px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{paysItem.name.common}</h5>
                <p className="card-text">Population: {paysItem.population}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
