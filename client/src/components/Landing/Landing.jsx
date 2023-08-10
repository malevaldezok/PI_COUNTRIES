import React from "react";
import { Link } from 'react-router-dom';
import styles from './Landing.module.css'
import image from "../../../public/logolanding.png"

const Landing = () => {
    return (
        <div className={styles.containerLanding} >
            <div className={styles.container}>
                <div className={styles.flexContainer}>
                <div className={styles.logoContainer}>
                    <img src={image} className={styles.imageLanding} />
                    <Link to="/countries" className={styles.button}> Explore </Link>
                </div>
                </div>
            </div>
            <div className={styles.footer}>
                <p className={styles.footerText}>Proyecto individual | Malena Valdez | Henry 2023</p>
            </div>
        </div>
      
    )
}

export default Landing;