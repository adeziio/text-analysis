import React, { Component } from 'react';
import { Menu, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
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
            <Menu
                size="large"
                pointing secondary
                color="blue"
                // widths={3} 
                className="navbar-container"
            >
                <Menu.Item>
                    <Header as='h2' color="blue">
                        <Icon name='pencil alternate' />
                        <Header.Content>
                            adeziio
                            <Header.Subheader>Text Analysis</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Menu.Item>
                <Menu.Item
                    as={Link}
                    to='/summarize-text'
                    name='/summarize-text'
                    active={activeItem === '/summarize-text'}
                    onClick={this.handleItemClick}
                >
                    Summarize Text
                </Menu.Item>
                <Menu.Item
                    as={Link}
                    to='/sentiment-analysis'
                    name='/sentiment-analysis'
                    active={activeItem === '/sentiment-analysis'}
                    onClick={this.handleItemClick}
                >
                    Sentiment Analysis
                </Menu.Item>
            </Menu>
        )
    }
}