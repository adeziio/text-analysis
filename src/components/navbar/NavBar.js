import React, { Component } from 'react';
import { Header, Icon } from 'semantic-ui-react';
import { Navbar, Nav } from 'react-bootstrap';
import './NavBar.css';


export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: window.location.pathname,
            paths: ["/summarize-text", "/sentiment-analysis"]
        }
    }

    handleItemClick = (e, { name }) => {
        this.setState({
            activeItem: name
        })
    }

    render() {
        let { paths, activeItem } = this.state;
        activeItem = paths.some((item) => item === activeItem) ? activeItem : "/summarize-text";

        return (
            <>
                <Navbar className="navbar-container" expand="lg" >
                    <Navbar.Brand href="/summarize-text">
                        <Header as='h2' inverted color="white">
                            <Header.Content>
                                <Icon name='pencil alternate' />
                                adeziio
                                <Header.Subheader>Text Analysis</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="navbar-item">
                            <Nav.Link href="/summarize-text" className={`navbar-item ${activeItem === "/summarize-text" ? "active" : ""}`}>
                                Summarize Text
                            </Nav.Link>
                            <Nav.Link href="/sentiment-analysis" className={`navbar-item ${activeItem === "/sentiment-analysis" ? "active" : ""}`}>
                                Sentiment Analysis
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    }
}