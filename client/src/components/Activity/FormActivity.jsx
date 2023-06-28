import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, createActivity, countryDetailXActivity } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import ActivityList from "./ActivityList";
import { validateName, validateDifficulty, validateDuration, validateSeason, validateCountries } from "./FormValidate";
import styles from './FormActivity.module.css'

const FormActivity = () => {

    const [errors, setErrors] = useState({})

    const countries = useSelector(state => state.countries);
    const activities = useSelector(state => state.activities);
    console.log('Activities form: ', activities)
    const dispatch = useDispatch();

    const [selectedCountryIds, setSelectedCountryIds] = useState([])
    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [duration, setDuration] = useState('');
    const [season, setSeason] = useState('');
    const [difficultyError, setDifficultyError] = useState(false)
    const [durationError, setDurationError] = useState(false)
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [selectedCountryNames, setSeletedCountryNames] = useState([]);
    
    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])

    const handleChange = (event, setter, validator) => {
        const value = event.target.value;
        const error = validator(value);
        setter(value)
        return error;
    }

    const handleNameChange = event => {
        const error = handleChange(event, setName, validateName)
        setErrors( prevErrors => ({...prevErrors, name: error}))
    }

    const handleDifficultyChange = event => {
        const error = handleChange(event, setDifficulty, validateDifficulty)
        setDifficultyError(!!error);
        setErrors(prevErrors => ({...prevErrors, difficulty: error}))
    }

    const handleDurationChange = event => {
        const error = handleChange(event, setDuration, validateDuration)
        setDurationError(!!error)
        setErrors(prevErrors => ({...prevErrors, duration: error}))
    }

    const handleSeasonChange = event => {
        const error = handleChange(event, setSeason, validateSeason)
        setErrors(prevErrors => ({...prevErrors, season: error}))
    }

    const handleCountriesChange = event => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        console.log(selectedOptions)
        const error = validateCountries(selectedOptions)

        //filtrar los paises ya seleccionados modificado!
        const newSelectedOptions = selectedOptions.filter(option => !selectedCountryIds.includes(option))

        setSelectedCountries(prevSelectedCountries => [...prevSelectedCountries, ...newSelectedOptions])
        const updatedCoutryIds = [...selectedCountryIds, ...newSelectedOptions];
        setSelectedCountryIds(updatedCoutryIds);

        const countryNames = newSelectedOptions.map(option=> {
            const country = countries.find(country => country.id === option)
            return country ? country.name : ''
        })
        setSeletedCountryNames(prevCountryNames => [...prevCountryNames, ...countryNames])
        setErrors(prevErrors=> ({...prevErrors, countries: error }));
    }

        {/*setSelectedCountryIds(prevSelectedCountryIds => [...prevSelectedCountryIds, selectedOptions])
        setSeletedCountryNames(selectedOptions.map(option => {
            const country = countries.find(country => country.id === option);
            const countriesFiltered = selectedOptions.filter(country => country.id !== selectedCountries) 
            return country ? country.name : ''
        }))
        setErrors(prevErrors => ({...prevErrors, countries: error}))
    } */}
    
    const handleSubmit = event => {
        event.preventDefault()

        const nameError = validateName(name)

        const difficultyValue = parseInt(difficulty, 10)
        const difficultyError = validateDifficulty(difficultyValue)

        const durationValue = parseInt(duration, 10)
        const durationError = validateDuration(durationValue)

        const seasonError = validateSeason(season)
        const countriesError = validateCountries(selectedCountries)

        if(nameError || difficultyError || durationError || seasonError || countriesError) {
            setErrors({
                name: nameError,
                difficulty: difficultyError,
                duration: durationError,
                season: seasonError,
                countries: countriesError
            });
            return;
        }

        const activity = {
            name, 
            difficulty,
            duration,
            season,
            countryIds: selectedCountries,
        };
        console.log(activity.countryIds)
        dispatch(createActivity(activity));
        
        selectedCountries.forEach(option => {
            dispatch(countryDetailXActivity(option))
        })
        setName('');
        setDifficulty('');
        setDuration('');
        setSeason('');
        setSelectedCountries([]);
        setSeletedCountryNames([]);

        setErrors({})

        window.alert('Activity created!')
    }

 return (
    <div className={styles.containerForm} >
    <Link to='/countries'>
    <button className={styles.btnback}>
    Back to home 🏠︎

    </button>
    </Link>
        <h2 className={styles.subtitleh2} > Create activity! </h2>
        <form className={styles.cardForm} onSubmit={handleSubmit} >
            
            <label className={styles.labelForm}>Name: </label> 
            <input className={styles.inputForm}  type="text" value={name} onChange={handleNameChange} />
            {errors.name && <p className={styles.errorForm}> {errors.name} </p>}

            <label className={styles.labelForm}>Difficulty: </label>
            <input className={styles.inputForm}  type="number" value={difficulty} onChange={handleDifficultyChange} />
            {errors.difficulty && (<p className={styles.errorForm}> {errors.difficulty} </p>)}


            <label className={styles.labelForm}>Duration (in hours): </label>
            <input className={styles.inputForm} type="number" value={duration} onChange={handleDurationChange}/>
            {errors.duration && (<p className={styles.errorForm}>{errors.duration}</p>)}

            <label className={styles.labelForm}>Season: </label>
            <select className={styles.select} value={season} onChange={handleSeasonChange} >
                <option value=''>Select a season</option>
                <option value='Summer'>Summer</option>
                <option value='Autumn'>Autumn</option>
                <option value='Winter'>Winter</option>
                <option value='Spring'>Spring</option>
            </select>
            {errors.season && <p className={styles.errorForm}>{errors.season}</p>}

            <label className={styles.labelForm}>Countries:</label>
            <select className={styles.select} multiple value={selectedCountries} onChange={handleCountriesChange} >
                <option value=''>Select countries</option>
                { countries && countries.map(country => (
                       <option key={country.id} value={country.id}>
                        {country.name}
                    </option>
                ))} 
                    
            </select>
            {errors.countries && <p className={styles.errorForm}>{errors.countries}</p>}

            <div className={styles.countrySelected} >
                <h3 className={styles.subtitleh3} >Selected countries:</h3>
                { selectedCountries.length > 0 && (
                <ul className={styles.ul} >
                    { selectedCountries.map((countryId) => {
                        const country = countries.find(country => country.id === countryId);
                        return country && (
                            <li className={styles.li} key={country.id}> {country.name} </li>
                )
                        
                    })}
                </ul>
                )}
            </div>

            <button className={styles.btnSubmit} type="submit">Create activity</button>
        </form>
        <ActivityList activities={activities} />
    </div>
)}
 
export default FormActivity;


   