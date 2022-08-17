import React from "react";

import styles from './Card.module.css';

export default function Card({img,name,continents}){

    return(
        <div>
            <div className = {styles.row}>
            <div className = {styles.column}>
            <div className = {styles.card}>
            <div className ={styles.container}>
            <h2>{name.toUpperCase()}</h2>
            <img src={img} alt="No hay foto" width="250px" height="250px"/>
            <h3>Continente: {continents}</h3>
        </div>
        </div>
        </div>
        </div>
        </div>
    )
}