import React, { useEffect, useState } from "react";
import { NavLink, Link } from 'react-router-dom';
import { connect, useDispatch } from "react-redux";
import { getCountries, ordenAscAlphab, ordenDescAlphab, ordenAscPopulation, ordenDescPopulation, ordenContinent, getActivities } from "../../redux/actions/actions";
import SearchBar from "../SearchBar/SearchBar";
import styles from './NavBar.module.css'

const NavBar = ({getCountries, ordenAscAlphab, ordenDescAlphab, ordenAscPopulation, ordenDescPopulation, ordenContinent, getActivities}) => {
    const [sort, setOrder] = useState('');
    const[continent, setContinent] = useState('');
    const [activity, setActivity] = useState('');
    const dispatch = useDispatch()

    useEffect(()=> {
        if(continent) {
            getCountries();
            if(continent !== 'All') {
                setTimeout(()=> {
                    dispatch(ordenContinent(continent))
                }, 20);
            }
        }
    }, [continent])

    useEffect(()=> {
        if(sort === 'all') getCountries();
        else if(sort === 'a-z') ordenAscAlphab();
        else if(sort === 'z-a') ordenDescAlphab();
        else if(sort === 'asc') ordenAscPopulation();
        else if(sort === 'desc') ordenDescPopulation();
    }, [sort]);

    const activityHandler = event => {
        event.preventDefault();
        setActivity(event.target.value)
    };

    const searchActivityHandler = event => {
        event.preventDefault();
        getCountries();
        setTimeout(()=> {
            dispatch(getActivities(activity));
        }, 200);
        console.log(activity)
        setActivity('');
    }

    return (
        <div className={styles.containerNav}>
        <div className={styles.divh1}>
          <h1 className={styles.subtitleh1} >Welcome to the Country App 🌎</h1>
        </div>
        <hr className={styles.hr} />
        <div className={styles.barraNav}>
            <div className={styles.sortBy} >
                <p className={styles.p} >Sort by</p>
                <select className={styles.select} onChange={(event)=> setOrder(event.target.value)}>
                    <option value='all'>All countries</option>
                    <option value='a-z' >A-Z</option>
                    <option value='z-a' >Z-A</option>
                    <option value='asc' >More population</option>
                    <option value='desc' >Less population</option>
                </select>
            </div>

            <div className={styles.filter} >
                <p className={styles.p} >Filter by continent</p>
                <select className={styles.select} onChange={event => setContinent(event.target.value)}>
                    <option value='All'>All</option>
                    <option value='South America'>South America</option>
                    <option value='North America'>North America</option>
                    <option value='Europe'>Europe</option>
                    <option value='Asia'>Asia</option>
                    <option value='Africa'>Africa</option>
                    <option value='Oceania'>Oceania</option>
                    <option value='Antarctica'>Antarctica</option>
                </select>
            </div>

            <div className={styles.activities} >
            <Link to='/activities'>
                <button className={styles.button} >Activities</button>
            </Link>
            </div>

            <div className={styles.act} >
                <form>
                   <input className={styles.input} type="text" value={activity} onChange={activityHandler} placeholder="Search an activity" />
                    <button onClick={searchActivityHandler} className={styles.buttonSearch} >Search</button> 
                </form> 
            </div>
            <SearchBar />
            <Link to='/'><button className={styles.p} >Salir ❌ </button></Link>
            
        </div>
    </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        ordenAscAlphab: () => dispatch(ordenAscAlphab()),
        ordenDescAlphab: () => dispatch(ordenDescAlphab()),
        getCountries: () => dispatch(getCountries()),
        ordenAscPopulation: () => dispatch(ordenAscPopulation()),
        ordenDescPopulation: () => dispatch(ordenDescPopulation()),
        ordenContinent: (continent) => dispatch(ordenContinent(continent)),
        getActivities: () => dispatch(getActivities()),
    }
}

const mapStateToProps = (state) => {
    return {
        countries: state.countries,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
