import React, { Component } from 'react';
import AnimatedTextBlock from '../../util/component/AnimatedTextBlock';
import ConsoleTextEffect from '../../util/ConsoleTextEffect';
import ExpandingTextButton from '../../util/component/ExpandingTextButton';
import HexBackground from '../../util/component/HexBackground';
import './About.css';

var Radium = require('radium');

class About extends Component {
    constructor(props){
        super(props);
        this.state = {transitionComplete: props.transitionComplete};
    }

    componentDidMount(){
        if (this.props.loaded) this.props.loaded();
    }

    componentWillReceiveProps(nextProps){
        if (this.props !== nextProps) {
            this.setState({transitionComplete: nextProps.transitionComplete});
        }
    }

    style(width){
        var s = "About".length;
        var ls = 5;
        var fs = 25;
        var w = (s * fs) + (s * ls) + ls;
        var half = (w - ls - fs/2)/2

        var tls = width / (s + 1);
        var tw = (s * fs) + (s * tls);
        var thalf = (tw - tls - fs/2)/2;
        return {
            transform: 'translateY(' + -half + 'px) rotateZ(90deg)',
            ':hover': {
                top: thalf + tw/4 + 'px'
            }
        }
    }

    onClick(){
        window.location.hash = "#main";
        this.props.changePage("main", "RIGHT");
    }

    _render(){
        if (!this.state.transitionComplete) return;

        var text = "Hi there! My name is Andrew and I specialize in computer programming. Some of my hobbies include Gaming, Snowboarding, Personal Fitness and Hiking. Personal Fitness and Hiking are hobbies I have recently begun to pursue.<br><br>"
						+ "I graduated from George Brown College in the year of 2017 with a desire to make an impact on the industry by assisting in the development of innovative and cutting edge technology. I started this process at the beginning of 2018 by acquiring a position with Trilogen Technologies where I have gained invaluable experience.<br><br>"
						+ "My quarterly responsibilities consist of creation of FSDs, development of requirements on the full stack alongside performing unit test cases, and assisting in the deployment process. Intermittently, throughout the quarterly cycle, I am tasked with debugging and the resolution of issues that arise on the production environment. At the end of each development cycle, I am responsible for Security Quality Review of my peers and vulnerability management with tools such as ThreadFix and Fortify to ensure the code which is being deployed is always safe and secure.<br><br>"
						+ "Upon completion of each quarterly, patch or emergency release I have been tasked with ensuring the approval and signing off of all security related items. My involvement in this process consists of producing Security Peer Review Documentation, a Fortify Static Code Analysis file, and remediation of any and all Severity 1-4 vulnerabilities. In the finalization of these documents, I then work with the EIS (Enterprise Information Security) team for final approval and sign off so the code can be pushed to production.<br><br>"
						+ "My acquired knowledge and experience has been very beneficial to the company and myself and I look forward to obtaining new abilities and accomplishments as I further myself within the industry.";
						
        var width = window.innerHeight / 2;
        var style = this.style(width);

        if (!this.animated) {
            setTimeout(() => {
                ConsoleTextEffect.AnimateText(this.refs.header.DOM(), "About", 35);
            }, 5);
            this.animated = true;
        }

        return (
            <div className="about-container">
                <ExpandingTextButton ref="header" className="header" style={style} rotate="90" content="Contact" targetWidth={width} onClick={() => this.onClick()} />
                <AnimatedTextBlock className="text-block" text={text} />
            </div>
        );
    }

    render(){
        return (
            <div className="about">
                <HexBackground startInterval={this.state.transitionComplete}/>
                {this._render()}
            </div>
        );
    }
}

export default Radium(About);
