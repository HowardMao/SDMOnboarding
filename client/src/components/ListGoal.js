import React from 'react';

const ListGoal = ({goals}) => {
    return (
        <ul>
            {goals && goals.length > 0 ? (
                goals.map((goal) => {
                    return (
                        <li key={goal._id}>
                            {goal.goal}
                        </li>
                    );
                })
            ) : (
                <li>No Goals left</li>
            )}
        </ul>
    );
};

export default ListGoal;