import React, { Component } from 'react';
import { Typography, TextField, Alert } from '@mui/material';
import { fetchSummarizeText } from '../../api/BackendAPI';

export default class SummarizeText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalText: "",
            summarizeText: "",
            delayCounter: 0,
            resMsg: undefined
        }
    }

    setSummarizeText = (summarizeText) => {
        this.setState({
            summarizeText: summarizeText
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
                const response = await fetchSummarizeText(originalText.trim());
                if (response) {
                    if (response.summary) {
                        this.setSummarizeText(response.summary);
                        this.setResMsg(undefined);
                    }
                    else {
                        this.setSummarizeText("");
                        this.setResMsg(response.msg);
                    }
                }
                else {
                    this.setSummarizeText("");
                    this.setResMsg("Unexpected Error");
                }
            }
            else {
                this.setSummarizeText("");
                this.setResMsg(undefined);
            }
        }
        this.setState({
            delayCounter: this.state.delayCounter - 1
        })
    }

    render() {
        let { summarizeText, resMsg } = this.state;

        return (
            <>
                <Typography variant="h5" color="text.primary" fontSize="1.5rem" fontWeight="bold" margin="1rem" >
                    Summarize Text
                </Typography>
                {resMsg ? <Alert sx={{ marginTop: 1 }} severity="error">{resMsg}</Alert> : null}
                <TextField label="Original Text" variant="outlined" onChange={this.handleInput}
                    fullWidth
                    multiline
                    rows={9}
                />
                <TextField label="Summarize Text" variant="outlined"
                    fullWidth
                    multiline
                    rows={9}
                    value={summarizeText}
                    sx={{ marginTop: "1rem" }}
                />
            </>
        )
    }
}
