import React from "react";
import { Link } from 'react-router-dom';
import styles from './Card.module.css'

const Card = ({ country }) => {
    return (
        <div className={styles.containerCard} >
            <img className={styles.flag} src={country.flag} alt={country.name} />
            <h2 className={styles.subtitleh2} >Country: {country.name} </h2>
            <h4 className={styles.subtitleh4} >Continent: {country.continent}</h4>
            <Link to={`/countries/${country.id}`}>
            <button className={styles.buttonDetail}>
            View more details
            </button>
            </Link>
        </div>
    )
}

export default Card;
