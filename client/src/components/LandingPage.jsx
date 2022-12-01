import React from "react";
import { Link } from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage(){
	return(
		<div>
			<h1 className='tittle'>WELCOME TO<br/>VIDEOGAME STORE</h1> 
			<Link to='/videogames'>
				<button className="start">GO!</button>
			</Link>
		</div>
	)
}