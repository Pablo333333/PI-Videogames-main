//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios= require('axios')
const {API_KEY}= process.env;
const apiKey = `?key=${API_KEY}`

// Syncing all the models at once.

async function getVideogames(){
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
			console.log(games);
		});	
}

async function getGenres(){
  const infoApi = await axios.get(`https://api.rawg.io/api/genres${apiKey}`);
	const apiJson = infoApi.data.results.map(el => {
		return{
			id: el.id,
			name: el.name
		}
	})
	console.log(apiJson);
}




conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    getVideogames()
    getGenres()
    
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
