import './Paginate.css'

export default function Paginate({ videogamesPerPage, allVideogames, paginado }){
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allVideogames/videogamesPerPage); i++) {
    pageNumbers.push(i)
  }

  return(
    <nav>
      <div className='divPaginate'>
          {pageNumbers?.map(el =>
            <button className='paginate' key={el} onClick={() => paginado(el)}>{el}</button>
          )}
      </div>
    </nav>
  )
}