import { GET_VIDEOGAMES, GET_GENRES, FILTER_BY, ORDER_NAME, ORDER_RATING, SEARCH_NAME, GET_DETAIL, POST_VIDEOGAME, FILTER_BY_RATING} from '../actions'

const initialState = {
	videogames: [],
	allVideogames: [],
	genres: [],
	detail: []
}


const rootReducer = (state = initialState, action) => {
	switch(action.type){
		case GET_VIDEOGAMES: 
			return{
				...state,
				videogames: action.payload,
				allVideogames: action.payload
			};
		case GET_GENRES:
			return{
				...state,
				genres: action.payload
			}
		case FILTER_BY:
			const allVideogames = state.allVideogames;
			if(action.payload === 'all'){
				return{
					...state,
					videogames: allVideogames
				}
			}
			if(action.payload === 'api'){
				return{
					...state,
					videogames: allVideogames.filter(el => (typeof el.id) === 'number')
				}
			}
			if(action.payload === 'created'){
				return{
					...state,
					videogames: allVideogames.filter(el => (typeof el.id) === 'string')
				}
			} else{
				const filtered = allVideogames.filter((game) => game.genres.find(genre => genre.name === action.payload))
				return {
					...state,
					videogames: filtered
				}
			}
		case FILTER_BY_RATING:
			const filtered = state.allVideogames.filter(el => el.rating > 4.5)
				return {
					...state,
					videogames: filtered
				}

		case ORDER_NAME:
			const videogames = state.videogames;
			const sortedArr = action.payload === 'az' ?
			videogames.sort(function(a,b){ 
				if(a.name > b.name){
					return 1
				}
				if(b.name > a.name){
					return -1
				}
				return 0;
			}) :
			videogames.sort(function(a,b){ 
				if(b.name > a.name){
					return 1
				}
				if(a.name > b.name){
					return -1
				}
				return 0;
			})
			return {
				...state,
				videogames: sortedArr
			}
		case ORDER_RATING:
			const videogames2 = state.videogames;
			const sortedArr2 = action.payload === 'desc' ? 
			videogames2.sort(function(a,b){
				if(a.rating > b.rating){
				return 1
				}
				if(b.rating > a.rating){
					return -1
				}
				return 0;
			}) : 
			videogames2.sort(function(a,b){
				if(b.rating > a.rating){
					return 1
				}
				if(a.rating > b.rating){
					return -1
				}
				return 0;
			})
			return {
				...state,
				videogames: sortedArr2
			}
		case SEARCH_NAME:
			return{
				...state,
				videogames: action.payload
			}
		case GET_DETAIL:
			return{
				...state,
				detail: action.payload
			}
		case POST_VIDEOGAME:
			return{
				...state
			}
		default: {
		return state
		}
	}
	
}

export default rootReducer;