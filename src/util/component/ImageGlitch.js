import React, { Component } from 'react';
import base64 from '../toBase64';
import '../style/ImageGlitch.css';

class ImageGlitch extends Component {
    constructor(props) {
        super(props);
        this.index = 0;
        this.maxErrors = 100;
        this.margin = 2200;
        var video = false;
        if (this.props.images) {
            if (this.props.images[0].includes("youtube")) {
                video = true;
            } else {
                video = false;
                this.convertImages();
            }
        }
        this.state = {width: 0, height: 5, video: video};
    }

    componentWillReceiveProps(nextProps) {
        clearInterval(this.corruptInterval);
        clearInterval(this.imageInterval);
        clearTimeout(this.timeout);
        if (this.props.images) {
            if (this.props.images[0].includes("youtube")) {
                this.setState({video: true});
            } else {
                this.setState({video: false});
                this.convertImages();
                this.refs.img.src = this.imagesBase64[this.index];
                this.imageInterval = setInterval(() => { this.corruptImage() }, 4000);
            }
        }
    }

    componentWillUnmount(){
        clearInterval(this.corruptInterval);
        clearInterval(this.imageInterval);
        clearTimeout(this.timeout);
    }

    convertImages(){
        this.imagesBase64 = [];
        for (var i = 0; i < this.props.images.length; i++) {
            base64(this.props.images[i], function(dataURL, target) { target.push(dataURL) }, "image/jpeg", this.imagesBase64);
        }
    }

    animate(){
        this.setState({width: this.props.width, height: this.props.height});
        setTimeout(() => {
            this.refs.img.src = this.imagesBase64[this.index];
            this.imageInterval = setInterval(() => { this.corruptImage() }, 4000);
        }, 500);
    }

    corruptImage(){
        try {
            this.corruptInterval = setInterval(() => { this.base64Corruption(this.imagesBase64[this.index], this.refs.img) }, 26);
            this.timeout = setTimeout(() => {
                this.index += 1;
                if (this.index === this.imagesBase64.length) this.index = 0;
                if (this.refs.img) this.refs.img.src = this.imagesBase64[this.index];
            }, 1000);
            this.timeout = setTimeout(() => {
                clearInterval(this.corruptInterval);
                if (this.refs.img) this.refs.img.src = this.imagesBase64[this.index];
            }, 2000);
        } catch (e) {

        }
    }

    base64Corruption(src, target){
        try {
            var corrupt = src;
            if (Math.random() > 0.7) {
                var errors = Math.round(Math.random() * this.maxErrors);
                for (var i = 0; i < errors; i++) {
                    var p = this.margin + Math.round(Math.random() * (corrupt.length - this.margin - 1));
                    corrupt = corrupt.substr(0, p) + corrupt.charAt(p + 1) + corrupt.charAt(p) + corrupt.substr(p + 2);
                }
            }
            target.src = corrupt;
        } catch (e) {

        }
    }

    _render() {
        if (!this.state.video) return;
        return <iframe title="video" src={this.props.images[0]} width={this.state.width} height={this.state.height} frameBorder="0" allowFullScreen />
    }

    render(){
        return (
            <div className="image-glitch">
                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" alt="" width={this.state.width} height={this.state.height}/>
                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" alt="" ref="img" width={this.state.width} height={this.state.height}/>
                {this._render()}
                <img src={require('../../img/ImageBorder.png')} alt="" width={this.state.width} height={this.state.height} />
            </div>
        );
    }
}

export default ImageGlitch;
