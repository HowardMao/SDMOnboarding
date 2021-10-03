import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const ListActivity = ({ allActivities, myActivities }) => {
    return (
        <div>
            <h2>Activities</h2>
            <ul>
                {allActivities && allActivities.length > 0 ? (
                    allActivities.map((activity) => {
                        return (
                            <li key={activity._id}>
                                <label style={{ color: "#ffffff", paddingLeft: "10px" }} class="form-check-label" for="flexRadioDefault1">
                                    {activity.activity}
                                </label>
                            </li>
                        );
                    })
                ) : (
                    <li>No goals are selected</li>
                )}
            </ul>
        </div>
    );
};

export default ListActivity;
