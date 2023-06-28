import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getName } from "../../redux/actions/actions";
import styles from './SearchBar.module.css'

const SearchBar = ({}) => {
    const countries = useSelector(state => state.countries)
    const [input, setInput] = useState('');
    const dispatch= useDispatch();

    const inputHandler = event => {
        setInput(event.target.value)
    }

    const onClickHandler = () => {
        const countryExists = countries.some(country => country.name.toLowerCase() === input.toLowerCase());
        if(countryExists) {
            dispatch(getName(input));
        } else {
            window.alert('No se encontraron resultados')
        }
    }

    const homeHandler = () => {
        dispatch(getCountries())
    }

    return (
        <div className={styles.divSearchBar} >
            <input className={styles.input} type="text" name="input" placeholder="Search a country"onChange={(e) => inputHandler(e)} />
                <button className={styles.btn} onClick={() => onClickHandler()}>Search</button>
        </div>
    )
}

export default SearchBar;