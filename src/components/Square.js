import React from 'react';
import PropTypes from 'prop-types';

const Square = props => (
    <button className={`${props.winnerClass} square`} onClick={props.onClick}>
        {props.value === 1 ? 'X' : props.value === 0 ? 'O' : ''}
    </button>
);

Square.propTypes = {
    winnerClass: PropTypes.string,
};

export default Square;
