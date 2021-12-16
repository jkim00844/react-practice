import React, { useEffect, useState } from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCard';
import { Row } from 'antd';

// http://localhost:3000/movie/580489

function MovieDetail(props) {

    let movieId = props.match.params.movieId

    const [Moive, setMoive] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    useEffect(()=>{

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        // console.log(props.match);
        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                // console.log(response)
                setMoive(response)
            })
            
        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                console.log('responseforcrew', response.cast)
                setCasts(response.cast)
            })
    }, [])

    const toggleActorView= () => {
        setActorToggle(!ActorToggle)
    }
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
                    <button onClick={toggleActorView}>Toggle Actor view</button>
                </div>

                {/* ActorToggle true 일때만 배우 이미지 보여지게함. */}
                {ActorToggle && 

                    <Row gutter={[16, 16]} >

                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    image={cast.profile_path ?
                                        `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    characterName={cast.name}
                                />
                            </React.Fragment>
                        ))}

                    </Row>  
                }

            </div>

        </div>
    )
}

export default MovieDetail
