import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities } from "../../redux/actions/actions";
import styles from './ActivityList.module.css'

const ActivityList = ({activities}) => {
    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries)    
    useEffect(() => {
        dispatch(getActivities())
    }, [dispatch])

    return (<div className={styles.containergral}>
         <h2 className={styles.subtitleh2} >Activities list</h2>
         <hr className={styles.hr} />
        <div className={styles.containerActivityList}>

            { activities && activities?.map(activity => (
                <div className={styles.cardAct} key={activity.id}>
                    <h3 className={styles.subtitleh3} > {activity.name} </h3>
                    <hr className={styles.hrAct} />
                    <p className={styles.p}>Difficulty: {activity.difficulty} </p>
                    <p className={styles.p}>Duration: {activity.duration} </p>
                    <p className={styles.p}>Season: {activity.season} </p>
                    <p className={styles.p}>Countries:</p>
                    <ul>
                    <div className={styles.cardsAct}>
                        {activity.Countries && activity.Countries.map(country => {
                            const selectedCountry = countries.find(c => c.id === country.id)
                                return (
                                    <li className={styles.li} key={country.id} > {selectedCountry && selectedCountry.name} </li>
                                )
                        })}
                    </div>
                    </ul>
                </div>
                )
            )}
        </div>
    </div>
    )
           
}

export default ActivityList;