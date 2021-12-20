import React from 'react';

export default function Paginate({ charactersPerPage, allCharacters, paginate }) {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(allCharacters / charactersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <div className='paginate'>
                {
                    pageNumbers &&
                    pageNumbers.map(number => (
                        <button
                            key={number}
                            className={number}
                            onClick={() => paginate(number)}>
                            {number}
                        </button>
                    ))
                }
            </div>
        </nav>
    )
};