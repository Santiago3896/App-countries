import React from "react";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { getCountries, filterByContinent, orderByAsc, orderPopulation, getActivitys, filterByActivitys } from "../actions";
import Card from "./Cards"
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

import styles from './Paginado.module.css'
import Styles from './Home.module.css'



export default function Home(){
const Dispatch = useDispatch();
const AllCountries = useSelector((state=>state.countries));
const AllActivities = useSelector((state)=>state.activities)

const [orden, setOrden] = useState('')

const [currentPage, setCurrentPage] =useState(1);
const [countriesPerPage, setCountriesPerPage] = useState(10);
const indexOfLastCountries = currentPage * countriesPerPage; 
const indexOfFirstCountries = indexOfLastCountries - countriesPerPage;
const currentCountries = AllCountries?.slice(indexOfFirstCountries, indexOfLastCountries);

const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
}

useEffect(()=>{
    Dispatch(getCountries());
    Dispatch(getActivitys())
},[Dispatch])



function handleClick(e){
    e.preventDefault();
    Dispatch(getCountries());
    setCurrentPage(1);
}

function handleFilterContinents(e){
    e.preventDefault();
    Dispatch(filterByContinent(e.target.value))
    setCurrentPage(1);
}

function handleSort(e){
    e.preventDefault();
    Dispatch(orderByAsc(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
}
function handleActivities(e){
    e.preventDefault();
    Dispatch(filterByActivitys(e.target.value))
    setCurrentPage(1);
}

function handleSort2(e){
    e.preventDefault();
    Dispatch(orderPopulation(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
}



    return(
        <div className={Styles.sf}>
        <h1 className={styles.letra}>APP DE COUNTRIES</h1>
        <br></br>
        <Link to="/">
        <button >Volver</button>
        </Link>
        <button className={styles.btn} onClick={e=>{handleClick(e)}}>
            Refresh all countrys
        </button>
        <Link className={styles.letra} to="/Activitys">Create all activity</Link>
        <SearchBar/>
        <select className={styles.btn} onChange={e=> handleFilterContinents(e)} >    
            <option value="Africa">Africa</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Oceania">Oceania</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
        </select>
        <select className={styles.btn} onChange={e=> handleSort(e)}>
            <option value="asc">Ascendente</option>
            <option value="descendente">Descendente</option>
        </select>

        <select onChange= {e=> handleActivities(e)}className={styles.btn}>
        {  AllActivities&&AllActivities.map(e=>{
            return(
            <option value={e.name}>{e.name}</option>
       )})}
        </select>
        <select className={styles.btn} onChange={e=> handleSort2(e)}>
            <option value="asc">Mayor Población</option>
            <option value="desc">Menor Población</option>
        </select>
        
        <Paginado
        countriesPerPage={countriesPerPage}
        AllCountries={AllCountries?.length}
        paginado={paginado}
        />
        
        {currentCountries && currentCountries.map((e)=> {
            return(
                <div className={styles.container}>
                <Link to={"/Detail/" + e.id}>
                <Card
                name= {e.name}
                img= {e.img}
                continents = {e.continents}
                />
                </Link>
                </div>
            )
        })}
        
        </div>
    )
}