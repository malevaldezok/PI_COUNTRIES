import React, { useEffect } from 'react';
import { getCountries } from '../../redux/actions/actions';
import { useDispatch } from 'react-redux';
import NavBar from '../NavBar/NavBar'
import CountryList from '../CountryList/CountryList';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { useSelector } from 'react-redux';
//comp country y  nav

const Home = () => {

    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries)

    useEffect(()=> {
        dispatch(getCountries());{}
    }, [dispatch])

    return (
        <div className={styles.container} >
           <div className={styles.containerHome}>
            <NavBar />
            <div className={styles.containerCountries} >
                <CountryList />
            </div>
        </div> 
        </div>
        
    )
}

export default Home;

{/*<NavBar handleSearch={handleSearch} />
<select onChange={e => handleContinentFilter(e.target.value)} >
<option>Filter by continent</option>
<option value='North America'>North America</option>
<option value='Asia'>Asia</option>
<option value='Africa'>Africa</option>
<option value='South America'>South America</option>
<option value='Antarctica'>Antarctica</option>
<option value='Europe'>Europe</option>
        <option value='Oceania'>Oceania</option>
    </select>
    
    <select onChange={e => handleActivityFilter(e.target.value)} >
        <option>Filter activity</option>
    </select>
    
    {
        selectedActivity && <p>Activities filtered by: {selectedActivity}</p>
    }
    
    {/* botones de orden }
    <select onChange={e => handleSortTypeChange(e.target.value)} >
    <option value=''>Order By</option>
    <option value='name'>Name</option>
    <option value='population'>Population</option>
    </select>
    
    {/* mostrar el btn de asc y desc solo cuando se selecciona un tipo de orden }
    {
        showSortButton && ( <button onClick={handleSortDirectionChange} >
            { sortType === 'name' ? (nameSortDirection === 'asc' ? 'Asc' : 'Desc') : (popSort === 'asc' ? 'Asc' : 'Desc')}
        </button>)
    }
    
    
    { //texto que muestra el continente filtrado
       filteredContinent && (<p>Countries filtered by continent: {filteredContinent}</p>)
    }
    
    <CountryList countries={filteredCountries} sortType={sortType} nameSortDirection={nameSortDirection} popSort={popSort} countriesToShow={countriesToShow} totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    ///////////////////////////////////
    {/* button prev }
    {
        !isSearching && <button className={currentPage === 1 ? 'active-page' : ''} onClick={handlePrevPage} disabled={currentPage === 1}> Prev </button>
    }
    {/* botones de paginado }

    {
        !isSearching && Array.from({ length: totalPages}, (_, index) => index + 1).map(pageNumber => {
            return <button key={pageNumber} className={pageNumber === currentPage ? 'active-page' : ''} onClick={() => handlePageChange(pageNumber)} disabled={pageNumber === currentPage} > {pageNumber} </button>
        } )
    }

    {/* button next }
    {
        !isSearching && <button  className={currentPage === totalPages ? 'active-page' : ''} onClick={handleNextPage} disabled={currentPage === totalPages}> Next </button>
    }*/}
////////////////////////////

    {/*//estado local para los países en home
    const [countries, setCountries] = useState([]);
    //filteredCountries se actualiza en funcion del valor de busqueda
    const [filteredCountries, setFilteredCountries] = useState([]);
    //texto de filtrado
    const [filteredContinent, setFilteredContinent] = useState('');
    //control de tipo de orden de poblacion
    const [sortType,setSortType] = useState('');
    //orden ascendente y descendente para name
    const [nameSortDirection, setNameSortDirection] = useState('asc');
    //orden asc y desc para population
    const [popSort, setPopSort] = useState('asc');

    // control de pagina actual/////////////////
    const [currentPage, setCurrentPage] = useState(1);
    /////////////////////////////////////////

    //control de botones en el resultado de busqueda
    const [isSearching, setIsSearching] = useState(false);
    //control de la visibilidad del boton 
    const [showSortButton, setShowSortButton] = useState(false);
    //almacenar actividade seleccionadas
    const [selectedActivity, setSelectedActivity] = useState('');
    
    
    //traer los países
    useEffect(()=> {
        axios.get('http://localhost:3001/countries')
        .then(response => {
            setCountries(response.data);
            setFilteredCountries(response.data)
            console.log('Se recibió data')
        })
        .catch(error => {
            console.error('Error al obtener los países', error);
        })
    }, []);
    
    //buscar pais por nombre 
    const handleSearch = (search) => {
        const filtered = countries.filter(country => 
            country.name.toLowerCase().includes(search.toLowerCase())
            );
            if(filtered.length === 1) {
                setIsSearching(true);
            } else {
                setIsSearching(false)
            }
            setFilteredCountries(filtered)
            setFilteredContinent('')
            setCurrentPage(1);
        }
        
    //manejo de eventos filtro de continentes
    const handleContinentFilter = continent => {
        const filteredByContinent = countries.filter(country => {
            return country.continent === continent;
        });
        setFilteredCountries(filteredByContinent)
        setFilteredContinent(continent)
    }
    
    //manejo de filtro de actividades
    const handleActivityFilter = activity => {
        const filterByActivity = countries.filter(country => {
            return country.activities.includes(activity)
        });
        setFilteredCountries(filterByActivity)
        setFilteredContinent('')
        setSelectedActivity(activity);
    }
    
    //manejo de tipo de orden
    const handleSortTypeChange = type => {
        setSortType(type);
        setShowSortButton(true);
    };
    
    //manejo de direccion de ordenes de name y population
    const handleSortDirectionChange = () => {
        if(sortType === 'name') {
            setNameSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc')
        } else if (sortType == 'population') {
            setPopSort(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc')
        }
    }    

    /////////////////////////////////////
    //index inicial y final de paises a mostrar tomando la pagina actual y el numero de países por página
    const countriesForPage = 10;
    const indexLastCountry = currentPage * countriesForPage;
    const indexFirstCountry = indexLastCountry - countriesForPage;
    const countriesToShow = filteredCountries.slice(indexFirstCountry, indexLastCountry)
    
    //
    const totalPages = Math.ceil(filteredCountries.length / countriesForPage)
    
    //majejo de pagina
    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    }
    
    //manejo del buttonprev
    const handlePrevPage = () => {
        if(currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1)
        }
    }
    
    //manejo del buttonnext
    const handleNextPage = () => {
        if(currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1)
        }
    }*/}