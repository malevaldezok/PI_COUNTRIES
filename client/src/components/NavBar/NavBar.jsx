import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { connect, useDispatch, useSelector } from "react-redux";
import { getCountries, getName, ordenAscAlphab, ordenDescAlphab, ordenAscPopulation, ordenDescPopulation, ordenContinent, getActivities } from "../../redux/actions/actions";
import styles from './NavBar.module.css'
import image from "../../../public/logonav.png"

const NavBar = ({getCountries, ordenAscAlphab, ordenDescAlphab, ordenAscPopulation, ordenDescPopulation, ordenContinent, getActivities}) => {
    const [sort, setOrder] = useState('');
    const[continent, setContinent] = useState('');
    const [activity, setActivity] = useState('');
    const dispatch = useDispatch()

    const countries = useSelector(state => state.countries)
    const [input, setInput] = useState('');

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [orderByOpen, setOrderByOpen] = useState(false);
    const [filterByOpen, setFilterByOpen] = useState(false);

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };  

    const toggleOrderByDropdown = () => {
        setOrderByOpen(!orderByOpen);
    }

    const toggleFilterByDropdown = () => {
        setFilterByOpen(!filterByOpen);
    }

    const handleDropdownClick = (event) => {
        event.stopPropagation();
        setIsDropdownOpen((prevOpen) => !prevOpen);
      };
    
  
    const inputHandler = event => {
        setInput(event.target.value)
    }

    const calculateSimilarity = (str1, str2) => {
        const a = str1.toLowerCase();
        const b = str2.toLowerCase();

        const longer = a.length > b.length ? a : b;
        const shorter = a.length > b.length ? b : a;

        const longerLength = longer.length;

        if(longerLength === 0) {
            return 1.0;
        }
        return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
    }

    const editDistance = (s1, s2) => {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        let costs = new Array();
        for(let i = 0; i <= s1.length; i++) {
            let lastValue = i;
            for(let j = 0; j <= s2.length; j++) {
                if(i === 0) {
                    costs[j] = j;
                } else {
                    if(j > 0) {
                        let newValue = costs[j - 1];
                        if(s1.charAt(i - 1) !== s2.charAt(j - 1)) {
                            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                        }
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if( i > 0 ) {
                costs[s2.length] = lastValue;
            }
        }
        return costs[s2.length];
    } 

    const onClickHandler = () => {

        const exactMatch = countries.find(country => country.name.toLowerCase() === input.toLowerCase());
        if(exactMatch) {
            dispatch(getName(exactMatch.name));
        } else {
            const foundCountry = countries.find(country => calculateSimilarity(country.name, input) >= 0.6);
            if(foundCountry) {
                dispatch(getName(foundCountry.name));
        } else {
            window.alert('No se encontraron resultados.')
        }
    }
}

    const homeHandler = () => {
        dispatch(getCountries())
    }

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

    const handleOrderByClick = (orderType) => {
        if(orderType === 'a-z') {
            ordenAscAlphab();
        } else if (orderType === 'z-a') {
            ordenDescAlphab()
        } else if (orderType === 'asc') {
            ordenAscPopulation()
        } else if (orderType === 'desc') {
            ordenDescPopulation()
        }
    }

    const handleFilterByClick = (selectedContinent) => {
        setContinent(selectedContinent)
    }

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
        <nav className={styles.nav}>
            <div className={styles.flexContainer}>
                <a href="/"><img src={image} className={styles.imageNav} /></a>
                <div className={styles.inputContainer}>
                    <input className={styles.input} type="text" name="input" placeholder="Search a country" onChange={(e) => inputHandler(e)} />
                    <button className={styles.btnSearch} onClick={() => onClickHandler()}>
                        <span className={styles.inputGroupText}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={styles.svgIcon}>
                                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </button>
                </div>

                <div className={styles.dropdownIcon} onClick={handleDropdownClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" id="menu"><path fill-rule="evenodd" d="M18.9 17.009c0 .551-.518.991-1.097.991h-3.15a.98.98 0 0 1-1.003-.991v-3A.994.994 0 0 1 14.653 13h3.15c.58 0 1.097.458 1.097 1.009v3zM17.803 11h-3.15c-1.74 0-3.103 1.352-3.103 3.009v3c0 1.657 1.363 2.991 3.103 2.991h3.15C19.543 20 21 18.666 21 17.009v-3C21 12.352 19.543 11 17.803 11zM7.35 17.009c0 .551-.518.991-1.097.991h-3.15a.98.98 0 0 1-1.003-.991v-3A.994.994 0 0 1 3.103 13h3.15c.58 0 1.097.458 1.097 1.009v3zM6.253 11h-3.15C1.363 11 0 12.352 0 14.009v3C0 18.666 1.363 20 3.103 20h3.15c1.74 0 3.197-1.334 3.197-2.991v-3C9.45 12.352 7.993 11 6.253 11zM18.9 6.009c0 .551-.518.991-1.097.991h-3.15a.98.98 0 0 1-1.003-.991v-3A.994.994 0 0 1 14.653 2h3.15c.58 0 1.097.458 1.097 1.009v3zM17.803 0h-3.15c-1.74 0-3.103 1.352-3.103 3.009v3C11.55 7.666 12.913 9 14.653 9h3.15C19.543 9 21 7.666 21 6.009v-3C21 1.352 19.543 0 17.803 0zM7.35 6.009c0 .551-.518.991-1.097.991h-3.15A.98.98 0 0 1 2.1 6.009v-3A.994.994 0 0 1 3.103 2h3.15c.58 0 1.097.458 1.097 1.009v3zM6.253 0h-3.15C1.363 0 0 1.352 0 3.009v3C0 7.666 1.363 9 3.103 9h3.15C7.993 9 9.45 7.666 9.45 6.009v-3C9.45 1.352 7.993 0 6.253 0z"></path></svg>
                </div>
                <div className={`${styles.dropdown} ${isDropdownOpen ? styles.open : ''}`}
                    onClick={(e) => {
                    if (!isDropdownOpen) {
                    return;
                    }
                    setIsDropdownOpen(false);
                    e.stopPropagation();
                    }} >
                    <ul className={styles.dropdownList}>
                        <li className={styles.dropdownItem} onClick={toggleOrderByDropdown}>
                        Order by
                            <ul className={`${styles.dropdownSublist} ${orderByOpen ? styles.open : ''}`} >
                                <li value='a-z' className={styles.dropdownItem} onClick={() => handleOrderByClick('a-z')}>A-Z</li>
                                <li value='z-a' className={styles.dropdownItem} onClick={() => handleOrderByClick('z-a')}>Z-A</li>
                                <li value='asc' className={styles.dropdownItem} onClick={() => handleOrderByClick('asc')}>More population</li>
                                <li value='desc' className={styles.dropdownItem} onClick={() => handleOrderByClick('desc')}>Less population</li>
                            </ul>
                        </li>
                        <li className={styles.dropdownItem} onClick={toggleFilterByDropdown}>
                        Filter by
                            <ul className={`${styles.dropdownSublist} ${filterByOpen ? styles.open : ''}`} >
                                <li value='Asia' className={styles.dropdownItem} onClick={() => handleFilterByClick('Asia')}>Asia</li>
                                <li value='Europe' className={styles.dropdownItem} onClick={() => handleFilterByClick('Europe')}>Europe</li>
                                <li value='Africa' className={styles.dropdownItem} onClick={() => handleFilterByClick('Africa')}>Africa</li>
                                <li value='North America' className={styles.dropdownItem} onClick={() => handleFilterByClick('North America')}>North America</li>
                                <li value='South America' className={styles.dropdownItem} onClick={() => handleFilterByClick('South America')}>South America</li>
                                <li value='Oceania' className={styles.dropdownItem} onClick={() => handleFilterByClick('Oceania')}>Oceania</li>
                                <li value='Antarctica' className={styles.dropdownItem} onClick={() => handleFilterByClick('Antarctica')}>Antarctica</li>
                            </ul>
                        </li>
                        <li className={styles.dropdownItem}><Link to={'/activities'} className={styles.link}>Activities</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
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
{/*<div className={styles.containerNav}>
        <div className={styles.divh1}>
          <h1 className={styles.subtitleh1} > CountryExplorer 🌎</h1>
        </div>
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
    </div>*/}