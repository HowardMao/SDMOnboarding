import React, { Component } from 'react';
import axios from 'axios';

class Input extends Component {
    state = {action: ''};

    addGrade = () => {
        const task = { action: this.state.action};

        if(task.action && task.action.length > 0){
            axios.post('/api/grades', task)
                .then((res) => {
                    if(res.data){
                        this.props.getGrades();
                        this.setState({action:''});
                    }
                })
                .catch((err) => console.log(err));
        } else{
            console.log('input field required')
        }
    };

    handleChange = (e) => {
        this.setState({action: e.target.value});
    };

    render(){
        let {action} = this.state;
        return(
            <div>
                <input type="text" onChange={this.handleChange} value={action} />
                <button onClick={this.addGrade}>add Grade</button>
            </div>
        );
    }
}

export default Input;