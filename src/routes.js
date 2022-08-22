import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Header from './components/Header';
import Error from './pages/errors';
import Favs from './pages/Favs';

function RouterApp(){
    return(
        <BrowserRouter>
        <Header/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/movies/:id' element={<Movies/>}/>
                <Route path='/favs' element={<Favs/>}/>
                <Route path='*' element={<Error/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RouterApp;