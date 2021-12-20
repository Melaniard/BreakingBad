import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postCharacter, getOccupations } from '../actions';
import { useDispatch, useSelector } from 'react-redux';

export default function CharacterCreate() {

    const dispatch = useDispatch();
    const history = useHistory();
    const occupations = useSelector((state) => state.occupations);
    const [input, setInput] = useState({
        name: '',
        nickname: '',
        birthday: '',
        status: '',
        occupation: []
    });
      
    // Maneja los cambios en los inputs.
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }; 
    // Maneja la seleccion del checkbox de Status:
    function handleCheck(e) {
        if (e.target.checked) {
            setInput({
                ...input,
                status: e.target.value
            });
        };
    };

    // Maneja la seleccion de las ocupaciones:
    function handleSelect(e) {
        setInput({
            ...input,
            occupation: [
                ...input.occupation,
                e.target.value
            ]
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postCharacter(input))
        alert("Character created successfully!")
        setInput({
            name: '',
            nickname: '',
            birthday: '',
            status: '',
            occupation: []
        });
        history.push('/home')
    };

    useEffect(() => {
        dispatch(getOccupations());
    }, [dispatch])

    return (
        <div>
            <Link to='/home'>
                <button>Go home!</button>
            </Link>
            <h1>Create your character</h1>
            <form onSubmit={e => { handleSubmit(e) }}>
                <div>
                    <label>Name:</label>
                    <input
                        type='text'
                        value={input.name}
                        name='name'
                        onChange={e => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Nickname:</label>
                    <input
                        type='text'
                        value={input.nickname}
                        name='nickname'
                        onChange={e => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Birthday:</label>
                    <input
                        type='text'
                        value={input.birthday}
                        name='birthday'
                        onChange={e => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type='text'
                        value={input.image}
                        name='image'
                        onChange={e => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <label>
                        <input
                            type='checkbox'
                            name='Alive'
                            value='Alive'
                            onChange={e => handleCheck(e)}
                        />
                        Alive
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type='checkbox'
                            name='Deceased'
                            value='Deceased'
                            onChange={e => handleCheck(e)}
                        />
                        Deceased
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type='checkbox'
                            name='Unknown'
                            value='Unknown'
                            onChange={e => handleCheck(e)}
                        />
                        Unknown
                    </label>
                </div>
                <select onChange={e => handleSelect(e)}>
                    {
                        occupations.map((occ) => (
                            <option value={occ.name}>{occ.name}</option>
                        ))
                    }
                    <ul>
                        <li>{input.occupation.map(o => o + "| ")}</li>
                    </ul>
                </select>
                <button type='submit'>Character Created</button>
            </form>
        </div>
    );
};