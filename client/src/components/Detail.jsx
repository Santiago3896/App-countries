import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCountryById, clear } from "../actions";




export default function Detail (props){

const Dispatch = useDispatch();
const countryById = useSelector((state=> state.detail));

useEffect(()=>{
    Dispatch(getCountryById(props.match.params.id));
    return () => {
        Dispatch (clear())}
},[Dispatch])


    return(
        <div>
            {countryById?.map(e=>
            <div>
            <h1>{e.name.toUpperCase()}</h1>
            <img src={e.img} alt="No hay foto" width="250px" height="250px"/>
            <h2>CONTINENT: {e.continents}</h2>
            <h3>ID: {e.id}</h3>
            <h3>SUBREGION: {e.subregion}</h3>
            <h3>CAPITAL: {e.capital}</h3>
            <h3>POPULATION: {e.population}</h3>
            <h3>AREA: {e.area}</h3>
            </div>
        )}
        </div>
    )
}