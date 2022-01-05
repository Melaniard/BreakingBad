import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postCharacter, getOccupations } from '../actions';
import { useDispatch, useSelector } from 'react-redux';

function validateState(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Name is required';
    } else if (!input.nickname) {
        errors.nickname = 'Nickname is required';
    } else if (!input.birthday) {
        errors.birthday = 'Birthday is required';
    } else if (!input.status) {
        errors.status = 'Status is required';
    } else if (!input.occupation) {
        errors.occupation = 'Occupation is required';
    }
    return errors;
}

export default function CharacterCreate() {

    const dispatch = useDispatch();
    const history = useHistory();
    const occupations = useSelector((state) => state.occupations);
    const [errors, setErrors] = useState({});
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
        setErrors(validateState({
            ...input,
            [e.target.name]: e.target.value
        }));
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

    function handleDelete(el){
        setInput({
            ...input,
            occupation: input.occupation.filter(occ => occ !== el)
        });
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
                    {
                        errors.name && ( <p className='error'>{errors.name}</p> )
                    }
                </div>
                <div>
                    <label>Nickname:</label>
                    <input
                        type='text'
                        value={input.nickname}
                        name='nickname'
                        onChange={e => handleChange(e)}
                    />
                    {
                        errors.nickname && ( <p className='error'>{errors.nickname}</p> )
                    }
                </div>
                <div>
                    <label>Birthday:</label>
                    <input
                        type='text'
                        value={input.birthday}
                        name='birthday'
                        onChange={e => handleChange(e)}
                    />
                    {
                        errors.birthday && ( <p className='error'>{errors.birthday}</p> )
                    }
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
                    <label>
                        <input
                            type='checkbox'
                            name='Deceased'
                            value='Deceased'
                            onChange={e => handleCheck(e)}
                        />
                        Deceased
                    </label>
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
                </select>
                <ul>
                    <li>{input.occupation.map(o => o + " | ")}</li>
                </ul>
                <button type='submit'>Character Created</button>
            </form>
            {
                input.occupation.map(el => 
                 <div className='divOcc'>
                    <p>{el}</p>
                    <button className='buttonX' onclick={()=> handleDelete(el)}>x</button>
                 </div>
                )
            }
        </div>
    );
};