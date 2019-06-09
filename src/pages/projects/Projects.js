import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AnimatedTextBlock from '../../util/component/AnimatedTextBlock';
import ConsoleTextEffect from '../../util/ConsoleTextEffect';
import ExpandingTextButton from '../../util/component/ExpandingTextButton';
import HexBackground from '../../util/component/HexBackground';
import ImageGlitch from '../../util/component/ImageGlitch';
import MenuButton from '../../util/component/MenuButton';
import './Projects.css';

class Projects extends Component {
    constructor(props){
        super(props);
        this.state = {
            changingPage: false,
            transitionComplete: props.transitionComplete,
            index: 0,
            reverse: false,
            descriptionText: ""
        };
        this.loadProjects();
    }

    componentWillMount() {
        this._resize();
    }

    componentDidMount() {
        if (this.props.loaded) this.props.loaded();
        window.addEventListener("resize", this._resize.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this._resize.bind(this));
    }

    componentWillReceiveProps(nextProps){
        if (this.props !== nextProps) {
            this.setState({transitionComplete: nextProps.transitionComplete});
        }
    }

    loadProjects(){
        this.projects = require('./Projects.json');
        this.imageContext = require.context('../../img/projects', true);

        this.projectTitles = [];
        this.projects.forEach((item, index) => {
            this.projectTitles[index] = item.Title;
        });
    }

    loadImages(){
        var images = [];
        if (this.projects[this.state.index].Images[0].includes("youtube")) {
            images = this.projects[this.state.index].Images;
        } else {
            this.projects[this.state.index].Images.forEach((image, index) => {
                images[index] = this.imageContext(this.projects[this.state.index].BaseURL + image, true);
            });
        }
        return images;
    }

    headerOnClick(){
        this.setState({ changingPage: true });
        this.props.changePage("main", "UP");
        window.location.hash = "#main";
    }

    menuOnClick(index){
        this.setState({index: index, reverse: true});
    }

    downloadOnClick() {
        window.open(this.projects[this.state.index].Href, '_blank');
    }

    _resize() {
        if (!this._isRendered()) {
            setTimeout(() => {
                this._checkObjectOverlap();
            }, 1);
            return;
        }
        this._checkObjectOverlap();
    }

    _checkObjectOverlap() {
        //this._checkPosition(this.title, this.menu);
    }

    _checkPosition(targetObj, parentObj) {
        var targetPos = this._getBoundingClientRect(targetObj);
        var parentPos = this._getBoundingClientRect(parentObj);

        console.log(targetPos);
        console.log(parentPos);

        if (!targetPos || !parentPos) return;

        var y = parentPos.y + parentPos.height + parentPos.top;
        if (targetPos.top < y)
            targetPos.y = y;
    }

    _getBoundingClientRect(obj) {
        if (obj.getBoundingClientRect)
            return obj.getBoundingClientRect();
        else if (ReactDOM.findDOMNode(obj))
            return ReactDOM.findDOMNode(obj).getBoundingClientRect();
    }

    _isRendered() {
        return this.header && this.menu && this.title && this.subtitle && this.image && this.download && this.description;
    }

    _render(){
        if (!this.state.transitionComplete) return;

        if (!this.state.changingPage) {
            if (!this.animated){
                var width = window.innerWidth / 2;
                setTimeout(() => { ConsoleTextEffect.AnimateText(this.header.DOM(), "Projects", 35); }, 25);
                setTimeout(() => {
                    this.image.animate();
                }, 25);
                this.animated = true;
            }

            var downloadContent = "";
            if (this.projects[this.state.index].Href !== "") {
                if (this.projects[this.state.index].Href.toLowerCase().includes("github")) {
                    downloadContent = "Github";
                } else {
                    downloadContent = "Download";
                }
            }

            var descriptionText = "";
            setTimeout(() => {
                if (this.state.reverse) {
                    var time = this.description.getAnimationTime();
                    ConsoleTextEffect.AnimateTextReverse(this.title);
                    ConsoleTextEffect.AnimateTextReverse(this.subtitle);
                    ConsoleTextEffect.AnimateTextReverse(this.download.DOM());

                    this.description.setText("");
                    //ConsoleTextEffect.AnimateTextReverse(this.description, 2, true);

                    this.timeout = setTimeout(() => {
                        this.setState({reverse: false});
                    }, time);
                } else {
                    ConsoleTextEffect.AnimateText(this.title, this.projects[this.state.index].Title);
                    ConsoleTextEffect.AnimateText(this.subtitle, this.projects[this.state.index].Subtitle);
                    ConsoleTextEffect.AnimateText(this.download.DOM(), downloadContent);

                    this.description.setText (this.projects[this.state.index].Description);
                    //ConsoleTextEffect.AnimateText(this.description, this.projects[this.state.index].Description, 2, true);
                }
            }, 25);
        }

        return (
            <div className="projects-container">
                <ExpandingTextButton ref={(o) => this.header = o } className="header" content="Projects" targetWidth={width} onClick={() => this.headerOnClick()} />
                <ImageGlitch ref={(o) => this.image = o } images={this.loadImages()} width="640px" height="360px"/>
                <MenuButton ref={(o) => this.menu = o } className="menu" content="Projects Menu" onClick={this.menuOnClick.bind(this)} titles={this.projectTitles} width={144} height={50} />
                <h1 ref={(o) => this.title = o } className="title"> </h1>
                <h4 ref={(o) => this.subtitle = o } className="subtitle"> </h4>
                <ExpandingTextButton ref={(o) => this.download = o } className="download" content={downloadContent} targetWidth={640} onClick={this.downloadOnClick.bind(this)} />
                {/* <p ref={(o) => this.description = o } className="description" /> */}
                <AnimatedTextBlock ref={(o) => this.description = o } className="description" delay={2} />
            </div>
        );
    }

    render(){
        return (
            <div className="projects">
                <HexBackground startInterval={this.state.transitionComplete}/>
                {this._render()}
            </div>
        );
    }
}

export default Projects;
