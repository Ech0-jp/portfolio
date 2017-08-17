import React, { Component } from 'react';
import HexBackground from '../../util/component/HexBackground';
import './Main.css';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        if (this.props.loaded) this.props.loaded();
    }

    render(){
        return (
            <div className="main">
                <HexBackground startInterval={this.props.startInterval}/>
            </div>
        );
    }
}

export default Main;
