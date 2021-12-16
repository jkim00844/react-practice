import React from 'react'
import { Col } from 'antd';

export default function GridCards(props) {


    if(props.landingPage){
    return (
        // 24 사아즈
        // 4개 보일때 6
        // 3개 보일때 8
  
        <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative'}}>
                <a href={`/movie/${props.movieId}`}>
                    <img style ={{width: '100%', height: '320px'}} src={props.image} alt={props.movieName}/>
                </a>
            </div>
        
        </Col>
    )}else{
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative'}}>
                    <img style ={{width: '100%', height: '320px'}} src={props.image} alt={props.characterName}/>
                </div>
            
            </Col>
        )
    }
}