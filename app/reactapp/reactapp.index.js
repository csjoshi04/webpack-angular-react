import ReactDOM from 'react-dom'
import React from 'react';

export class ReactAppMainComponent extends React.Component{
    render(){
        return(
            <div style={{'color':'red'}}>
                Hello React
            </div>
        )
    }
}

ReactDOM.render(<ReactAppMainComponent/>,document.getElementById('reactApp'))