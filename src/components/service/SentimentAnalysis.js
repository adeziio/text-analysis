import React, { Component } from 'react';
import { Typography, TextField } from '@mui/material';
import { SentimentNeutral, SentimentSatisfied, SentimentDissatisfied } from '@mui/icons-material';

export default class SentimentAnalysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalText: "",
            sentiment: "neutral",
            delayCounter: 0,
        }
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
            if (originalText.trim() !== "") {
                fetch("https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1", {
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json",
                        "x-rapidapi-host": "text-analysis12.p.rapidapi.com",
                        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY
                    },
                    "body": JSON.stringify({
                        "language": "english",
                        "text": originalText.trim().replace(/[^\w ]/g, '')
                    })
                })
                    .then(response => response.json())
                    .then(resData => { this.setState({ sentiment: resData.sentiment ?? "" }) })
            }
            else {
                this.setState({
                    sentiment: "neutral"
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
            <>
                <Typography variant="h5" color="text.primary" fontSize="1.5rem" fontWeight="bold" margin="1rem" >
                    Sentiment Analysis
                </Typography>
                <Typography variant="h5" color="text.primary" fontSize="1.5rem" fontWeight="bold" margin="1rem" >
                    {sentiment === "neutral" ? <SentimentNeutral sx={{ fontSize: 100, color: "gray" }} />
                        : sentiment === "positive" ? <SentimentSatisfied sx={{ fontSize: 100, color: "lime" }} />
                            : sentiment === "negative" ? <SentimentDissatisfied sx={{ fontSize: 100, color: "red" }} />
                                : null
                    }
                </Typography>
                <TextField label="Text" variant="outlined" onChange={this.handleInput}
                    fullWidth
                    multiline
                    maxRows={15}
                />
            </>
        )
    }
}
