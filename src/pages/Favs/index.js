import { useEffect, useState } from 'react';
import './favs.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Favs() {

    const [movies, setMovies] = useState([]);
    const [laoding, setLoading] = useState();

    useEffect(() => {
        const myList = localStorage.getItem("@YourMovies");
        setMovies(JSON.parse(myList) || []);
    }, [])

    function movieRemoved(id) {
        let filterMovies = movies.filter((i) => {
            return (i.id !== id);
        })

        setMovies(filterMovies);
        localStorage.setItem("@YourMovies", JSON.stringify(filterMovies));
        toast.success("Filme excluido da lista!")
    }

    if (laoding) {
        return (
            <div className='loading-page'></div>
        )
    }

    return (
        <div className='my-movies'>
            <h1> Meus filmes favoritos</h1>

            {movies.length === 0 && <span className='lists-off'>Você não possui filmes favoritos =(</span>}

            <ul>
                {movies.map((i) => {
                    return (
                        <li key={i.id}>
                            <span> {i.title} </span>
                            <div>
                                <Link to={`/movies/${i.id}`}> Detalhes </Link>
                                <button className='remove-movie' onClick={() => movieRemoved(i.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}


export default Favs;