//actions para cargar los países desde el backend

import axios from 'axios';
export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_DETAIL = 'GET_DETAIL';
export const GET_NAME_SUCCESS = 'GET_NAME';
export const ORDEN_ASC_ALPHAB = 'ORDEN_ASC_ALPHAB';
export const ORDEN_DESC_ALPHAB = 'ORDEN_DESC_ALPHAB';
export const ORDEN_ASC_POPULATION = 'ORDEN_ASC_POPULATION';
export const ORDEN_DESC_POPULATION = 'ORDEN_DESC_POPULATION';
export const ORDEN_CONTINENT = 'ORDEN_CONTINENT';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const COUNTRY_NAME = 'COUNTRY_NAME';
export const COUNTRY_DETAIL_XACTIVITY = 'COUNTRY_DETAIL_XACTIVITY';
export const GET_COUNTRY_DETAIL_XACTIVITY_SUCCESS = 'GET_COUNTRY_DETAIL_SUCCESS';
export const GET_COUNTRY_DETAIL_XACTIVITY_FAILURE = 'GET_COUNTRY_DETAIL_FAILURE'
export const GET_COUNTRY_ACTIVITIES_REQUEST = 'GET_COUNTRY_ACTIVITIES_REQUEST'
export const GET_COUNTRY_ACTIVITIES_SUCCESS = 'GET_COUNTRY_ACTIVITIES_SUCCESS'
export const GET_COUNTRY_ACTIVITIES_FAILURE = 'GET_COUNTRY_ACTIVITIES_FAILURE'
export const ADD_ACTIVITY_TO_COUNTRY = 'ADD_ACTIVITY_TO_COUNTRY'

export const getCountries = () => {
    return async (dispatch) => {
        const response = await axios.get('http://localhost:3001/countries');
        dispatch({ type: GET_COUNTRIES, payload: response.data})
    }
}

export const getDetail = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`http://localhost:3001/countries/${id}`);
        dispatch({ type: GET_DETAIL, payload: response.data })
    }
}

{/*export const getCountryDetail = id => {
    return async dispatch => {
        try {
            dispatch({ type: GET_COUNTRY_DETAIL_REQUEST });
            const response = await axios.get(`http://localhost:3001/countries/${id}`)
            console.log(response.data)
            dispatch({ type: GET_COUNTRY_DETAIL_SUCCESS, payload: response.data })
        } catch (error) {
            dispatch({ type: GET_COUNTRY_DETAIL_FAILURE, payload: error.message })
        }
    }
}*/}

export const getCountryActivities = id => {
    return async dispatch => {
        dispatch({ type: GET_COUNTRY_ACTIVITIES_REQUEST });
        try {
            const response = await axios.get(`http://localhost:3001/activities/${id}`);
            dispatch({ type: GET_COUNTRY_ACTIVITIES_SUCCESS, payload: response.data })
        } catch (error) {
            dispatch({ type: GET_COUNTRY_ACTIVITIES_FAILURE, payload: error.message })            
        }
    }
}


export const getName = (name) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/countries?name=${name}`)
            dispatch({ type: GET_NAME_SUCCESS, payload: response.data})
        } catch (error) {
            console.log(error)
        }
    } 
}

export const ordenAscAlphab = () => {
    return { type: ORDEN_ASC_ALPHAB }
}

export const ordenDescAlphab = () => {
    return { type: ORDEN_DESC_ALPHAB }
}

export const ordenAscPopulation = () => {
    return { type: ORDEN_ASC_POPULATION }
}

export const ordenDescPopulation = () => {
    return { type: ORDEN_DESC_POPULATION }
}

export const ordenContinent = (payload) => {
    return { type: ORDEN_CONTINENT, payload}
}

export const getActivities = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3001/activities')
            const activities = response.data;
            console.log('Activities action :', activities);
            dispatch({ type: GET_ACTIVITIES, payload: activities })
        } catch (error) {
            console.log(error)
        }
    }
}


{/*export const createActivity = (activity) => {
   return {
    type: ADD_ACTIVITY, payload: activity
   }
}*/}

export const addActivityToCountry = (countryId, activity) => {
    return { type: ADD_ACTIVITY_TO_COUNTRY, payload: {countryId, activity}}};

export const createActivity = activity => {
    return async dispatch => {
        try {
            dispatch({ type: 'CREATE_ACTIVITY_REQUEST'});
            const response = await axios.post('http://localhost:3001/activities', activity);
            const createdActivity = response.data;

            const {countryIds} = activity;
            countryIds.forEach(countryId => {
                dispatch(countryDetailXActivity(countryId))
                dispatch(addActivityToCountry(countryId, createdActivity))
            }) 
            dispatch({ type: 'CREATE_ACTIVITY_SUCCESS', payload: createdActivity})
        } catch (error) {
            dispatch({ type: 'CREATE_ACTIVITY_FAILURE', payload: error.message})
        }
    }
}

export const countryDetailXActivity = id => {
    return async (dispatch) => {
        if(!id) {
            dispatch({ type: GET_COUNTRY_DETAIL_XACTIVITY_FAILURE, payload: 'Invalid country ID' });
            return;
        }
        dispatch({ type: GET_COUNTRY_DETAIL_REQUEST })
        try {
            const response = await axios.get(`http://localhost:3001/countries/${id}`);
            const Activities = response.data.activities || []
            dispatch({ type: GET_COUNTRY_DETAIL_XACTIVITY_SUCCESS, payload: Activities })
        } catch (error) {
            dispatch({ type: GET_COUNTRY_DETAIL_XACTIVITY_FAILURE, payload: error.message })
        }
    }
}


{/*export const FETCH_COUNTRIES_SUCCESS = 'FETCH_COUNTRIES_SUCCESS'
export const SET_SEARCH_FILTER = 'SET_SEARCH_FILTER'

export const fetchCountriesSuccess = countries => ({
    type: FETCH_COUNTRIES_SUCCESS, payload: countries,
})

//despacha una acction para almacenar los paises en el store
export const fetchCountries = () => {
    return (dispatch) => {
        axios.get('http://localhost:3001/countries')
        .then(response => {
            const countries = response.data;
            if(Array.isArray(countries) && countries.every(item => typeof item === 'object')) {
                dispatch(fetchCountriesSuccess(countries))
            } else {
                console.error('La respuesta de la api no es un array de obj')
            }
        })
        .catch(error => {
            console.error('Error al obtener los países', error)
        })
    }
}

export const setSearchFilter = search => {
    return { type: SET_SEARCH_FILTER, payload: search }
}*/}