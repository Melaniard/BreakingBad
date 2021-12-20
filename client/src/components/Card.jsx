import React from 'react';

export default function Card({ name, image, nickname }) {
    return (
        <div className='card'>
            <h3>{name}</h3>
            <p>{nickname}</p>
            <img src={image} alt="img not supported" width="200px" height="250px"/>
        </div>
    );
};