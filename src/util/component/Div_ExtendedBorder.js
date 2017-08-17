import React, { Component } from 'react';
import '../style/Div_ExtendedBorder.css';

class Div_ExtendedBorder extends Component {
    constructor(props) {
        super(props);
        this.state = { animate: false };
        this.timeout = this.props.timeout ? this.props.timeout : 25;
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({ animate: true });
        }, this.timeout);
    }

    render(){
        return(
            <div className="div-extended-border">
                <div className={this.state.animate ? 'background background-animate' : 'background'} />
                <div className={this.state.animate ? 'border-horizontal horizontal-animate' : 'border-horizontal'} />
                <div className={this.state.animate ? 'border-vertical vertical-animate' : 'border-vertical'} />
            </div>
        );
    }
}

export default Div_ExtendedBorder;
