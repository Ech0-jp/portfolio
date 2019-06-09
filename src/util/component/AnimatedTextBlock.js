import React, { Component } from 'react';
import ConsoleTextEffect from '../ConsoleTextEffect.js';
import '../style/AnimatedTextBlock.css';

class AnimatedTextBlock extends Component {
    constructor (props) {
        super(props);
        this.text = this.props.text;
        this.delay = this.props.delay ? this.props.delay : 5;
    }

    componentDidMount () {
        this.mountText(0);
    }

    getAnimationTime() {
        return this.text.length * (this.delay * 2);
    }

    setText(nextText) {
        if (this.text) {
            ConsoleTextEffect.AnimateTextReverse(this.textBlock, this.delay, true);
            var timeout = this.text.length * (this.delay * 2);
            setTimeout(() => {
                this.text = nextText;
                if (nextText)
                    ConsoleTextEffect.AnimateText(this.textBlock, nextText, true, this.delay);
            }, timeout);
        } else {
            this.text = nextText;
            if (nextText)
                ConsoleTextEffect.AnimateText(this.textBlock, nextText, true, this.delay);
        }
    }

    mountText (attempt) {
        if (!this.text) {
            if (attempt > 5) return;
            else return this.mountText (++attempt);
        }

        if (this.text)
            ConsoleTextEffect.AnimateText(this.textBlock, this.text, true, this.delay);
    }

    render () {
        return (
            <div className={this.props.className + " animated-text-block"}>
                <span />
                <p ref={ (o) => this.textBlock = o } />
            </div>
        );
    }
}

export default AnimatedTextBlock;
