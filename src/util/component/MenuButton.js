import React, { Component } from 'react';
import BorderButton from './BorderButton';
import ConsoleTextEffect from '../ConsoleTextEffect';
import '../style/MenuButton.css';

var classNames = require('classnames');

class MenuButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
            width: this.props.width,
            height: 0,
            border: 'none',
            transitionComplete: true
        }
        this.targetWidth = props.titles.length * props.width;
    }

    componentDidMount(){
        setTimeout(() => {
            ConsoleTextEffect.AnimateText(this.refs.button.DOM(), this.props.content, 35);
            this.refs.button.setActive();
        }, 500);
    }

    onClick(){
        var opened = !this.state.opened;
        this.setState({
            opened: opened
        });
        if (opened) {
            this.open();
        } else {
            this.close();
        }
    }

    open(){
        this.setState({
            height: this.props.height,
            border: '2px solid aqua',
            transitionComplete: false
        });
        this.timeout = setTimeout(() => {
            this.setState({width: this.targetWidth});
            setTimeout(() => {
                this.setState({transitionComplete: true});
            }, 250)
        }, 250);
    }

    close(){
        this.setState({
            width: this.props.width,
            transitionComplete: false
        });
        this.timeout = setTimeout(() => {
            this.setState({height: 0});
            setTimeout(() => {
                this.setState({
                    border: 'none',
                    transitionComplete: true
                });
            }, 250);
        }, 250);
    }

    onMenuItemClick(index) {
        this.props.onClick(index);
        this.onClick();
    }

    menuOptions(){
        if (!this.state.opened || !this.state.transitionComplete) return;

        var style = {
            width: this.props.width,
            height: this.props.height
        }

        return (
            this.props.titles.map((title, index) => {
                return <button key={title} className="button-menu-options-item" style={style} onClick={() => this.onMenuItemClick(index)}>{title}</button>
            })
        );
    }

    render(){
        var borderButtonStyle = {
            width: this.props.width,
            height: this.props.height
        }
        var dropDownMenuStyle = {
            width: this.state.width,
            height: this.state.height,
            top: this.props.height - 2,
            border: this.state.border
        }
        var classes = classNames(
            'button', {
                'button-active': this.state.opened || (!this.state.opened && !this.state.transitionComplete)
            }
        );

        return (
            <div className={this.props.className + " menu-button"}>
                <BorderButton ref="button" className={classes} style={borderButtonStyle} onClick={this.onClick.bind(this)}  />
                <div className="button-menu-options" style={dropDownMenuStyle}>
                    {this.menuOptions()}
                </div>
            </div>
        );
    }
}

export default MenuButton;
