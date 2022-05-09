import React, { Component } from 'react';
import { Typography, TextField, Alert } from '@mui/material';
import { SentimentNeutral, SentimentSatisfied, SentimentDissatisfied } from '@mui/icons-material';
import { fetchSentimentAnalysis } from '../../api/BackendAPI';

export default class SentimentAnalysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalText: "",
            sentiment: "neutral",
            delayCounter: 0,
            resMsg: undefined
        }
    }

    setSentiment = (sentiment) => {
        this.setState({
            sentiment: sentiment
        })
    }

    setResMsg = (resMsg) => {
        this.setState({
            resMsg: resMsg
        })
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

    fetchData = async (originalText) => {
        if (this.state.delayCounter === 1) {
            if (originalText.trim() !== "") {
                const response = await fetchSentimentAnalysis(originalText.trim().replace(/[^\w ]/g, ''));
                if (response) {
                    if (response.sentiment) {
                        this.setSentiment(response.sentiment);
                        this.setResMsg(undefined);
                    }
                    else {
                        this.setSentiment("neutral");
                        this.setResMsg(response.msg);
                    }
                }
                else {
                    this.setSentiment("neutral");
                    this.setResMsg("Unexpected Error");
                }
            }
            else {
                this.setSentiment("neutral");
                this.setResMsg(undefined);
            }
        }
        this.setState({
            delayCounter: this.state.delayCounter - 1
        })
    }

    render() {
        const { sentiment, resMsg } = this.state;

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
                    multiline
                    maxRows={15}
                />
                {resMsg ? <Alert sx={{ marginTop: 1 }} severity="error">{resMsg}</Alert> : null}
            </>
        )
    }
}
