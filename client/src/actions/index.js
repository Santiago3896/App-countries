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