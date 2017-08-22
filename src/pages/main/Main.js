import React, { Component } from 'react';
import HexBackground from '../../util/component/HexBackground';
import ImageGlitch from '../../util/component/ImageGlitch';
import ExpandingTextButton from '../../util/component/ExpandingTextButton';
import ConsoleTextEffect from '../../util/ConsoleTextEffect';
import './Main.css';

class Main extends Component {
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

    onClick(src){
        console.log("Main onClick()");
        var direction;
        switch (src) {
            case 'projects':
                direction = 'DOWN';
                break;
            case 'contact':
                direction = 'UP';
                break;
            case 'about':
                direction = 'LEFT';
                break;
            case 'resume':
                direction = 'RIGHT';
                break;
            default:

        }
        window.location.hash = "#" + src;
        this.props.changePage(src, direction);
    }

    _render(){
        if (!this.state.transitionComplete) return;
        var images = [
            require('../../img/main/cPlusPlus.jpg'),
            require('../../img/main/cSharp.jpg'),
            require('../../img/main/gameDeveloper.png'),
            require('../../img/main/html-css.jpg'),
            require('../../img/main/js.jpg'),
            require('../../img/main/softwareDeveloper.jpg'),
            require('../../img/main/unityLogo.png')
        ];
        if (!this.animated){
            setTimeout(() => {
                this.refs.image.animate();
            }, 5);
            setTimeout(() => {
                ConsoleTextEffect.AnimateText(this.refs.projects.DOM(), "Projects", 35);
                ConsoleTextEffect.AnimateText(this.refs.contact.DOM(), "Contact", 35);
                ConsoleTextEffect.AnimateText(this.refs.about.DOM(), "About", 35);
                ConsoleTextEffect.AnimateText(this.refs.resume.DOM(), "Resume", 35);
                this.animated = true;
            }, 505);
        }
        return (
            <div className="main-container">
                <ImageGlitch ref="image" images={images} width="750px" height="422px"/>
                <ExpandingTextButton ref="projects" className="projects" content="Projects" targetWidth="750" onClick={() => this.onClick("projects")} />
                <ExpandingTextButton ref="contact" className="contact" content="Contact" targetWidth="750" onClick={() => this.onClick("contact")} />
                <ExpandingTextButton ref="about" className="about" content="About" rotate="90" targetWidth="422" onClick={() => this.onClick("about")} />
                <ExpandingTextButton ref="resume" className="resume" content="Resume" rotate="-90" targetWidth="422" onClick={() => this.onClick("resume")} />
            </div>
        );
    }

    render(){
        return (
            <div className="main">
                <HexBackground startInterval={this.state.transitionComplete}/>
                {this._render()}
            </div>
        );
    }
}

export default Main;
