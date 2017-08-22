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
                case 'UP':
                    this.transitionUp(true).then(() => {
                        if (this.props.callback) this.props.callback();
                    });
                break;
                case 'LEFT':
                    this.transitionLeft(true).then(() => {
                        if (this.props.callback) this.props.callback();
                    });
                break;
                case 'RIGHT':
                    this.transitionRight(true).then(() => {
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
        this.width = window.screen.width
        this.height = window.screen.height;
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
            this.intervalTime = props.intervalTime;
        }

        this.columns = Math.round(this.width / this.fontSize);
        this.rows = Math.round(this.height / this.fontSize);

        this.drops = [];
        this.dropsY = [];

        for (var x = 0; x < this.columns; x++) {
            if (props.transition === "UP") {
                this.drops[x] = this.rows;
            } else {
                this.drops[x] = 1;
            }
        }

        for(var y = 0; y < this.rows; y++) {
            if (props.transition === "LEFT") {
                this.dropsY[y] = this.columns;
            } else {
                this.dropsY[y] = 0;
            }
        }

        this.initialized = true;
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
                this.transitionUpReverse().then(() => {
                    if (this.props.resolve) this.props.resolve();
                });
            break;
            case 'LEFT':
                this.transitionLeftReverse().then(() => {
                    if (this.props.resolve) this.props.resolve();
                });
            break;
            case 'RIGHT':
                this.transitionRightReverse().then(() => {
                    if (this.props.resolve) this.props.resolve();
                });
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

    //TRANSITION UP
    transitionUp(extend = false){
        var d = jQuery.Deferred();

        var transition = () => {
            const context = this.refs.canvas.getContext('2d');
            context.fillStyle = this.bgColor;
            var start = this.drops[0] * this.fontSize;
            if (start <= 0) {
                context.fillRect(0, 0, this.width, this.height);
            } else {
                context.fillRect(0, start, this.width, this.height - this.drops[0] * this.fontSize);
            }
            for (var i = 0; i < this.drops.length; i++) {
                context.fillStyle = '#46eff4';
                context.font = this.fontSize + 'px arial';
                var text = this.japanese[Math.floor(Math.random() * this.japanese.length)];
                context.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
                this.drops[i]--;
            }

            if ((this.drops[this.columns - 1] * this.fontSize <= 0 && !extend) ||
                (this.drops[this.columns - 1] * this.fontSize < -this.height * 0.5 && extend)) {
                d.resolve();
            } else {
                setTimeout(() => { transition() }, this.intervalTime);
            }
        }

        transition();
        return d.promise();
    }
    transitionUpReverse(){
        var d = jQuery.Deferred();

        var transition = () => {
            const context = this.refs.canvas.getContext('2d');
            context.clearRect(0, 0, this.width, this.height);
            context.fillStyle = 'black';
            context.fillRect(0, this.drops[0] * this.fontSize, this.width, this.height - this.drops[0] * this.fontSize);
            for (var i = 0; i < this.drops.length; i++) {
                context.fillStyle = '#46eff4';
                context.font = this.fontSize + 'px arial';
                var text = this.japanese[Math.floor(Math.random() * this.japanese.length)];
                context.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
                this.drops[i]++;
            }

            if (this.drops[this.columns - 1] * this.fontSize > this.height)  {
                d.resolve();
            } else {
                setTimeout(() => { transition() }, this.intervalTime);
            }
        }

        transition();
        return d.promise();
    }

    //TRANSITION LEFT
    transitionLeft(extend = false){
        var d = jQuery.Deferred();

        var transition = () => {
            const context = this.refs.canvas.getContext('2d');
            context.fillStyle = this.bgColor;
            var start = this.dropsY[0] * this.fontSize;
            if (start <= 0) {
                context.fillRect(0, 0, this.width, this.height);
            } else {
                context.fillRect(start, 0, this.width - this.dropsY[0] * this.fontSize, this.height);
            }
            for (var i = 0; i < this.dropsY.length; i++) {
                context.fillStyle = '#46eff4';
                context.font = this.fontSize + 'px arial';
                var text = this.japanese[Math.floor(Math.random() * this.japanese.length)];
                context.fillText(text, this.dropsY[i] * this.fontSize, i * this.fontSize);
                this.dropsY[i]--;
            }

            if ((this.dropsY[this.rows - 1] * this.fontSize <= 0 && !extend) ||
                (this.dropsY[this.rows - 1] * this.fontSize < -this.width * 0.5 && extend)) {
                d.resolve();
            } else {
                setTimeout(() => { transition() }, this.intervalTime);
            }
        }

        transition();
        return d.promise();
    }
    transitionLeftReverse(){
        var d = jQuery.Deferred();

        var transition = () => {
            const context = this.refs.canvas.getContext('2d');
            context.clearRect(0, 0, this.width, this.height);
            context.fillStyle = 'black';
            context.fillRect(this.dropsY[0] * this.fontSize, 0, this.width - this.dropsY[0] * this.fontSize, this.height);
            for (var i = 0; i < this.dropsY.length; i++) {
                context.fillStyle = '#46eff4';
                context.font = this.fontSize + 'px arial';
                var text = this.japanese[Math.floor(Math.random() * this.japanese.length)];
                context.fillText(text, this.dropsY[i] * this.fontSize, i * this.fontSize);
                this.dropsY[i]++;
            }

            if (this.dropsY[this.rows - 1] * this.fontSize > this.width)  {
                d.resolve();
            } else {
                setTimeout(() => { transition() }, this.intervalTime);
            }
        }

        transition();
        return d.promise();
    }

    //TRANSITION RIGHT
    transitionRight(extend = false){
        var d = jQuery.Deferred();

        var transition = () => {
            const context = this.refs.canvas.getContext('2d');
            context.fillStyle = this.bgColor;
            context.fillRect(0, 0, this.dropsY[0] * this.fontSize, this.height);
            for (var i = 0; i < this.dropsY.length; i++) {
                context.fillStyle = '#46eff4';
                context.font = this.fontSize + 'px arial';
                var text = this.japanese[Math.floor(Math.random() * this.japanese.length)];
                context.fillText(text, this.dropsY[i] * this.fontSize, i * this.fontSize);
                this.dropsY[i]++;
            }

            if ((this.dropsY[this.rows - 1] * this.fontSize > this.width && !extend) ||
                (this.dropsY[this.rows - 1] * this.fontSize > this.width * 1.5 && extend)) {
                d.resolve();
            } else {
                setTimeout(() => { transition() }, this.intervalTime);
            }
        }

        transition();
        return d.promise();
    }
    transitionRightReverse(){
        var d = jQuery.Deferred();

        var transition = () => {
            const context = this.refs.canvas.getContext('2d');
            context.clearRect(0, 0, this.width, this.height);
            context.fillStyle = 'black';
            context.fillRect(0, 0, this.dropsY[0] * this.fontSize, this.height);
            for (var i = 0; i < this.dropsY.length; i++) {
                context.fillStyle = '#46eff4';
                context.font = this.fontSize + 'px arial';
                var text = this.japanese[Math.floor(Math.random() * this.japanese.length)];
                context.fillText(text, this.dropsY[i] * this.fontSize, i * this.fontSize);
                this.dropsY[i]--;
            }

            if (this.dropsY[this.rows - 1] <= 0) {
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
