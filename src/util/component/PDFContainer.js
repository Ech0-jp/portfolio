import React, { Component } from 'react';
import BorderButton from './BorderButton';
import ConsoleTextEffect from '../ConsoleTextEffect';
import '../style/PDFContainer.css';

var classNames = require('classnames');

class PDFContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
            showPDF: false,
            width: this.props.btnWidth,
            height: 0
        };
    }

    componentDidMount(){
        setTimeout(() => {
            ConsoleTextEffect.AnimateText(this.refs.button.DOM(), this.props.btnContent, 35);
            this.refs.button.setActive();
        }, 500);
        if (this.props.open) {
            setTimeout(() => {
                this.open();
            }, 500)
        }
    }

    componentWillUnmount(){
        clearTimeout(this.timeout);
    }

    open(){
        this.setState({
            opened: true,
            height: this.props.height,
            width: this.props.btnWidth
        });
        this.timeout = setTimeout(() => {
            this.setState({width: this.props.width});
            setTimeout(() => {
                this.setState({showPDF: true});
            }, 250);
        }, 250);
    }

    close(){
        this.setState({width: this.props.btnWidth, showPDF: false});
        this.timeout = setTimeout(() => {
            this.setState({height: 0});
            setTimeout(() => {
                this.setState({opened: false});
            }, 250);
        }, 250);
    }

    buttonStyle(){
        if (this.props.buttonAlign === "RIGHT") {
            return {
                width: this.props.btnWidth,
                height: this.props.btnHeight,
                left: this.props.width - this.props.btnWidth + 4
            }
        }
        return {
            width: this.props.btnWidth,
            height: this.props.btnHeight,
            left: 0
        }
    }

    pdfStyle(){
        if (this.state.opened) {
            return {
                width: this.state.width,
                height: this.state.height,
                top: this.props.btnHeight - 2,
                left: this.state.width !== this.props.width && this.props.buttonAlign === "RIGHT" ? this.props.width - this.props.btnWidth : 0
            }
        }
        return {
            width: this.state.width,
            height: this.state.height,
            top: this.props.btnHeight - 2,
            border: 'none'
        }
    }

    render(){
        var style = this.pdfStyle();
        var btnStyle = this.buttonStyle();
        var pdfStyle = {
            width: this.state.width,
            height: this.state.height
        }
        var classes = classNames(
            'button', {
            'button-active': this.state.opened
        });
        var pdfClass = classNames(
            'pdf', {
                'pdf-active': this.state.showPDF
            }
        )

        return (
            <div className={this.props.className + " pdf-container"}>
                <BorderButton ref="button" className={classes} style={btnStyle} onClick={this.props.onClick} />
                <div className="pdf-background" style={style}>
                    <object className={pdfClass} style={pdfStyle} type="application/pdf" data={this.props.content + "?#zoom=85&scrollbar=1&toolbar=0&navpanes=0"}>
                        <p>There was a problem displaying the example resume PDF. Please contact me to view the full resume.</p>
                    </object>
                </div>
            </div>
        );
    }
}

export default PDFContainer;
