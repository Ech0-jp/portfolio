import React, { Component } from 'react';
import '../style/BorderTransition.css';

var classNames = require('classnames');

class BorderButton extends Component {
    constructor(props) {
        super(props);
        this.state = { animate: false, active: false };
        this.timeout = this.props.timeout ? this.props.timeout : 25;
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({animate: true});
        }, this.timeout);
    }

    setActive(){
        this.setState({active: true});
    }

    DOM(){
        return this.instance;
    }

    render(){
        var classes = classNames(
            this.props.className,
            'border', {
            'border-transition': this.state.animate,
            'active': this.state.active
        });

        return (
            <button id={this.props.id} className={classes} style={this.props.style}
                onClick={this.props.onClick} ref={(instance) => { this.instance = instance }}>
                {this.props.content}
            </button>
        );
    }
}

export default BorderButton;
