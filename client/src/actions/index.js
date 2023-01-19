import axios from 'axios'
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_GENRES = 'GET_GENRES';
export const FILTER_BY = 'FILTER_BY';
export const FILTER_BY_RATING = 'FILTER_BY_RATING';
export const ORDER_NAME = 'ORDER_NAME';
export const ORDER_RATING = 'ORDER_RATING';
export const SEARCH_NAME = 'SEARCH_NAME';
export const GET_DETAIL = 'GET_DETAIL';
export const POST_VIDEOGAME = 'POST_VIDEOGAME';

export function getVideogames(){
  return async function(dispatch){
    const json = await axios.get(`/videogames`)
    return dispatch({
        type: GET_VIDEOGAMES,
        payload: json.data
    })
  }
};

export function getGenres(){
  return async function(dispatch){
    const json = await axios.get(`/genres`)

    return dispatch({
      type: GET_GENRES,
      payload: json.data
    })
  }
}

export function searchByName(name){
	return async function(dispatch){
		try {
			const json = await axios.get(`/videogames?name=${name}`);
			return dispatch({
				type: SEARCH_NAME,
				payload: json.data
			})
		} catch (error) {
			console.log(error)
		}
	}
}

export function getDetail(id){
  return async function(dispatch){
    const json = await axios.get(`/videogames/${id}`);
    return dispatch({
      type: GET_DETAIL,
      payload: json.data
    });
  }
}

export function postVideogame(payload){
  return async function(dispatch){
    const json = await axios.post('/create', payload)
    return dispatch({
      type: POST_VIDEOGAME,
      payload: json.data
    })
  }
}

export function filterBy(payload){
  return{   
    type: FILTER_BY,
    payload
  }
}

export function filterByRating(){
  return{   
    type: FILTER_BY_RATING
  }
}

export function OrderByName(payload){
  return{   
    type: ORDER_NAME,
    payload
  }
}

export function OrderByRating(payload){
  return{   
    type: ORDER_RATING,
    payload
  }
}