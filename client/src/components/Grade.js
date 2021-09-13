import React, { Component } from 'react';
import axios from 'axios';
import Input from './Input';
import ListGrade from './ListGrade';

class Grade extends Component{
    state = {
        grades: []
    };

    componentDidMount(){
        this.getGrades();
    }

    getGrades = () => {
        axios.get('/api/grades')
            .then((res) => {
                if(res.data) {
                    this.setState({ grades: res.data })
                }})
            .catch((err) => console.log(err));
    };

    deleteGrade = (id) => {
        axios.delete(`/api/grades/${id}`)
            .then((res) => {
                if(res.data){
                    this.getGrades();
                }
            })
            .catch((err) => console.log(err));
    };

    render() {
        let {grades} = this.state;

        return(
            <div>
                <h1>My Grades</h1>
                <Input getGrades={this.getGrades}/>
                <ListGrade grades={grades} deleteGrade={this.deleteGrade}/>
            </div>
        );
    }
}

export default Grade;