import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './Home.css'

function Home() {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMovies() {
            const response = await api.get('movie/now_playing', {
                params: {
                    api_key: "934a48d004fd910aa9608f2713c55a23",
                    language: 'pt-br',
                    page: 1
                }
            })
            setMovies(response.data.results);
        }

        loadMovies();
        setLoading();

    }, []);

    if (loading) {
        return(
            <div className='loading-page'></div>
        )
    }
    
    return (
        <div className='container'>
            <div className='movies-list'>
                {movies.map((m) => {
                    return (
                        <article key={m.id}>
                            <strong>{m.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${m.poster_path}`} alt={m.title} />
                            <Link to={`/movies/${m.id}`}>acesse</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;