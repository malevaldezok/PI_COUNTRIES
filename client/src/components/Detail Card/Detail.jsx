import React, { useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail, getCountryActivities } from "../../redux/actions/actions";
import styles from './Detail.module.css'

const Detail = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const countryDetail = useSelector(state => state.countryDetail);
    console.log(countryDetail)
    const activities = useSelector(state=> state.countryDetail.Activities);

    useEffect(() => {
        dispatch(getDetail(id))
        dispatch(getCountryActivities(id))
    }, [dispatch, id])

    if(!countryDetail) {
        return <div>Loading...</div>
    }
    return (
        <div className={styles.containerDetail} >
        <Link to='/countries'>
        <button className={styles.btnback} > Back to home 🏠︎  </button>
        </Link>
        <div className={styles.cardDetail} >
            <h1 className={styles.subtitleh1} > {countryDetail.name} </h1>
            <h4 className={styles.subtitleid} > {countryDetail.id} </h4>
            <img className={styles.flag} src={countryDetail.flag} alt={countryDetail.name} />
            <h4 className={styles.subtitleh4}>  🌎 Continent: {countryDetail.continent} </h4>
            <h4 className={styles.subtitleh4}>Subregion: {countryDetail.subregion} </h4>
            <h4 className={styles.subtitleh4}>Capital: {countryDetail.capital} </h4>
            <h4 className={styles.subtitleh4}>Area: {countryDetail.area} </h4>
            <h4 className={styles.subtitleh4}>Population: {countryDetail.population} </h4>
        </div>
        <div>
        <hr className={styles.hr} />

        </div>
            <h2 className={styles.subtitleh2} > Activities for this country: </h2>
            <ul className={styles.ul} >
                {activities?.length > 0 ? activities?.map((det, index) => {
                    return (
                        <div className={styles.containerCard} >
                            <div className={styles.cardActivity} key={index}  >
                            <p className={styles.pAct}>Name: {det.name}</p>
                            <p className={styles.pAct}>Difficulty: {det.difficulty}</p>
                            <p className={styles.pAct}>Duration(hours): {det.duration}</p>
                            <p className={styles.pAct}>Season: {det.season}</p>
                            <hr />
{        console.log(countryDetail, 'here is your country')
}                        </div> 
                        </div>
                       
                    )
                })
                : <div className={styles.textAlter}  >
                <p className={styles.p} >Country without activities</p>
                <Link to='/activities'><button className={styles.btnTextAlter}>Create one!</button></Link>
                </div>
                
            }
            </ul>
        </div>
    )
} 

export default Detail;
    {/*const { id } = useParams();
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(getDetail(id))
    }, [id, dispatch]);
    
    const countryDetail = useSelector(state => state.countryDetail);
    
    const activities = countryDetail.Activities || []
    
    
    
    {/*const activities = countryDetail.Activities?.map( (details) => {
        return {
            name: details.name,
            difficulty: details.difficulty,
            duration: details.duration,
            season: details.season,
        }
    })*/}
    
    {/*console.log(countryDetail.Activities)
    
    return(
        <div className="container-detail" >
        <Link className="link-home" to='/countries'>
            <button className="button-home">Back to home</button>
        </Link>
        <h1 className="subtitle-h1" > {countryDetail.name} </h1>
        <h3 className="subtitle-h3" > {countryDetail.id} </h3>
        <img  className="img-detail" src={countryDetail.flag} />
        <h4 className="subtitle-h4" >Continent: {countryDetail.continent} </h4>
        <h4 className="subtitle-h4">Subregion: {countryDetail.subregion} </h4>
        <h4 className="subtitle-h4">Capital: {countryDetail.capital} </h4>
        <h4 className="subtitle-h4">Area: {countryDetail.area} </h4>
        <h4 className="subtitle-h4">Population: {countryDetail.population} </h4>

        <div className="container-activity">
            <h3 className="subtitle-h3" >Activities</h3>
            {
                activities?.length > 0 ? activities?.map((det, index) => {
                    return (
                        <div className="" key={index}  >
                            <p>Name: {det.name}</p>
                            <p>Difficulty: {det.difficulty}</p>
                            <p>Duration(hours): {det.duration}</p>
                            <p>Season: {det.season}</p>
                            <hr />
{        console.log(countryDetail, 'here is your country')
}                        </div>
                    )
                })
                : <p>Country without activities</p>
            }
        </div>
    </div>
)
}

export default Detail;*/}

    

{/*const { id } = useParams();
const [country, setCountry] = useState([]);

useEffect(()=> {
    axios.get(`http://localhost:3001/countries/${id}`)
    .then(response => {
        setCountry(response.data);
    })
    .catch(error => {
        console.error('Error getting country details', error);
    });
}, [id]);

if(!country) {
    return <div>Loading...</div>
}

    return (
        <div>
            <h1>{country.name}</h1>
            <img src={country.flag} alt={country.name} />
            <h5> Continent: {country.continent} </h5>
            <h5> Capital: {country.capital} </h5>
            <h5> Subregion: {country.subregion} </h5>
            <h5> Area: {country.area} </h5>
            <h5> Population: {country.population} </h5>
            <Link to={'/countries'} >
            <button>Back to home</button>
            </Link>
        </div>
    )
}

export default Detail;*/}