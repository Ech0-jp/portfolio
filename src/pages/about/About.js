import React, { Component } from 'react';
import HexBackground from '../../util/component/HexBackground';
import ExpandingTextButton from '../../util/component/ExpandingTextButton';
import ConsoleTextEffect from '../../util/ConsoleTextEffect';
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
        window.location.hash = "#" + "main";
        this.props.changePage("main", "RIGHT");
    }

    _render(){
        if (!this.state.transitionComplete) return;

        var text = "Hi, my name is Robert Andrew Gray, I go by the name \"Andrew\". I am a fresh graduate from George Brown College in T127 - Computer Programming Analyst. Originally, I went to GBC to become a Game Programmer. However, at the end of my second year in T163 Game Programming, I decided that it would be best to broaden my scope. So I transferred into year 2 of T127 so I could have more opportunities.<br><br>" +
        "Throughout my two years spent as a Game Programmer, I recieved an internship with a subsidiary of 13AM Games. It was extermely fun and very challenging as we were working with a new technology called the \"Myo Armband\". At first, we were a team of 8; the Lead Developer, two 2nd year student programmers, two 3rd year student programmers, 2 artists and a sound developer. In the first 6 months, I helped the other 2nd year student Steve develope gameplay mechanics with the Myo Armband as well as develope the User Interface for the game, while the 3rd years handled the devlopment of the Artificial Intelligence. At the end of those 6 months, the 3rd programmers graduated and left the team. In which, I took over for the AI developement while finishing up what was left for the UI. Unfortunatley, at the end of my second year, when I transferred courses and had to say goodbye. From there, I gained inspiration to learn more about the new industry I was branching into and started to work on the desktop application called \"MyAnimeViewer\" when I could. Eventually, in my final year of T127, MyAnimeViewer transferred over as a project for a class called Capstone. MyAnimeViewer is now out in early alpha as it functions, but is missing a lot of the components the final product will contain.<br><br>" +
        "Although my desire to flourish in the Game Industry burns strong. I am beyond happy working in any field that involves programming. With my goal being to eventually receive a Masters Degree in Computer Sciene and climb the corporate ladder and/or help with the latest developments of Artificial Intelligence or Virtual Reality.";
        var width = window.innerHeight / 2;
        var style = this.style(width);

        if (!this.animated) {
            setTimeout(() => {
                ConsoleTextEffect.AnimateText(this.refs.header.DOM(), "About", 35);
                ConsoleTextEffect.AnimateText(this.refs.text, text, true, 5);
            }, 5);
            this.animated = true;
        }

        return (
            <div className="about-container">
                <ExpandingTextButton ref="header" className="header" style={style} rotate="90" content="Contact" targetWidth={width} onClick={() => this.onClick()} />
                <p className="text" ref="text"></p>
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
