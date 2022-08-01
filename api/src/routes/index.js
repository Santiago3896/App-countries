const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ("axios");
const {Country, Activity} = require ("../db.js")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async() => {
    const apiUrl = await axios.get("https://restcountries.com/v3/all")
    const apiInfo = await apiUrl.data.map(e =>{
        return{
          id: e.cca3,  
          name: e.name.common.toLowerCase(),
          img: e.flags[0],
          continents: e.continents,
          capital: e.capital? e.capital : ["No tiene"],
          subregion: e.subregion,
          area: (e.area),
          population: (e.population),
        }
    })
    return apiInfo;
}

const getDbInfo = async () => {
    return await Country.findAll({
        include:{
            model:Activity,
            attributes: ["name", 'difficulty', 'duration', 'season'],
            through: {
                attributes: [],
            },
        }
    })
}
// const getDbInfo = async () => {
//     return await Country.findAll({
//       includes: Activity,
        
//         attributes: ['name', 'difficulty', 'duration', 'season'],   
//         through: { activity: [] }

             
//     })
// }

const getAllCountrys = async()=>{
    const infoTotal1 = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal2 = infoTotal1.concat(dbInfo);
    return infoTotal2;
}


router.get("/Countrys", async (req,res)=>{ // RUTA DE GET COUNTRYS Y COUNTRY PASADO POR QUERY (NAME) //
    const name = req.query.name
    let countrysTotal = await getAllCountrys ();
    if (name){
        let countryName = await countrysTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        countryName.length ?
        res.status(200).send(countryName) :
        res.status(400).send(countryName);
        // TRAEME TAL PAIS POR QUERY, SI NO LO ENCONTRAS RESPONDEME CON EL 404...
    }else{
        res.status(201).send(countrysTotal)
    } // SI NO PEDIMOS NADA POR QUERY, TRAEME TODOS LAS PAISES
})

router.get("/Countrys/:id", async (req,res)=>{ // RUTA DE GET COUNTRYS PASADO POR PARAMS (ID) //
    const id =req.params.id
    let countrysAll = await getAllCountrys();

    if(id){
        let countryId = await countrysAll.filter(e=>e.id.toLowerCase() === id.toLowerCase())
        countryId.length ? res.status(202).send(countryId) : res.status(404).send("No existe el Pais")
    }
})
router.post("/activity", async (req,res) =>{
    let{
        name,
        difficulty,
        duration,
        season,
        country
    } = req.body;

    let activityCreated = await Activity.create ({
        name,
        difficulty,
        duration,
        season 
    })

    let countryDb = await Country.findAll({
        where: {name : country}
    })
    activityCreated.addCountry(countryDb)
    res.send("Actividad creada con exito")
})

router.get('/activities', async (req, res) => {

    const activities = await Activity.findAll();
    if(activities.length) {
      return res.status(200).json(activities);
    }
    return res.status(200).send([]);
});



module.exports = router;
