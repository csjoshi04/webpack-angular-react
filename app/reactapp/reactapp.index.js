import ReactDOM from 'react-dom'
import React from 'react';
import {HelloComponent} from "./component/hello.component";

export class ReactAppMainComponent extends React.Component{
    render(){
        return(
            <div>
                <HelloComponent/>
            </div>
        )
    }
}

ReactDOM.render(<ReactAppMainComponent/>,document.getElementById('reactApp'))