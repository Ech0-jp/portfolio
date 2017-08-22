import React, { Component } from 'react';
import $ from 'jquery';
import HexBackground from '../../util/component/HexBackground';
import DivExtendedBorder from '../../util/component/Div_ExtendedBorder';
import ExpandingTextButton from '../../util/component/ExpandingTextButton';
import ConsoleTextEffect from '../../util/ConsoleTextEffect';
import './Contact.css'

class Contact extends Component {
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

    onClick(){
        this.props.changePage("main", "DOWN");
        window.location.hash = "#main";
    }

    onSubmit(e){
        $.ajax({
            url: "https://formspree.io/hit-the-hills@hotmail.ca",
            method: "POST",
            data: $(this).serialize(),
            dataType: "json"
        });
        e.preventDefault();
        $(this).get(0).reset();
    }

    _render(){
        if (!this.props.transitionComplete) return;
        var width = window.innerWidth / 2;
        setTimeout(() => { ConsoleTextEffect.AnimateText(this.refs.header.DOM(), "Contact", 35); }, 5);
        setTimeout(() => {
            ConsoleTextEffect.AnimateText(this.refs.h3, "Contact Me", 35);
            $('.contact-form input[type="text"], .contact-form input[type="email"], .contact-form textarea').css({
                'animation-play-state': 'running'
            });
            $('.contact-form button[type="submit"]').css({
                'animation-play-state': 'running'
            });
            setTimeout(() => { ConsoleTextEffect.AnimateText(this.refs.btnSubmit, "Submit", 35); }, 1000);
        }, 1000);
        return (
            <div className="contact-container">
                <ExpandingTextButton ref="header" className="header" content="Contact" targetWidth={width} chevron={true} onClick={() => this.onClick()} />
                <DivExtendedBorder width={375} height={460} />
                <form className="contact-form">
                    <h3 ref="h3"> </h3>
                    <fieldset>
                        <input className="input" name="name" placeholder="Name/Company" type="text" tabindex="1" required autofocus />
                    </fieldset>
                    <fieldset>
                        <input name="email" placeholder="Email" type="email" tabindex="2" required />
                    </fieldset>
                    <fieldset>
                        <input name="sub" placeholder="Subject" type="text" tabindex="3" required />
                    </fieldset>
                    <fieldset>
                        <textarea name="msg" placeholder="Message" type="text" tabindex="4" required />
                    </fieldset>
                    <fieldset>
                        <button ref="btnSubmit" className="submit" type="submit" onSubmit={(e) => { this.onSubmit(e) }} />
                    </fieldset>
                </form>
            </div>
        );
    }

    render(){
        return (
            <div className="contact">
                <HexBackground startInterval={this.state.transitionComplete}/>
                {this._render()}
            </div>
        );
    }
}

export default Contact;
