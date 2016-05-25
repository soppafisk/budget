import React from 'react'

const FormattedDate = (props) => {
    let date = new Date(props.date);
    let format = props.format;
    let formatdate = function() {
        
    }
    return (
        <div>{date.toLocaleString().substring(0,10)}</div>
    );
}

export default FormattedDate
