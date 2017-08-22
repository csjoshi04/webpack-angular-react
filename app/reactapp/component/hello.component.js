import React, {Component} from 'react'

export class HelloComponent extends Component{
    constructor(props){
        super(props);
        this.state = {name: "React App works with your superbuild",myName:""}
    }
    render(){
        return (
            <div className="form-group">
                <h3>
                    {this.state.name}
                </h3>
                <input type="text"
                       placeholder="Type your name here"
                       className="form-control"
                       onChange={event=>this.setState({myName : event.target.value})}
                       value={this.state.myName}/>
                {/*Controlled component. Value of the input doesn't change when user types in.
                Component refreshes when user start typing, now when component re-renders,
                state gets new value and we see new value.*/}
                My name is : {this.state.myName}
            </div>
        )
    }
}