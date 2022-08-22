import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './movies.css';
import {toast} from 'react-toastify'

function Movies() {
    const { id } = useParams();
    
    const navigate = useNavigate();
    
    const [movie, setMovies] = useState({});
    
    const [loading, setLoading] = useState();

    useEffect(() => {
        async function loadMovies() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: '934a48d004fd910aa9608f2713c55a23',
                    language: 'pt-br'
                }
            }).then((res) => {
                setMovies(res.data);
                setLoading(false);
            }).catch(() => {
                navigate("/", {replace: true});
                return;
            })
        }

        loadMovies();
    }, [id, navigate]);

    function saveMovies(){
        const listFavoriteMovies = localStorage.getItem("@YourMovies");
        
        let savedMovies = JSON.parse(listFavoriteMovies) || [];
        
        const hasMovie = savedMovies.some((movieSave) => movieSave.id === movie.id)

        if(hasMovie){
            toast.warn("Esse filme já existe na lista!")
            return;
        }

        savedMovies.push(movie);
        localStorage.setItem("@YourMovies", JSON.stringify(savedMovies));
        toast.success("filme adicionado a lista de favoritos!")
    }

    if (loading) {
        return (
            <div className='loading-page'></div>
        )
    }

    return (
        <div className='container'>
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title}/>
            <h3>Sinopse</h3>
            <span>{movie.overview}</span>
            <strong> Avaliações: {movie.vote_average} / 10</strong>

            <div className='buttons-area'>
                <button onClick={saveMovies}>Salvar</button>
                <button> <a href={`https://youtube.com/results?search_query=${movie.title} Trailer`} target="_blank"> Trailer </a></button>
            </div>
        </div>
    )
}

export default Movies;