import React from "react";

export default function Card({img,name,continents}){

    return(
        <div>
            <h2>{name.toUpperCase()}</h2>
            <img src={img} alt="No hay foto" width="250px" height="250px"/>
            <h3>Continente: {continents}</h3>
        </div>
    )
}