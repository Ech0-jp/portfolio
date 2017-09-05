import React, { Component } from 'react';
import '../style/HexBackground.css';

class HexBackground extends Component {
    constructor(props){
        super(props);
        this.width = window.screen.width;
        this.height = window.screen.height;
        this.radius = 0;
        this.reverse = false;
        if (props.intervalTime === undefined) {
            this.intervalTime = 25;
        } else {
            this.intervalTime = props.interval;
        }
    }

    componentDidMount(){
        if (this.props.startInterval && !this.interval)
            this.interval = setInterval(() => { this._pulse() }, this.intervalTime);
        var context = this.refs.canvas.getContext('2d');
        context.fillStyle = 'black';
        context.fillRect(0, 0, this.width, this.height);
    }

    componentWillUnmount(){
        if (this.interval) clearInterval(this.interval);
    }

    componentWillReceiveProps(nextProps){
        if (this.props !== nextProps) {
            if (nextProps.startInterval && !this.interval){
                this.interval = setInterval(() => { this._pulse() }, this.intervalTime);
            }
        }
    }

    _pulse(){
        try {
            var context = this.refs.canvas.getContext('2d');
            context.fillStyle = "rgba(0, 0, 0, 0.025)";
            context.fillRect(0, 0, this.width, this.height);
            context.strokeStyle = "rgba(70, 239, 244, 0.05)";

            context.beginPath();
            context.arc(window.innerWidth/2, window.innerHeight/2, this.radius < 0 ? 0 : this.radius, 0, 2*Math.PI);
            context.lineWidth = 100;
            context.closePath();
            context.stroke();

            this.radius += this.reverse ? -6 : 6;
            if (this.radius > this.width * 0.75 || this.radius < 0)
                this.reverse = !this.reverse;
        } catch(e) {
            return;
        }
    }

    render(){
        return(
            <div className="hex-background">
                <canvas ref="canvas" width={this.width} height={this.height} />
                <img src={require('../../img/HexBackground.png')} alt="" />
            </div>
        );
    }
}

export default HexBackground;
