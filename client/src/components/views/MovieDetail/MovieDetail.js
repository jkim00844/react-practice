import React, { useEffect, useState } from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';

// http://localhost:3000/movie/580489

function MovieDetail(props) {

    let movieId = props.match.params.movieId

    const [Moive, setMoive] = useState([])

    useEffect(()=>{

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        // console.log(props.match);
        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMoive(response)
            })
    }, [])

    return (
        <div>

            {/*Header */}
            <MainImage 
                image={`${IMAGE_BASE_URL}w1280${Moive.backdrop_path}`}
                title={Moive.original_title}
                text={Moive.overview}
            /> 

            {/*Body */}
            <div style={{ width: '85%', margin: '1rem auto'}}>
                {/*Movie Info */}
                <MovieInfo
                    movie = {Moive}
                />
                <br />

                {/*Actors Grid */}
                <div style={{ display: 'flex', justifyContent: 'center', margin:'2rem' }}>
                    <button>Toggle Actor view</button>
                </div>
            </div>
            
        </div>
    )
}

export default MovieDetail
