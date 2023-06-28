import { GET_COUNTRIES, GET_DETAIL, ADD_ACTIVITY_TO_COUNTRY, GET_COUNTRY_ACTIVITIES_REQUEST, GET_COUNTRY_ACTIVITIES_SUCCESS, GET_COUNTRY_ACTIVITIES_FAILURE, GET_NAME_SUCCESS, ORDEN_ASC_ALPHAB, ORDEN_DESC_ALPHAB, ORDEN_ASC_POPULATION, ORDEN_DESC_POPULATION, ORDEN_CONTINENT, GET_ACTIVITIES, ADD_ACTIVITY, COUNTRY_NAME, GET_COUNTRY_DETAIL_XACTIVITY_SUCCESS } from "../actions/actions";
import { ordenAlphab, ordenPopulation } from "../../components/Orders/orders";

const initialState = {
    countries: [],
    activities: [],
    countryDetail: [],
    isLoading: false,
    error: null,
    countryName: '',
    selectedCountries: [],
};


const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_COUNTRIES: {
            return {
                ...state,
                countries: action.payload,
            }
        }
        case GET_DETAIL: {
            return {
                ...state,
                countryDetail: action.payload,
            }
        }
        case GET_NAME_SUCCESS: {
            return {
                ...state,
                countries: action.payload,
            }
        }
        case ORDEN_ASC_ALPHAB: {
            return {
                ...state,
                countries: state.countries.slice().sort(ordenAlphab)
            }
        }
        case ORDEN_DESC_ALPHAB: {
            return {
                ...state,
                countries: state.countries.slice().sort(ordenAlphab).reverse()
            }
        }
        case ORDEN_ASC_POPULATION: {
            return {
                ...state,
                countries: state.countries.slice().sort(ordenPopulation)
            }
        }
        case ORDEN_DESC_POPULATION: {
            return {
                ...state,
                countries: state.countries.slice().sort(ordenPopulation).reverse()
            }
        }
        case ORDEN_CONTINENT: {
            return {
                ...state,
                countries: state.countries.filter(country => country.continent === action.payload)
            }
        }
        case GET_ACTIVITIES: {
            return {
                ...state,
                activities: action.payload,
            }
        }
        case ADD_ACTIVITY: {
            return {
                ...state,
                activities: [...state.activities, action.payload],
            }
        }
        {/*case DELETE_ACTIVITY: {
            const activityId = action.payload;
            return {
                ...state,
                activities: state.activities.filter(act => act.id !== activityId)
            }}
        */}
        case COUNTRY_NAME:{
            return {
                ...state, 
                countryName: action.payload
            }
        }
        case GET_COUNTRY_DETAIL_XACTIVITY_SUCCESS: {
            const { id, name } = action.payload;
            console.log(state.activities);
            const activities = Array.isArray(state.activities) ? state.activities : []
            const updateCountryDetail = {
                ...state.countryDetail,
                Activities: activities
                .filter(activity=> activity.countryIds.includes(id))
                .map(activity => ({
                    id: activity.countryIds,
                    name: activity.name,
                    difficulty: activity.difficulty,
                    duration: activity.duration,
                    season: activity.season,
                })),
            }
            console.log(updateCountryDetail);
            return {
                ...state,
                countryDetail: {
                    ...updateCountryDetail,
                }
            }
        }
        case GET_COUNTRY_ACTIVITIES_REQUEST:
            return { 
                ...state, 
                isLoading: true,
                error: null 
            };
        case GET_COUNTRY_ACTIVITIES_SUCCESS:
            return { 
                ...state, 
                activities: action.payload, 
                isLoading: false 
            };
        case GET_COUNTRY_ACTIVITIES_FAILURE:
            return { 
                ...state, 
                isLoading: false, 
                error: action.payload 
            };
            case ADD_ACTIVITY_TO_COUNTRY:
                const { countryId, activity } = action.payload;
                const updatedCountries = state.countries.map(country => {
                    if(country.id === countryId) {
                        return {
                            ...country,
                            activities: [...country.activities, activity]
                        }
                    }
                    return country;
                })
                // Si no se encontró el país, retorna el estado actual sin cambios
                return {
                    ...state,
                    countries: updatedCountries,
                }
        default:
            return { ...state }
    }
}

export default rootReducer;

{/*import { FETCH_COUNTRIES_SUCCESS, SET_SEARCH_FILTER } from "../actions/actions";

//se maneja la acción para almacenar los países en el estado

const initialState = {
    countries: [],
    filteredCountries: [],
    filteredContinent: '',
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_COUNTRIES_SUCCESS:
            return  {
                ...state,
                countries: action.payload,
                filteredCountries: action.payload,
            };
        case SET_SEARCH_FILTER:
            const filtered = state.countries.filter(country => {
                return country.name.toLowerCase().includes(action.payload.toLowerCase())
            })
            return {
                ...state,
                filteredCountries: filtered,
                filteredContinent: '',
                currentPage: 1
            }
        default:
            return { ... state };
    }
}

export default rootReducer;*/}