import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { Link } from "react-router-dom";
import './DetailVideogame.css'


export default function DetailVideogame(props){
	const dispatch = useDispatch();
	const videogame = useSelector((state) => state.detail)

	useEffect(()=> {
		dispatch(getDetail(props.match.params.id))
	},[dispatch]);

	return(
		<>
			{ videogame ?
				<div className="divAllDetail">
						<div className="divButtonBack">
						<Link className="linkDetail" to='/videogames'>Back</Link>
						</div>
					<div className="divDetail">			
						<h1 className="h1Detail">{videogame.name}</h1>
						<div className="divInfo">
							<div>
								<img className="imgProps" src={videogame.img} alt='not found'/>
					</div>
							<div className="newDiv">
								<div className="divContain">
									<h5 className="h5Add">Genres:</h5>
									{videogame.genres?.map(el => 
										<p className="options" key={el.id}>{el.name}</p>
									)}
								</div>
								<div className="divContain">
									<h5 className="h5Add">Released date:</h5>
									<p className="options">{videogame.released}</p>
								</div>
								<div className="divContain">
									<h5 className="h5Add">Platforms:</h5>
									{videogame.platforms?.map(el => 
										<p className="options" key={el}>{el}</p>
									)}
								</div>
								<div className="divContain">
									<h5 className="h5Add">Rating:</h5>
									<p className="options">{videogame.rating}</p>
								</div>
							</div>
						</div>
							<p className="description">{videogame.description}</p>
							<div className="divContain">
						</div>			
					</div>
				</div>
				: <p>Loading</p>
			}
		</>
	)
}