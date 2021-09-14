import React from 'react';

const ListGrade = ({grades, deleteGrade}) => {
    return (
        <ul>
            {grades && grades.length > 0 ? (
                grades.map((grade) => {
                    return (
                        <li key={grade._id} onClick={() => deleteGrade(grade._id)}>
                            {grade._id}
                        </li>
                    );
                })
            ) : (
                <li>No Grades left</li>
            )}
        </ul>
    );
};

export default ListGrade;