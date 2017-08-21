import React, { Component } from 'react';
import HexBackground from '../../util/component/HexBackground';
import DivExtendedBorder from '../../util/component/Div_ExtendedBorder';
import './Contact.css'

class Contact extends Component {
    componentDidMount(){
        if (this.props.loaded) this.props.loaded();
    }

    _render(){
        if (!this.props.transitionComplete) return;
        return (
            <div className="contact-container">
                <DivExtendedBorder width={375} height={460} />
            </div>
        );
    }

    render(){
        return (
            <div className="contact">
                <HexBackground startInterval={this.props.transitionComplete}/>
                {this._render()}
            </div>
        );
    }
}

export default Contact;
