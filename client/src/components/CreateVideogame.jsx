import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getGenres, getVideogames, postVideogame} from "../actions";
import './CreateVideogame.css'

function validate(input){
	let errors = {};
	if(!input.name){
		errors.name = 'Name is required'
	} else if(input.name.length < 2){
		errors.name = 'Name is required'
	} else if(!input.released){
		errors.released = 'Enter a date'
	} else if(!input.rating || input.rating < 1 || input.rating > 5){
		errors.rating = 'Enter a number between 1 and 5'
	}  else if(input.genres < 1){
		errors.genres = 'Select at least 1 genre'
	} else if(input.platforms < 1){
		errors.platforms = 'Select at least 1 platform'
	} else if(!input.description || input.description.length < 8){
		errors.description = 'Description is required'
	}
	return errors
}


export default function CreateVideogame(){
	const dispatch = useDispatch();
	const videogames = useSelector((state) => state.videogames);
	const genres = useSelector((state) => state.genres)
	const [errors , setErrors] = useState({})
	const platformsVideogames = []
	const allPlatforms = videogames.map(el => el.platforms.map(el => platformsVideogames.push(el)))
	const platformsList = [...new Set(platformsVideogames)]

	const [input, setInput] = useState({
		name: '',
		description: '',
		released: '',
		img: '',
		rating: '',
		genres: [],
		platforms: [],
	})

	
	

	useEffect(() => {
		dispatch(getVideogames())
	},[dispatch])

	useEffect(() => {
		dispatch(getGenres())
	},[dispatch])

	function handleChangeName(e){
		setInput({
			...input,
			[e.target.name]: e.target.value
		})
		setErrors(validate({
			...input,
			[e.target.name]: e.target.value
		}))
	}

	function handleChange(e){
		setInput({
			...input,
			[e.target.name]: e.target.value
		})
		setErrors(validate({
			...input,
			[e.target.name]: e.target.value
		}))
	}

	function handleCheck(e){
		if(e.target.checked){
			setInput({
				...input,
				platforms: [...input.platforms, e.target.value]
			})
		}
		setErrors(validate({
			...input,
			[e.target.name]: e.target.value
		}))
	}

	function handleSelect(e){
		const genresExist = input.genres.filter(el => el === e.target.value);

		if(genresExist.length === 0){
			setInput({
				...input,
				genres: [...input.genres, e.target.value]
			})
			setErrors(validate({
				...input,
				[e.target.name]: e.target.value
			}))
		}
	}

	function handleSubmit(e){
		const checkVideogame = videogames.filter(el => el.name.toLowerCase() === input.name.toLowerCase())

		if(!input.name || !input.description || !input.released || !input.rating || input.genres < 1 || input.platforms < 1){
			e.preventDefault()
			return alert('Please complete the form')
		}

		if(checkVideogame.length){
			e.preventDefault()
			alert(`The videogame ${input.name.toUpperCase()} already exists`)
		} else{
		dispatch(postVideogame(input));
		alert(`Game ${input.name.toUpperCase()} added successfully`)
		setInput({
			name: '',
			description: '',
			released: '',
			img: '',
			rating: '',
			genres:[],
			platforms: [],
		});
		}	
	}

	function handleDelete(el){	
		setInput({
			...input,
			genres: input.genres.filter(g => g !== el)
		})
		
	}

	function handleReset(e){
		setInput({
			name: '',
			description: '',
			released: '',
			img: '',
			rating: '',
			genres:[],
			platforms: [],
		});
	}

	return(
		<div className="divTot">
			<form className="divAddAll" onSubmit={(e) => handleSubmit(e)}>
				<h1 className="divAddVideogame">Add Videogame</h1>
				<div className="divCont">	
				<div className="divNew">
				<div className="divNameAdd">
							<label className="label">Name:</label>
							<input placeholder="Enter a name" className='danger' type='text' value={input.name} name='name' onChange={(e) => handleChangeName(e)}></input>
						</div>
							{errors.name && (<p className="errors">{errors.name}</p>)}
					<div className="divReleasedAdd">
							<label className="label">Released:</label>
							<input className='danger'type='date' name='released' onChange={(e) => handleChange(e)}></input>
						</div>
							{errors.released && (<p className="errors">{errors.released}</p>)}
					<div className="divRatingAdd">
							<label className="label">Rating:</label>
							<input placeholder="Enter a number" className='danger' type='number' min='1' max='5' step='0.1' name='rating' onChange={(e) => handleChange(e)}></input>
						</div>
						{errors.rating && (<p className="errors">{errors.rating}</p>)}
					<div className="divGenresAdd">
							<label className="label">Genres:</label>
							<select className="selectGenre" onChange={(e) => handleSelect(e)}>
								{genres.map(el =><option className='labelGenre' key={el.name} value={el.name}>{el.name}</option>)}
							</select>
							{errors.genres && (<p className="errors">{errors.genres}</p>)}
								{input.genres?.map(el => 
									<div className="genresAdd" type='none'  key={el}>
										<p className="liGenres" key={el}>{el}</p>
										<button className="deleteGenres" onClick={() => handleDelete(el)}>X</button>
									</div>
								)}
								
						</div>
					<div className="divImgAdd">
							<label className="label">Image:</label>
							<input className='danger' type='url' placeholder="Enter image URL " value={input.img} name='img' onChange={(e) => handleChange(e)}></input>
						</div>
						{errors.img && (<p className="errors">{errors.img}</p>)}
					</div>
					<div className="divNew">
					{errors.platforms && (<p className="errors">{errors.platforms}</p>)}
						<div className="divPlatformsAdd">	
							<label className="label">Platforms:</label>
							<div className="box">
								{platformsList.map(el =><p className="checkbox" key={el}><input className="inputPlat" type='checkbox' value={el} name={el} key={el} onChange={(e) => handleCheck(e)}></input>{el}</p>)}							
							</div>
						</div>
						</div>
					<div className="divDescriptionAdd">
						<label className="label">Description:</label>
						{errors.description && (<p className="errors">{errors.description}</p>)}
						<textarea className='textarea' rows='5' value=	{input.description} name='description' onChange={(e) => handleChange(e)}></textarea>
					</div>
				</div>
				<div className="buttons">
					<Link className="linkAdd" to='/videogames'><button className="buttonBack">Go Back</button></Link>
					<button type='submit' className="buttonAdd">Add</button>
				</div>
			</form>
			
		</div>
	)

}