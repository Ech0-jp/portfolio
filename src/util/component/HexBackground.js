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
        if (this.props.startInterval)
            this.interval = setInterval(() => { this._pulse() }, this.intervalTime);
        this.context = this.refs.canvas.getContext('2d');
    }

    componentWillUnmount(){
        if (this.interval) clearInterval(this.interval);
    }

    _pulse(){
        this.context.fillStyle = "rgba(0, 0, 0, 0.025)"
        this.context.fillRect(0, 0, this.width, this.height);
        this.context.strokeStyle = "rgba(70, 239, 244, 0.05)";

        this.context.beginPath();
        this.context.arc(window.innerWidth/2, window.innerHeight/2, this.radius < 0 ? 0 : this.radius, 0, 2*Math.PI);
        this.context.lineWidth = 100;
        this.context.closePath();
        this.context.stroke();

        this.radius += this.reverse ? -6 : 6;
        if (this.radius > this.width * 0.75 || this.radius < 0)
            this.reverse = !this.reverse;
    }

    render(){
        return(
            <div className="hex-background">
                <canvas ref="canvas" width={this.width} height={this.height} />
                <img src={require('../../img/HexBackground.png')} />
            </div>
        );
    }
}

export default HexBackground;
