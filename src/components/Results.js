import React from 'react';

const Results = ( {results} ) => {
    if (results.length === 0) {
        return (
            <div>
                No results found
            </div>
        )
    }
    if (results.length > 10) {
        return (
            <div>
                Too many results. Please be more specific.
            </div>
        )
    }
    return (
        <div>
            Results: {results.length}
            {results.map(country => <p key={country.name}>{country.name}</p>)}
        </div>
    );
}

export default Results;