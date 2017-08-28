import React, { Component } from 'react';
import ConsoleTextEffect from '../../util/ConsoleTextEffect';
import ExpandingTextButton from '../../util/component/ExpandingTextButton';
import HexBackground from '../../util/component/HexBackground';
import PDFContainer from '../../util/component/PDFContainer';
import './Resume.css';

class Resume extends Component {
    constructor(props){
        super(props);
        this.state = {
            transitionComplete: props.transitionComplete,
            resumeOpen: true,
            coverLetterOpen: false
        };
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
        var s = "Resume".length;
        var ls = 5;
        var fs = 25;
        var w = (s * fs) + (s * ls) + ls;
        var half = (w - ls - fs/2)/2

        var tls = width / (s + 1);
        var tw = (s * fs) + (s * tls);
        var thalf = (tw - tls - fs/2)/2;
        return {
            transform: 'translateY(' + half/2 + 'px) rotateZ(-90deg)',
            ':hover': {
                top: thalf + width + 'px'
            }
        }
    }

    onClick(){
        window.location.hash = "#" + "main";
        this.props.changePage("main", "LEFT");
    }

    onPdfClick(container){
        if (container === 'resume'){
            if (this.state.resumeOpen) return;
            this.setState({resumeOpen: true, coverLetterOpen: false});
            this.refs.cvContainer.close();
            setTimeout(() => { this.refs.resumeContainer.open() }, 500);
        } else if (container === 'cover-letter') {
            if (this.state.coverLetterOpen) return;
            this.setState({resumeOpen: false, coverLetterOpen: true});
            this.refs.resumeContainer.close();
            setTimeout(() => { this.refs.cvContainer.open() }, 500);
        }
    }

    _render(){
        if (!this.state.transitionComplete) return;

        var width = window.innerHeight / 2;
        var style = this.style(width);

        if (!this.animated) {
            setTimeout(() => {
                ConsoleTextEffect.AnimateText(this.refs.header.DOM(), "Resume", 35);
            }, 5);
            this.animated = true;
        }

        return (
            <div className="resume-container">
                <ExpandingTextButton ref="header" className="header" style={style} rotate="-90" content="Resume" targetWidth={width} onClick={() => this.onClick()} />
                <PDFContainer ref="resumeContainer" className="resume-pdf-container"
                    buttonContent="Resume" buttonAlign="LEFT" btnWidth={144} btnHeight={50}
                    width={720} height={750} onClick={() => { this.onPdfClick('resume') }}
                   open={true} btnContent="Resume" content={require('../../pdf/AndrewGray_Resume_Example.pdf')} />
                <PDFContainer ref="cvContainer" className="cv-pdf-container"
                    buttonContent="Cover Letter" buttonAlign="RIGHT" btnWidth={144} btnHeight={50}
                    width={720} height={750} onClick={() => { this.onPdfClick('cover-letter') }}
                   btnContent="Cover Letter" content={require('../../pdf/AndrewGray_CoverLetter_Example.pdf')} />
            </div>
        );
    }

    render(){
        return (
            <div className="resume">
                <HexBackground startInterval={this.state.transitionComplete}/>
                {this._render()}
            </div>
        );
    }
}

export default Resume;
