import Info from "./Components/Info/Info";
import Countries from "./Components/Countries/Countries";
import React, {useEffect, useState} from "react";
import axios from "axios";
import './App.css';

function App() {
    const [countries, setCountries] = useState([]);
    const [currentCountry, setCurrentCountry] = useState();

    useEffect(() => {
        try {
            axios.get('https://restcountries.eu/rest/v2/all?fields=name;alpha3Code').then((resp) => {
                const allCountries = resp.data;
                setCountries(allCountries);
            });
        } catch (e) {
            console.log(e)
        }
    }, []);

    const getInfo = (name) => {
        try {
            axios.get(`https://restcountries.eu/rest/v2/name/${name}`).then((resp) => {
                const country = resp.data[0];
                setCurrentCountry(country);
            });
        } catch (e) {
            console.log(e)
        }
    };

    const initialText = () => {
        if (currentCountry) {
            return <Info country={currentCountry}/>
        } else {
            return <h1 className="info">choose a country</h1>
        }
    };

    return (
        <div className="container">
            <Countries getInfo={getInfo} countries={countries}/>
            {initialText()}
        </div>
    );
}

export default App;
