// import { response } from 'express';
import React, { useEffect, userState, useState } from 'react'
import { FaCode } from "react-icons/fa";
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from './Sections/MainImage';

function LandingPage() {

    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);

    useEffect(()=> {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            // useState 에 Movies 추가
            setMovies([response.results])
            setMainMovieImage(response.results[0])
        })
        
        
    }, []);


    return (
        <div style={{width: '100%', margin: '0'}}>
            {/*Main Image*/}

            {/*functional component, prop 사용 */}
            {/*Cannot read properties of null (reading 'backdrop_path') */}
            {/*MainMovieImage를 설정하기 전에 페이지가 랜더되서 그럼 MainMovieImage && 이걸로 MainMovieImage불러오면 실행되게*/}

            {MainMovieImage &&
                <MainImage 
                image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                title={MainMovieImage.original_title}
                text={MainMovieImage.overview}
                /> 
            }
            <div style={{width: '85%', marin: '1rem auto'}}>
                <h2>Movies by latest</h2>
                <hr />

                { /*Movie Grid Cards*/}
            </div>

            <div style={{display: 'felx', justifyContent: 'center' }}>
                <button>Load More</button>
            </div>
        </div>
    )
}

export default LandingPage
