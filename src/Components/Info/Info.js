import React, {useEffect, useState} from 'react';
import './Info.css'
import axios from "axios";

const Info = ({country}) => {
    const [borders, setBorders] = useState([]);

    useEffect(() => {
        const borderNames = () => {
            const names = [];
            if (country.borders !== undefined) {
                const requests = [];
                country.borders.map((name) => {
                    try {
                        requests.push(axios.get(`https://restcountries.eu/rest/v2/alpha/${name}`))
                    } catch (e) {
                        console.log(e)
                    }
                })
                Promise.all(requests).then(function(values) {
                    const names = [];
                    for (let i = 0; i < values.length; i++) {
                        names.push(values[i].data.name)
                    }
                    setBorders(names)
                });
            }
        };
        borderNames()
    });

    return (
        <div className="info">
            <div>
                <div className="main-info">
                    <div className="text">
                        <h2>{country.name}</h2>
                        <p>Capital: <span className="result">{country.capital}</span></p>
                        <p>Population: <span className="result">{country.population}</span></p>
                        <p>Demonym: <span className="result">{country.demonym}</span></p>
                    </div>
                    <div className="flag">
                        <img className="flag-img" src={country.flag} alt='flag'/>
                    </div>
                </div>
                <div>
                    <h2>Border with:</h2>
                    {borders.map((name, index) => {
                        return <p key={index}>{name}</p>
                    })}
                </div>
            </div>
        </div>
    )
};

export default Info;