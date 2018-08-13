import React from 'react';

export const nl2br = (str) => {
    return str.split('\n').map(function(item, key) {
        return (
            <span key={key}>
                {item}
                <br/>
            </span>
        )
    });
}