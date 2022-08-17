import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../actions";

import styles from './Paginado.module.css'


export default function SearchBar (){

const [name, setName] = useState("")
const Dispatch = useDispatch();



function handleInputChange(e){
    e.preventDefault();
    setName(e.target.value) // SIRVE PARA SETEAR EL NOMBRE DEVUELTA
}
function handleSubmit(e){
    e.preventDefault();
    Dispatch(getCountryByName(name)) // DESPACHO LA ACCION QUE ME BUSCA EL PAIS CON EL NOMBRE QUE LE ESTOY PASANDO POR QUERRY
}

    return(
        <div>
        <input className= {styles.btn} type="text" placeholder="Search..." onChange={e=>handleInputChange(e)}/>
        <button className= {styles.btn} type="submit" onClick={e=>handleSubmit(e)}>Submit</button>
        </div>
    )
}