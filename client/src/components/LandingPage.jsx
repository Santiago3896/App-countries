import React from "react";
import {Link} from "react-router-dom"
import {titulo,boton} from './LandingPage.module.css'

export default function LandingPage(){

    return(
        <div>
            <h1 className={titulo}>BIENVENIDOS A MI PAGINA DE PAISES</h1>
            <Link to="/home">
            <button className={boton}>Ingresar a Home</button>
            </Link>
        </div>
    )
}