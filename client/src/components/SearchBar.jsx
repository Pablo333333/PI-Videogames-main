import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {searchByName} from '../actions';
import './SearchBar.css'

export default function SearchBar(){
	const dispatch = useDispatch()
	const [name, setName] = useState('');

	function handleInput(e){
		e.preventDefault();
		setName(e.target.value);
		dispatch(searchByName(e.target.value))
	}

	function handleSubmit(e){
		e.preventDefault()
		dispatch(searchByName(name));
		setName('');
	}

	return(
		<div>
			<input className='inputSearch' type='text' placeholder='Enter name' onChange={(e) => handleInput(e)}/>
			<button className='buttonSearch' type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
		</div>
	)
}