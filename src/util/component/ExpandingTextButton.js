import React, { Component } from 'react';
import '../style/ExpandingTextButton.css';

var Radium = require('radium');

class ExpandingTextButton extends Component {
    constructor(props) {
        super(props);
        this.state = { hover: false };
        this.letterSpacing = props.targetWidth / (props.content.length + 1);
    }

    DOM(){
        return this.refs.dom;
    }

    hover(mouseEnter){
        this.setState({hover: mouseEnter});
    }

    marginTop(){
        return this.props.rotate < 0 ? -this.letterSpacing / 1.25 + "px" : this.letterSpacing / this.props.content.length + "px";
    }

    render(){
        var style = {
            transform: 'rotateZ(' + this.props.rotate + 'deg)',
            ':hover': {
                letterSpacing: this.letterSpacing,
                marginLeft: !this.props.rotate ? this.letterSpacing / 2 + "px" : null,
                marginRight: !this.props.rotate ? this.letterSpacing / 2 + "px" : null,
                marginTop: this.props.rotate ? this.marginTop() : null,
                marginBottom: this.props.rotate ? this.marginTop() : null
            }
        }
        return (
            <a ref="dom" className={"expanding-text-button " + this.props.className} onClick={this.props.onClick} style={[style, this.props.style]} onMouseEnter={() => {this.hover(true)}} onMouseLeave={() => {this.hover(false)}}> </a>
        );
    }
}

export default Radium(ExpandingTextButton);
