const inicialState = {
    countries : [],
    countries2 : [],
    detail: [],
    continents : [],
    activities : []
    
}
function rootReducer(state = inicialState,action){
    switch(action.type){
            case "GET_COUNTRIES":
            return{
                ...state,
                countries: action.payload,
                countries2: action.payload
            }
            case "GET_ACTIVITYS":
            return{
                ...state,
                activities: action.payload
            }
            case "GET_COUNTRY_BY_ID":
            return{
                ...state,
                detail: action.payload
            }
            case "CLEAR":
            return{
                ...state,
                detail:[]
            }
            case "GET_COUNTRY_BY_NAME":
            return{
                ...state,
                countries: action.payload
            }
            case "POST_ACTIVITY":
            return{
                ...state,
            }
            
            case "FILTER_BY_NAME":
            let sortedArr = action.payload === 'asc' ? // VER BIEN COMO HICIMOS TODO ESTO//
            state.countries.sort(function (a, b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            }) :
            state.countries.sort(function (a, b) {
                if (a.name > b.name) return -1;
                if (a.name < b.name) return 1;
                return 0;
            })
            return {
                ...state,
                countries: sortedArr
            }
            case "FILTER_BY_POPULATION":
                let sortPopulation = action.payload === 'asc' ?
                state.countries.sort(function (a, b) {
                    if (a.population > b.population) return -1;
                    if (a.population < b.population) return 1;
                    return 0;
                }) :
                state.countries.sort(function (a, b) {
                    if (a.population < b.population) return -1;
                    if (a.population > b.population) return 1;
                    return 0;
                })
                return {
                    ...state,
                    countries: sortPopulation
                }   
            case "FILTER_BY_CONTINENT":
            const allCountries = state.countries2
            const filterContries = allCountries.filter(el=> el.continents === action.payload)
                
            return{
                ...state,
                countries: filterContries
            }
            // case "FILTER_BY_ACTIVITYS":
            // const allCountries1 = state.countries
            // const filterActivities = allCountries1.filter(el=>el.activities.includes( action.payload))
            // const filtradoActividades = filterActivities
            // console.log(filterActivities)
            // return{
            //     ...state,
            //     countries: filterActivities
            // }
            
            default: return {
                state
            }

    }
    

}

export default rootReducer;