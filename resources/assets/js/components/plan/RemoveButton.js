import React from 'React';
import { connect } from 'react-redux';


const RemoveButton = ({ onClick, receipt, planId }) => {

    return (
        <i className="fa fa-trash button-remove" aria-hidden="true" onClick={ onClick }></i>
    )
};

export default RemoveButton;
