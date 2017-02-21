import React from 'react'

const PlanHeader = (props) => {
    const users = props.planData.users;

    let userNodes = users.map(function(user) {
       return (
            <li style={{ background: user.color }} key={user.id}>{user.name}</li>
        );
    });
    return (
        <ul className="user-list col-xs-6">
            { userNodes }
        </ul>
    );
}

export default PlanHeader
