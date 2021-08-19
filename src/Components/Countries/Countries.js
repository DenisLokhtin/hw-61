import React from 'react';
import './Countries.css'

const Countries = ({countries, getInfo}) => (
    <div className="countries">
        {countries.map((countries, index) => {
             return <div onClick={() => getInfo(countries.name)} className="list-country" key={index}>{countries.name}</div>
        })}
    </div>
);

export default Countries;