import React, { Component } from 'react';
import './SummarizeText.css'
import { Grid, Form, TextArea, Header, Icon } from 'semantic-ui-react';

export default class SummarizeText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalText: "",
            summarizedText: "",
            delayCounter: 0,
        }
    }

    componentDidMount = () => {
        document.title = "Summarize Text";
    }

    handleInput = (e) => {
        this.setState({
            originalText: e.target.value,
            delayCounter: this.state.delayCounter + 1
        }, () => {
            setTimeout(() => {
                this.fetchData(e.target.value);
            }, 1200)
        })
    }

    fetchData = (originalText) => {
        if (this.state.delayCounter === 1) {
            if (originalText !== "") {
                fetch("https://text-monkey-summarizer.p.rapidapi.com/nlp/summarize", {
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json",
                        "x-rapidapi-host": "text-monkey-summarizer.p.rapidapi.com",
                        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY
                    },
                    "body": JSON.stringify({
                        "text": originalText
                    })
                })
                    .then(response => response.json())
                    .then(resData => { this.setState({ summarizedText: resData.summary ?? "" }) })
            }
            else {
                this.setState({
                    summarizedText: ""
                })
            }
        }
        this.setState({
            delayCounter: this.state.delayCounter - 1
        })
    }

    render() {
        let { summarizedText } = this.state;

        if (typeof summarizedText === 'object') {
            summarizedText = "?"
        }

        return (
            <div>
                <Grid centered stackable>
                    <Grid.Row columns={4}>
                        <Grid.Column style={{ margin: "1rem" }}>
                            <Header as='h3'>Original Text <Icon name='pencil alternate' /></Header>
                            <Form>
                                <TextArea placeholder='' style={{ minHeight: 500, minWidth: 500 }} onChange={this.handleInput} />
                            </Form>
                        </Grid.Column>
                        <Grid.Column style={{ margin: "1rem" }}>
                            <Header as='h3'>Summarized Text <Icon name='idea' /></Header>
                            <Form>
                                <TextArea placeholder='' style={{ minHeight: 500, minWidth: 500 }} value={summarizedText} />
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}
