import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Entry from './pages/entry/Entry';
import Main from './pages/main/Main';
import MatrixCanvas from './util/component/MatrixCanvas';

class App extends Component {
    constructor(){
        super();
        this.state = {next: null, showNext: false};
    }

    componentDidMount(){
        var hash = window.location.hash;
        switch (hash) {
            case '#main':
                this.setState({current: 'main'});
                break;
            default:
                this.setState({current: 'entry'});
        }
    }

    page(renderNew = false){
        const statement = renderNew ? this.state.next : this.state.current;
        switch (statement) {
            case 'entry':
                return <Entry changePage={this.changePage.bind(this)}/>;
            case 'main':
                return <Main loaded={this.changePageTransition.bind(this)} startInterval={!renderNew} />;
            default:
                return <noscript />;
        }
    }

    changePage(next, direction){
        this.setState({next: next, transition: true});
        this.direction = direction;
    }

    changePageTransition(){
        if (this.refs.transitionCanvas)
            this.refs.transitionCanvas.transitionReverse();
    }

    changePageResolve(){
        this.setState({
            current: this.state.next,
            next: null,
            showNext: false,
            transition: false
        });
    }

    transition(){
        if (!this.state.transition) return;
        return <MatrixCanvas ref="transitionCanvas" style={{zIndex: 9999}} transition={this.direction} callback={() => {this.setState({showNext: true})}} resolve={this.changePageResolve.bind(this)} />;
    }

    render() {
        var next = <noscript />;
        if (this.state.next && this.state.showNext) {
            next = this.page(true);
        }
        return (
            <div className="App">
                {this.page()}
                {next}
                {this.transition()}
            </div>
        );
    }
}

export default App;
