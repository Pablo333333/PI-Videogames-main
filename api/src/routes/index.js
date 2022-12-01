require('dotenv').config();
const { Router} = require('express');
const {API_KEY}= process.env;
const axios = require('axios');
const { Videogame, Genre} = require('../db')


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const apiKey = `?key=${API_KEY}`
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const dataApi = async () => {

	const apiUrl = await axios.get(`https://api.rawg.io/api/games${apiKey}`);
	var next = apiUrl.data.next;
	var apiVideogames= apiUrl.data.results;

		for (let i = 1; i < 5; i++) {
		let element = await axios.get(next);
		element.data.results.map(el => apiVideogames.push(el))
		next = element.data.next;
	}

	apiVideogames = apiVideogames.map(el => {
			let games = {	
				id: el.id,
				name: el.name,
				img: el.background_image,	
				rating: el.rating,
				platforms: el.parent_platforms.map(el => el.platform.name),
				genres: el.genres
			};
			return games;
		});	
		
	return apiVideogames;
}

const dataDb = async () => {
    return await Videogame.findAll({
        include: {
            model: Genre,
						attributes: ['name'],
						through: {
							attributes: [],
						}
        }
    });
}

const getAll = async () => {
	const apiInfo =  await dataApi();
	const dbInfo = await dataDb();
	const infoTotal = [...apiInfo, ...dbInfo];
  return infoTotal;
}

const getGenres = async () => {
	const infoApi = await axios.get(`https://api.rawg.io/api/genres${apiKey}`);
	const apiJson = infoApi.data.results.map(el => {
		return{
			id: el.id,
			name: el.name
		}
	})
	const contain = await Genre.findAll();
	if(!contain.length){
		await Genre.bulkCreate(apiJson);
	}
	return apiJson;
}

router.get('/videogames', async (req, res) => {
		const name = req.query.name;
    const videogames = await getAll();
		if(name){
			let gameByName = videogames.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
			gameByName.length ?
			res.json(gameByName) :
			res.status(404).json('El videojuego no existe');
		} else {
			res.json(videogames)
		}
});

router.get('/videogames/:id', async (req, res) => {
	const id = req.params.id; 

	if(isNaN(id)){
		let videogameDb = await Videogame.findOne({
			where: {
				id: id
			},
			include:{
				model: Genre,
				attributes: ['name'],
				through:{
					attributes: []
				}
			}
		})
		return res.json(videogameDb)
	} else{
		try {
			const videogamesApi = await axios.get(`https://api.rawg.io/api/games/${id}${apiKey}`);

			const apiData = videogamesApi.data;

			const game = {
				id:apiData.id,
				name: apiData.name,
				img: apiData.background_image,
				description: apiData.description,
				released: apiData.released,
				rating: apiData.rating,
				platforms: apiData.parent_platforms.map(el => el.platform.name),
				genres: apiData.genres.map(el => el)
			}

			res.json(game)

		} catch (error) {
			console.log(error)
		}
	}
})

router.get('/genres', async (req, res) => {
	const infoApi = await getGenres();
	res.json(infoApi)
})

router.post('/create', async (req, res) => {
	const { name, description, released, rating, platforms, genres, img } = req.body;
	const videogames = await getAll();
	const checkVideogame = videogames.filter(el => el.name.toLowerCase() === name.toLowerCase());
	
	if(!checkVideogame.length){
		try {
			const [ createVideogame, created ] = await Videogame.findOrCreate({
				where: {
					name,
					description,
					released,
					rating,
					platforms,
					img
				}
			})
			await createVideogame.addGenres(genres);
			res.json(createVideogame)
		} catch (error) {
			console.log(error)
		}
	} else {
		res.json({message: `El videojuego ${name} ya existe`})
	}
})

module.exports = router;