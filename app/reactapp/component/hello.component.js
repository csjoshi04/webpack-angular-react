import React, {Component} from 'react'

export class HelloComponent extends Component{
    constructor(props){
        super(props);
        this.state = {"name": "React App works with your superbuild"}
    }
    render(){
        return (
            <div className="form-group">
                <h3>
                    {this.state.name}
                </h3>
                <input type="text" placeholder="Type your name here"
                       className="form-control" onChange={event=>this.setState({myName : event.target.value})} />
                My name is : {this.state.myName}
            </div>
        )
    }
}