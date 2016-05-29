import React from 'React';
import { connect } from 'react-redux';


const RemoveButton = ({ onClick, receipt, planId }) => {

    return (
        <button className="button button-remove" onClick={ onClick }>
            x
        </button>
    )
};

export default RemoveButton;
