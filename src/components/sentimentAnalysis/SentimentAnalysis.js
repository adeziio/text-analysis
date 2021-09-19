import React, { Component } from 'react';
import './SentimentAnalysis.css'
import { Grid, Form, TextArea, Header } from 'semantic-ui-react';
import { FaSmile, FaFrown, FaQuestionCircle } from 'react-icons/fa';

export default class SentimentAnalysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalText: "",
            sentiment: "",
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
                fetch("https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1", {
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json",
                        "x-rapidapi-host": "text-analysis12.p.rapidapi.com",
                        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY
                    },
                    "body": JSON.stringify({
                        "language": "english",
                        "text": originalText
                    })
                })
                    .then(response => response.json())
                    .then(resData => { this.setState({ sentiment: resData.sentiment ?? "" }) })
            }
            else {
                this.setState({
                    sentiment: ""
                })
            }
        }
        this.setState({
            delayCounter: this.state.delayCounter - 1
        })
    }

    render() {
        let { sentiment } = this.state;

        return (
            <div>
                <Grid centered stackable>
                    <Grid.Row columns={3}>
                        <Grid.Column style={{ margin: "1rem" }}>
                            <Header as='h3'>Sentence </Header>
                            <Form>
                                <TextArea placeholder='' style={{ minHeight: 120, minWidth: 500 }} onChange={this.handleInput} />
                            </Form>
                        </Grid.Column>
                        <Grid.Column style={{ margin: "1rem" }} >
                            <Header as='h3'>Sentiment</Header>
                            {sentiment === "positive" ?
                                <FaSmile color='lightgreen' size="100px" /> :
                                sentiment === "negative" ?
                                    <FaFrown color='lightcoral' size="100px" /> :
                                    <FaQuestionCircle color="lightgrey" size="100px" />
                            }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}
