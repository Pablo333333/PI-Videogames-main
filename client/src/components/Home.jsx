import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, getGenres, filterBy, OrderByName, OrderByRating } from "../actions";
import { Link } from 'react-router-dom';
import Paginate from './Paginate';
import Card from './Card'
import SearchBar from "./SearchBar";
import './Home.css'

export default function Home(){
	const dispatch = useDispatch();
	const allVideogames = useSelector((state) => state.videogames);
	const videogames = useSelector((state) => state.allVideogames)
	const [, setOrderPage] = useState()
	const genres = useSelector((state) => state.genres);
	const [currentPage, setCurrentPage] = useState(1);
	const [videogamesPerPage,] = useState(15);
	const numLastVideogame = videogamesPerPage*currentPage;
	const numFirstVideogame = numLastVideogame - videogamesPerPage;
	const currentVideogames = allVideogames.slice(numFirstVideogame, numLastVideogame);
	const paginado = (pageNumber) => {
		setCurrentPage(pageNumber);
	}

	useEffect(() => {
		dispatch(getVideogames())
	},[dispatch])

	useEffect(() => {
		dispatch(getGenres())
	},[dispatch])


	function handleClick(e){
		e.preventDefault();
		dispatch(getVideogames())
	}

	function handleFilterGenre(e){
		dispatch(filterBy(e.target.value))
		setCurrentPage(1)
	}

	function handleOrderName(e){
		e.preventDefault();
		dispatch(OrderByName(e.target.value));
		setCurrentPage(1);
		setOrderPage(`Ordenado ${e.target.value}`)
		
	}

	function handleOrderRating(e){
		e.preventDefault();
		dispatch(OrderByRating(e.target.value));
		setCurrentPage(1);
		setOrderPage(`Ordenado ${e.target.value}`)
	}


	return(
		<div className="divHome">
			<header className="header" id="header">
			<div className="divHeader">
				
				<div className="divTittle">
				<h1 onClick={(e) => handleClick(e)}>VIDEOGAMES</h1>
				</div>
				<div className="divAdd">
				<Link  className='link' to='/create'>
					<button className="divAddButton">Add Videogame</button>
				</Link>
				</div>
				<div>
				<Link to='/'>
				<button className="divRefresh">Home</button>
				</Link>
				</div>
			</div>
			</header>
			<SearchBar/>
			<div>
			<Paginate
			videogamesPerPage = {videogamesPerPage} allVideogames = {allVideogames.length} paginado = {paginado}/>
			</div>
			<div>
				<div className="divOption">
					<h3 className="h3Select">Sort by:</h3>
					<h5 className="h5Option">Alphabet:</h5>
					<select className="selects" onChange={e => handleOrderName(e)}>
						<option className="optionAll">-</option>
						<option className="optionAll" value='az'>A-Z</option>
						<option className="optionAll" value='za'>Z-A</option>
					</select>
					
					
					<h5 className="h5Option">Rating:</h5>
					<select className="selects" onChange={e => handleOrderRating(e)}>
						<option className="optionAll">-</option>
						<option className="optionAll" value='desc'>Low to High</option>
						<option className="optionAll" value='asc'>High to Low</option>
					</select>
					<h3 className="h3Select">Filter by:</h3>
					<h5 className="h5Option">Genres</h5>
					<select className="selects" onChange={e => handleFilterGenre(e)}>
						<option className="optionAll" value='all'>All</option>
						{genres?.map((el) =>(<option className="optionAll" key={el.id} value={el.name}>{el.name}</option>))}
					</select>
					
					<h5 className="h5Option">Storage:</h5>
					<select className="selects" onChange={e => handleFilterGenre(e)}>
						<option className="optionAll" value='all'>All</option>
						<option className="optionAll" value='created'>Created</option>
						<option className="optionAll"value='api'>Loaded from API</option>
					</select>	
				</div>
				<div className="divVideogame">
				{allVideogames.length === 0 && videogames.length === 0 ? <p className="loadingHome">Loading...</p>
					: currentVideogames.map(el => 
						<Card img={el.img} id={el.id} name={el.name} genres={el.genres} key={el.id} rating={el.rating}/>)}
				{currentVideogames.length === 0 && videogames.length !== 0 ? <p className="loadingHome">No results found</p> : ''}
				</div>
				<Paginate
			videogamesPerPage = {videogamesPerPage} allVideogames = {allVideogames.length} paginado = {paginado}/>
			</div>
		</div>
	)
}