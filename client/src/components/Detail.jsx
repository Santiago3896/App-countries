import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCountryById, clear, deleteCountrys } from "../actions";
import Activitys from "./Activitys";





export default function Detail (props){

const Dispatch = useDispatch();
const countryById = useSelector((state=> state.detail));

useEffect(()=>{
    Dispatch(getCountryById(props.match.params.id));
    return () => {
        Dispatch (clear())}
},[Dispatch])




// for(let i=0;1<countryById?.activities?.length;i++){
//     let paises = []
//      paises = countryById?.activities[i]?.name
//      console.log(paises)
//   }
  

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
        <div>
            {countryById?.map((e)=>
           
                <div>
                    <h3>ACTIVITY: {e.activities.map((e)=>{
                        return <Activitys name={e.name} difficulty={e.difficulty} season={e.season} duration={e.duration}/>
                    })}</h3>
                </div>
                
                
                )}
        </div>
        </div>
        
    )
}