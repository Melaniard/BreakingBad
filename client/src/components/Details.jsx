import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail } from "../actions";

export default function Detail(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        useDispatch(getDetail(props.match.params.id));
    }, [dispatch]);

    const myCharacter = useSelector(state => state.detail);

    return (
        <div>
            {
                myCharacter.length > 0 ?
                <div>
                    <h1>Soy: {myCharacter[0].name}</h1>
                        <img src=
                            {
                                myCharacter[0].img ? myCharacter[0].img 
                                : myCharacter[0].image
                            }
                        />
                    <h3>Status: {myCharacter[0].status}</h3>
                    <p>Birthday: {myCharacter[0].birthday}</p>
                    <p>Occupation: {myCharacter[0].occupation}</p>
                </div> : <h1>Loading...</h1>
            }
        </div>
    )
};