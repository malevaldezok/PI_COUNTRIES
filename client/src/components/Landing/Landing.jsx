import React from "react";
import { NavLink } from 'react-router-dom';
import styles from './Landing.module.css'

const Landing = () => {
    return (
        <div className={styles.containerLanding} >
            <div className={styles.containerh1}>
                <h1 className={styles.subtitleh1}>Do you want to know <br/> a little more about the world? </h1>
                <h3 className={styles.subtitleh3}>Individual proyect Henry</h3>
            </div>
            <div className={styles.containerLink}>
            <NavLink to='/countries' style={({isActive}) => ({color: isActive ? '#FBAF00' : 'black'})} >
                <h2 className={styles.subtitleh2} >Explore ➔ </h2>
            </NavLink>
            </div>
        </div>
      
    )
}

export default Landing;