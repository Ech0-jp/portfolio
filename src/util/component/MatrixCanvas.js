import React, { Component } from 'react';
import jQuery from 'jquery';

class MatrixCanvas extends Component {
    constructor(props){
        super(props);
        if (!this.initialized) this.init(props);
    }

    componentDidMount() {
        if (!this.initialized) this.init(this.props);
        if (this.props.transition) {
            switch (this.props.transition) {
                case 'DOWN':
                    this.transitionDown(true).then(() => {
                        if (this.props.callback) this.props.callback();
                    });
                    break;
                default:

            }
        }
    }

    componentWillUnmount(){
        if (this.interval) clearInterval(this.interval);
    }

    init(props){
        this.width = window.innerWidth
        this.height = window.innerHeight;
        window.addEventListener('resize', this.resize.bind(this), false);
        this.japanese = "あいうえおかきくけこさしすせそがぎぐげごぱぴぷぺぽアイウエオカキクケコサシスセソガギグゲゴパピプペポ";
        this.japanese = this.japanese.split("");

        if (props.fontSize === undefined) {
            this.fontSize = 10;
        } else {
            this.fontSize = props.fontSize;
        }

        if (props.fontColor === undefined){
            this.fontColor = "#46EFF4";
        } else {
            this.fontColor = props.fontColor;
        }

        if (props.bgColor === undefined) {
            this.bgColor = "rgba(0, 0, 0, 0.1)";
        } else {
            this.bgColor = props.bgColor;
        }

        if (props.intervalTime === undefined) {
            this.intervalTime = 25;
        } else {
            this.intervalTime = props.interval;
        }

        this.columns = Math.floor(this.width / this.fontSize);
        this.drops = [];
        for (var x = 0; x < this.columns; x++) {
            this.drops[x] = 1;
        }
        this.initialized = true;
    }

    resize(){
        this.width = window.innerWidth
        this.height = window.innerHeight;
    }

    fill(context) {
        context.fillStyle = this.bgColor;
        context.fillRect(0, 0, this.width, this.height);
        context.fillStyle = this.fontColor;
        context.font = this.fontSize + "px arial";
    }

    clear(){
        const context = this.refs.canvas.getContext('2d');
        context.fillStyle = 'black';
        context.fillRect(0, 0, this.width, this.height);
    }

// MATRIX RAIN
    startMatrixRain(){
        this.interval = setInterval(() => { this._matrixRain() }, this.intervalTime);
    }
    stopMatrixRain(){
        if (this.interval) clearInterval(this.interval);
    }
    _matrixRain(){
        const context = this.refs.canvas.getContext('2d');
        if (this.yPositions === undefined){
            this.yPositions = Array(300).join(0).split('');
        }

        this.fill(context);
        this.yPositions.forEach((y, index) => {
            var text = this.japanese[Math.floor(Math.random() * this.japanese.length)];
            var x = (index * 10) + 10;
            context.fillText(text, x, y);
            if (y > 100 + Math.random() * 1e4) {
                this.yPositions[index] = 0;
            } else {
                this.yPositions[index] = y + 10;
            }
        });
    }

    transitionReverse(direction = null){
        var dir = direction ? direction : this.props.transition;
        switch (dir) {
            case 'DOWN':
                this.transitionDownReverse().then(() => {
                    if (this.props.resolve) this.props.resolve();
                });
                break;
            case 'UP':

                break;
            case 'LEFT':

                break;
            case 'RIGHT':

                break;
            default:

        }
    }

// TRANSITION DOWN
    transitionDown(extend = false){
        var d = jQuery.Deferred();

        var transition = () => {
            const context = this.refs.canvas.getContext('2d');
            context.fillStyle = this.bgColor;
            context.fillRect(0, 0, this.width, this.drops[0] * this.fontSize);
            for (var i = 0; i < this.drops.length; i++) {
                context.fillStyle = '#46eff4';
                context.font = this.fontSize + 'px arial';
                var text = this.japanese[Math.floor(Math.random() * this.japanese.length)];
                context.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
                this.drops[i]++;
            }

            if ((this.drops[this.columns - 1] * this.fontSize > this.height && !extend) ||
                (this.drops[this.columns - 1] * this.fontSize > this.height * 1.5 && extend)) {
                d.resolve();
            } else {
                setTimeout(() => { transition() }, this.intervalTime);
            }
        }

        transition();
        return d.promise();
    }
    transitionDownReverse(){
        var d = jQuery.Deferred();

        var transition = () => {
            const context = this.refs.canvas.getContext('2d');
            context.clearRect(0, 0, this.width, this.height);
            context.fillStyle = 'black';
            context.fillRect(0, 0, this.width, this.drops[0] * this.fontSize);
            for (var i = 0; i < this.drops.length; i++) {
                context.fillStyle = '#46eff4';
                context.font = this.fontSize + 'px arial';
                var text = this.japanese[Math.floor(Math.random() * this.japanese.length)];
                context.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
                this.drops[i]--;
            }

            if (this.drops[this.columns - 1] <= 0) {
                d.resolve();
            } else {
                setTimeout(() => { transition() }, this.intervalTime);
            }
        }

        transition();
        return d.promise();
    }

    render(){
        var style;
        if (this.props.style) {
            style = this.props.style;
            style['display'] = 'block';
            style['position'] = 'fixed';
        } else {
            style = {  display: 'block', position: 'fixed' };
        }
        return (
            <canvas style={style} ref="canvas" width={this.width} height={this.height} />
        );
    }
}

export default MatrixCanvas;
