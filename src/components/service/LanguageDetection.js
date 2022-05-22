import React, { Component } from 'react';
import { Typography, TextField, Alert } from '@mui/material';
import isoCodes from './../../data/isoCodes.json';
import { fetchLanguageDetection } from '../../api/BackendAPI';

export default class LanguageDetection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalText: "",
            languages: {},
            delayCounter: 0,
            resMsg: undefined
        }
    }

    setLanguages = (languages) => {
        this.setState({
            languages: languages
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
                const response = await fetchLanguageDetection(originalText.trim());
                if (response) {
                    if (response.language_probability) {
                        this.setLanguages(response.language_probability);
                        this.setResMsg(undefined);
                    }
                    else {
                        this.setLanguages({});
                        this.setResMsg(response.msg);
                    }
                }
                else {
                    this.setLanguages({})
                    this.setResMsg("Unexpected Error");
                }
            }
            else {
                this.setLanguages({});
                this.setResMsg(undefined);
            }
        }
        this.setState({
            delayCounter: this.state.delayCounter - 1
        })
    }

    render() {
        const { languages, resMsg } = this.state;
        const languages_list = Object.keys(languages).sort((a, b) => languages[b] - languages[a])

        return (
            <>
                <Typography variant="h5" color="text.primary" fontSize="1.5rem" fontWeight="bold" margin="1rem" >
                    Language Detection
                </Typography>
                <TextField label="Text" variant="outlined" onChange={this.handleInput}
                    multiline
                    maxRows={15}
                />
                {resMsg ? <Alert sx={{ marginTop: 1 }} severity="error">{resMsg}</Alert> : null}
                {languages_list.length > 0 ?
                    <>
                        <Typography variant="h5" color="text.primary" fontSize="1.5rem" fontWeight="bold" margin="1rem" >
                            Possible Languages
                        </Typography>
                        {languages_list.map((key, index) => {
                            return (
                                <Typography key={`${key}-${index}`} variant="p" color="text.primary" fontSize="1rem" display="block" margin="1rem" >
                                    <span style={{ fontWeight: "bold" }}>{`${index + 1}. `}</span>
                                    {`${isoCodes[key]["name"]}`}
                                </Typography>
                            )
                        })

                        }
                    </> : null
                }
            </>
        )
    }
}
