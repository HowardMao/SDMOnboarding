import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const ListActivity = ({ allActivities, myActivities }) => {
    return (
        <div>
            <h2>Activities</h2>
            <ul>
                {myActivities && myActivities.length > 0 ? (
                    myActivities.map((activity) => {
                        return (
                            <li key={activity._id}>
                                <label style={{ color: "#ffffff", paddingLeft: "10px" }} class="form-check-label" for="flexRadioDefault1">
                                    {activity.activity}
                                </label>
                            </li>
                        );
                    })
                ) : (
                    <li style={{ color: "#ffffff", paddingLeft: "10px" }} >No goals are selected</li>
                )}
            </ul>
        </div>
    );
};

export default ListActivity;
