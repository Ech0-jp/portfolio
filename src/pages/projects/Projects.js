import React, { Component } from 'react';
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
            transitionComplete: props.transitionComplete,
            index: 0,
            reverse: false
        };
        this.loadProjects();
    }

    componentDidMount(){
        if (this.props.loaded) this.props.loaded();
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
        this.props.changePage("main", "UP");
        window.location.hash = "#main";
    }

    menuOnClick(index){
        this.setState({index: index, reverse: true});
    }

    downloadOnClick() {
        window.open(this.projects[this.state.index].Href, '_blank');
    }

    _render(){
        if (!this.state.transitionComplete) return;

        if (!this.animated){
            var width = window.innerWidth / 2;
            setTimeout(() => { ConsoleTextEffect.AnimateText(this.refs.header.DOM(), "Projects", 35); }, 25);
            setTimeout(() => {
                this.refs.image.animate();
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
        setTimeout(() => {
            if (this.state.reverse) {
                var time = this.refs.description.innerHTML.length * 4;
                ConsoleTextEffect.AnimateTextReverse(this.refs.title);
                ConsoleTextEffect.AnimateTextReverse(this.refs.subtitle);
                ConsoleTextEffect.AnimateTextReverse(this.refs.download.DOM());
                ConsoleTextEffect.AnimateTextReverse(this.refs.description, 2, true);
                this.timeout = setTimeout(() => {
                    this.setState({reverse: false});
                }, time);
            } else {
                ConsoleTextEffect.AnimateText(this.refs.title, this.projects[this.state.index].Title);
                ConsoleTextEffect.AnimateText(this.refs.subtitle, this.projects[this.state.index].Subtitle);
                ConsoleTextEffect.AnimateText(this.refs.download.DOM(), downloadContent);
                ConsoleTextEffect.AnimateText(this.refs.description, this.projects[this.state.index].Description, 2, true);
            }
        }, 25);

        return (
            <div className="projects-container">
                <ExpandingTextButton ref="header" className="header" content="Projects" targetWidth={width} onClick={() => this.headerOnClick()} />
                <ImageGlitch ref="image" images={this.loadImages()} width="640px" height="360px"/>
                <MenuButton className="menu" content="Projects Menu" onClick={this.menuOnClick.bind(this)} titles={this.projectTitles} width={144} height={50} />
                <h1 ref="title" className="title"> </h1>
                <h4 ref="subtitle" className="subtitle"> </h4>
                <ExpandingTextButton ref="download" className="download" content={downloadContent} targetWidth={640} onClick={this.downloadOnClick.bind(this)} />
                <p ref="description" className="description" />
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
