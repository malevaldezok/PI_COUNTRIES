// logica de filtardo y renderizado de los paises

import React, { useEffect, useState} from "react";
import Card from "../Card/Card";
import { useSelector } from 'react-redux';
import styles from './CountryList.module.css'

const CountryList = () => {
    
    const countries = useSelector(state => state.countries);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);  
     
    let nextPage = () => {
        if(pageNumber < totalPages) {
            setCurrentPage(currentPage + 10);
            setPageNumber(pageNumber + 1)
        }
    };
    let prevPage = () => {
        if(pageNumber > 1) {
            setCurrentPage(currentPage - 10);
            setPageNumber(pageNumber - 1)
        }
    };

    const firstPage = () => {
        setCurrentPage(0);
        setPageNumber(1);
    }

    const lastPage = () => {
        setCurrentPage((totalPages - 1) * 10);
        setPageNumber(totalPages)
    }

    useEffect(() => {
        const totalPages = Math.ceil(countries.length / 10);
        setTotalPages(totalPages)
        firstPage()
    }, [countries]);

    const filterCountries = countries.slice(currentPage, currentPage + 10)

    return (
        <div className={styles.container} >
            <div className={styles.cardCountries}>
        {
            filterCountries.map(country => {
                return <Card className={styles.c} key={country.id} country={country} />
            })
        }
            </div>
            <div className={styles.containerButtons}>
            <button className={styles.buttonPage} onClick={firstPage}>{'🢀🢀'}</button>
            <button className={styles.buttonPage} onClick={prevPage}>{'🢀'}</button>
            <div className={styles.pageInfo}>
                Page { pageNumber } of { totalPages }
            </div>
            <button className={styles.buttonPage} onClick={nextPage}>{'🢂'}</button>
            <button className={styles.buttonPage} onClick={lastPage}>{'🢂🢂'}</button>
            </div>
</div>
        
)
}

export default CountryList;


{/*let orderedCountries = useMemo(()=> {
    return countriesToShow.slice().sort((a, b) => {
    if(sortType === 'name') {
        return nameSortDirection === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name)
    } else if (sortType === 'population') {
        return popSort === 'asc' 
        ? a.population - b.population 
        : b.population - a.population;
    }
    return 0;
})
})*/}