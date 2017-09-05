import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Entry from './pages/entry/Entry';
import Main from './pages/main/Main';
import Projects from './pages/projects/Projects';
import Contact from './pages/contact/Contact';
import About from './pages/about/About';
import Resume from './pages/resume/Resume';
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
            case '#projects':
                this.setState({current: 'projects'});
            break;
            case '#contact':
                this.setState({current: 'contact'});
            break;
            case '#about':
                this.setState({current: 'about'});
            break;
            case '#resume':
                this.setState({current: 'resume'});
            break;
            default:
                this.setState({current: 'entry'});
        }
    }


    changePage(next, direction){
        this.setState({next: next, transition: true});
        this.direction = direction;
    }

    changePageResolve(){
        this.setState({
            current: this.state.next,
            next: null,
            showNext: false,
            transition: false
        });
    }

    changePageTransition(){
        if (this.refs.transitionCanvas)
            this.refs.transitionCanvas.transitionReverse();
    }

    page(renderNew = false){
        const statement = renderNew ? this.state.next : this.state.current;
        switch (statement) {
            case 'entry':
                return <Entry changePage={this.changePage.bind(this)}/>;
            case 'main':
                return <Main loaded={this.changePageTransition.bind(this)} changePage={this.changePage.bind(this)} transitionComplete={!renderNew} />;
            case 'projects':
                return <Projects loaded={this.changePageTransition.bind(this)} changePage={this.changePage.bind(this)} transitionComplete={!renderNew} />;
            case 'contact':
                return <Contact loaded={this.changePageTransition.bind(this)} changePage={this.changePage.bind(this)} transitionComplete={!renderNew} />;
            case 'about':
                return <About loaded={this.changePageTransition.bind(this)} changePage={this.changePage.bind(this)} transitionComplete={!renderNew} />;
            case 'resume':
                return <Resume loaded={this.changePageTransition.bind(this)} changePage={this.changePage.bind(this)} transitionComplete={!renderNew} />;
            default:
                return <noscript />;
        }
    }

    transition(){
        if (!this.state.transition) return;
        return <MatrixCanvas ref="transitionCanvas" style={{zIndex: 9999}} transition={this.direction} intervalTime={10} callback={() => {this.setState({showNext: true})}} resolve={this.changePageResolve.bind(this)} />;
    }

    render() {
        var page = this.page();
        if (this.state.next && this.state.showNext) {
            page = this.page(true);
        }
        return (
            <div className="App">
                {page}
                {this.transition()}
            </div>
        );
    }
}

export default App;
