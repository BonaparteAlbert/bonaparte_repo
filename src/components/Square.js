import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
Square.propTypes = {
    value: PropTypes.string,
    class: PropTypes.string,
    // onclickfunc: PropTypes.isfunction,
};

function Square(props) {
    return (
        <button
            className={props.class}
            onClick={props.onClickHandle}
            id={props.id}>
            {props.value}

        </button >
    );
}

export default Square;