import React, {useEffect, useState} from 'react';
import './Info.css'
import axios from "axios";

const Info = ({country}) => {
    const [borders, setBorders] = useState([]);

    useEffect( () => {
       const borderNames = async () => {
           const names = [];
           for (let i = 0; i < country.borders.length; i++) {
               if (country.borders > 0) {
                   try {
                       const data = await axios.get(`https://restcountries.eu/rest/v2/alpha/${country.borders[i]}`);
                       names.push(data[0].name);
                   } catch (e) {
                       console.log(e)
                   }
               }
           }
           setBorders(names)
       };
    });

    console.log(borders);

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
                    {borders.map((name) => {
                        return <p>{name}</p>
                    })}
                </div>
            </div>
        </div>
    )
};

export default Info;