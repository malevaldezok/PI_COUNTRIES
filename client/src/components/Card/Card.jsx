import React from "react";
import { Link } from 'react-router-dom';
import styles from './Card.module.css'

const Card = ({ country }) => {
    return (
        <div className={styles.containerCard}>
           <img className={styles.imageCard} src={country.flag} alt={country.name} />
           <div className={styles.text}>
            <h5 className={styles.h5}>{country.name}</h5>
            <p className={styles.p}> {country.continent} </p>
           </div>
           <div className={styles.containerButton}>
           <Link to={`/countries/${country.id}`}>
                <button className={styles.button}> View more details
                <svg className={styles.svg} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
                </button>
            </Link>
            </div>
        </div>
    )
}

export default Card;
 {/*<img className={styles.flag} src={country.flag} alt={country.name} />
            <h2 className={styles.subtitleh2} >Country: {country.name} </h2>
            <h4 className={styles.subtitleh4} >Continent: {country.continent}</h4>
            <Link to={`/countries/${country.id}`}>
            <button className={styles.buttonDetail}>
            View more details
            </button>
            </Link>*/}