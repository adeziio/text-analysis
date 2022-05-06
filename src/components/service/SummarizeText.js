import React, { Component } from 'react';
import { Typography, Grid, TextField } from '@mui/material';

export default class SummarizeText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalText: "",
            summarizedText: "",
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
                fetch("https://text-analysis12.p.rapidapi.com/summarize-text/api/v1.1", {
                    "method": "POST",
                    "headers": {
                        'content-type': 'application/json',
                        'X-RapidAPI-Host': 'text-analysis12.p.rapidapi.com',
                        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY
                    },
                    "body": JSON.stringify({
                        "language": "english",
                        "text": originalText.trim()
                    })
                })
                    .then(response => response.json())
                    .then(resData => { this.setState({ summarizedText: resData.summary ?? "Invalid Text." }) })
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

        return (
            <>
                <Typography variant="h5" color="text.primary" fontSize="1.5rem" fontWeight="bold" margin="1rem" >
                    Summarize Text
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField label="Original Text" variant="outlined" onChange={this.handleInput}
                            fullWidth
                            multiline
                            rows={20}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Summarize Text" variant="outlined"
                            fullWidth
                            multiline
                            rows={20}
                            value={summarizedText}
                        />
                    </Grid>
                </Grid>
            </>
        )
    }
}
