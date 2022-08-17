import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { getCountries, postActivity } from "../actions";
import { useHistory } from "react-router-dom";

import './CreateActivity.module.css'

function validate (input){
    let errors= {};

    if(!input.name){
        errors.name = "El nombre es un campo necesario"
    }
    if (!input.duration){
        errors.duration = "La duracion es un campo necesario"
    }
    if(input.difficulty>10 || input.difficulty<1){
        errors.difficulty = "El campo tiene que ser de 1 a 10"
    } return errors
}

export default function CreateActivity(){

    const Dispatch = useDispatch();
    const allCountries = useSelector((state=>state.countries))
    const history = useHistory();
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name:"",
        duration:"",
        difficulty:"",
        season:"",  //VER PORQUE ME CREA LA ACTIVIDAD PERO NO ME GENERA LA CONEXION CON EL PAIS. EN EL POSTAM ME LA CREA Y ADEMAS ME HACE LA CONEXION CON EL PAIS BIEN.///
        country:""
    })
    
    console.log(input)
    useEffect(()=>{
        Dispatch(getCountries());
    },[Dispatch])
    

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }
    function handleCheck(el){
        if (el.target.checked){
            
            setInput({
                ...input,
                [el.target.name]:el.target.value
                
            })
            setErrors(validate({
                ...input,
                [el.target.name]: el.target.value
            }
            ));
        }
    }
    function handleSelect(e){
        setInput({
            ...input,
            country: [...input.country, e.target.value]
        })
    }
    function handelDelete(el){
        let nuevosPaises= input.country?.filter(e=>e!==el)
        console.log(nuevosPaises)
        setInput({
            ...input,
            country: [...nuevosPaises]
        })
    }
    function handleSubmit(e){
        e.preventDefault();
        if(!errors.name && !errors.difficulty && !errors.duration){
        Dispatch(postActivity(input))
        console.log(input)
        alert("Actividad creada con exito");
        setInput({
        name:"",
        duration:"",
        difficulty:"",
        season:"",
        country:""
        })}else{ alert("Campos incompletos o con errores")}
         history.push("/home");
    }
   

return(
    <div>
        <Link to="/Home"><button>Volver</button></Link>
        <h1> CREA TU ACTIVIDAD TURISTICA </h1>
        <form>
        <div>
        <label>NOMBRE:</label>
        <input type="text" value={input.name} name="name" onChange={e=> handleChange(e)}/>
        {errors.name &&(
            <p>{errors.name}</p>
        )}
        </div>
        <div>
        <label>DURACION en Min:</label>
        <input type="text" value={input.duration} name="duration" onChange={e=> handleChange(e)}/>{errors.duration &&(<p>{errors.duration}</p>)}
        
        </div>
        <div>
        <label>DIFICULTAD:</label>
        <input type="number" value={input.difficulty} name="difficulty" onChange={e=> handleChange(e)}/>
        {errors.difficulty &&(
            <p>{errors.difficulty}</p>
        )}
        </div>
{/* 
        ES UNA BOLUDEZ, MIRAR SINTAXIS DEL CHECKBOXS PARA PONER LAS 4 TEMPORADAS
        <div>
        <label>TEMPORADA:</label>
        <input type="text" value={input.temporada} name="temporada" onChange={e=> handleChange(e)}/>
        </div>
        <div>
            <label>TEMPORADA: </label>
            <input type="checkbox" name="temporada" value={input.temporada}/>
        </div> */}
        <label>Temporada:</label>
                    <label><input
                    type = "radio"
                    required
                    name= "season"
                    value= "Verano"
                    onChange={(el)=>handleCheck(el)}
                    />Verano</label>          
                    <label><input
                    type = "radio"
                    name= "season"
                    value= "Otoño"
                    onChange={(el)=>handleCheck(el)}  
                    />Otoño</label>  
                    <label><input
                    type = "radio"
                    name= "season"
                    value= "Invierno"
                    onChange={(el)=>handleCheck(el)}
                    />Invierno</label> 
                    <label><input
                    type = "radio"
                    name= "season"
                    value= "Primavera"
                    onChange={(el)=>handleCheck(el)}
                    />Primavera</label>
        <div>
        <label>PAISES:</label>
        <select onChange={(e)=> handleSelect(e)}>
            {allCountries?.map(e=>(<option name="country" value={e.name}>{e.name}</option>))}
        </select>
        </div>
        <button type="Submit" onClick={(e)=> handleSubmit(e)}>Submit</button>
        </form>
        {
            input.country&&input.country.map(el=>{
                return(
                    <div>
                <button onClick={()=>handelDelete(el)} value={el} >X</button>
                <p>
                    {el}
                </p>
                </div>
                )
            })
            


        }
    </div>
)
}