import React from "react";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { getCountries } from "../actions";
import Card from "./Cards"


export default function Home(){
const Dispatch = useDispatch();
const allCountries = useSelector((state=>state.countries));

useEffect(()=>{
    Dispatch(getCountries());
},[Dispatch])

    return(
        <div>
        <Link to="/">
        <button>Volver</button>
        </Link>
        {allCountries && allCountries.map((e)=> {
            return(
                <div>
                <Card
                name= {e.name}
                img= {e.img}
                continents = {e.continents}
                />
                </div>
            )
        })}
        </div>
    )
}