import './Header.css';
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header>
            <Link className='logo' to="/">YourMovies</Link>
            <Link className='favs' to="/favs">Favoritos</Link>
        </header>
    )
}

export default Header;