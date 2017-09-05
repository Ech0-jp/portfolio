import React, { Component } from 'react';
import MatrixCanvas from '../../util/component/MatrixCanvas';
import DivExtendedBorder from '../../util/component/Div_ExtendedBorder';
import BorderButton from '../../util/component/BorderButton';
import ConsoleTextEffect from '../../util/ConsoleTextEffect';
import './Entry.css';

class Entry extends Component {
    constructor(props){
        super(props);
        this.state = { show: false, shown: false, transition: false };
    }

    componentDidMount(){
        this.canvas.clear();
        this.canvas.transitionDown().then(() => {
            this.canvas.startMatrixRain();
                this.setState({show: true});
        });
    }

    onClick(instance){
        window.location.hash = "#main";
        this.props.changePage('main', 'DOWN');
    }

    entryMenu(){
        if (!this.state.show) return;
        if (!this.state.shown) {
            setTimeout(() => {
                ConsoleTextEffect.AnimateText(this.message, "Welcome to the portfolio of Andrew Gray!");
            }, 1005);
            setTimeout(() => {
                ConsoleTextEffect.AnimateText(this.btnEnter.DOM(), "Enter", 35);
                this.btnEnter.setActive();
                this.setState({shown: true});
            }, 3000);
        }
        return (
            <div className="entry-menu">
                <DivExtendedBorder />
                <p ref={(instance) => {this.message = instance}} className="welcome-message"/>
                <BorderButton ref={(instance => {this.btnEnter = instance})} className="enter" timeout={2500} onClick={this.onClick.bind(this)}/>
            </div>
        );
    }

    render(){
        return (
            <div className="entry">
                <MatrixCanvas ref={(instance) => { this.canvas = instance }} />
                {this.entryMenu()}
            </div>
        );
    }
}

export default Entry;
