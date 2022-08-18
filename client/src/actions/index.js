import axios from "axios";


export function getCountries(){
    return async function(dispatch){
    var countries = await axios.get("http://localhost:3001/Countrys");
    return dispatch({
        type:"GET_COUNTRIES",
        payload: countries.data
    })   
}
}
export function getActivitys(){
    return async function(dispatch){
    var activitys = await axios.get("http://localhost:3001/activities");

    return dispatch({
        type:"GET_ACTIVITYS",
        payload: activitys.data
    })
}
}
export function getCountryById(id){
    return async function (dispatch){
    var detail = await axios.get("http://localhost:3001/Countrys/" + id)

    return dispatch({
        type:"GET_COUNTRY_BY_ID",
        payload: detail.data
    })
    }
}
export function getCountryByName(name){
    return async function (dispatch){
    var searchBar = await axios.get("http://localhost:3001/Countrys?name=" + name);

    return dispatch({
        type: "GET_COUNTRY_BY_NAME",
        payload:searchBar.data
    })
    }
}
export function postActivity(payload){
    return async function(dispatch){
        var createActivity= await axios.post("http://localhost:3001/activity",payload);
        console.log(payload)
        return createActivity;
    }
}
export function clear (){
    return{
        type:"CLEAR"
    }
}
export function orderByAsc (payload){
    return({
        type: "FILTER_BY_NAME",
        payload
    })
}

export function orderPopulation (payload){
    return({
        type: "FILTER_BY_POPULATION",
        payload
    })
}

export function filterByContinent(payload){
    return{
        type:"FILTER_BY_CONTINENT",
        payload
    }
}

export function filterByActivitys(payload){
    return{
        type:"FILTER_BY_ACTIVITYS",
        payload
    }
}