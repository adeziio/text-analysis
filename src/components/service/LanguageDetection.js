import React, { Component } from 'react';
import { Typography, TextField } from '@mui/material';

export default class LanguageDetection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalText: "",
            languages: {},
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
                fetch("https://text-analysis12.p.rapidapi.com/language-detection/api/v1.1", {
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json",
                        "x-rapidapi-host": "text-analysis12.p.rapidapi.com",
                        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY
                    },
                    "body": JSON.stringify({
                        "text": originalText.trim()
                    })
                })
                    .then(response => response.json())
                    .then(resData => { this.setState({ languages: resData.language_probability ?? {} }) })
            }
            else {
                this.setState({
                    languages: {}
                })
            }
        }
        this.setState({
            delayCounter: this.state.delayCounter - 1
        })
    }

    render() {
        let { languages } = this.state;
        let languages_list = Object.keys(languages).sort((a, b) => languages[b] - languages[a])

        let languageNames = new Intl.DisplayNames(['en'], {
            type: 'language'
        });

        return (
            <>
                <Typography variant="h5" color="text.primary" fontSize="1.5rem" fontWeight="bold" margin="1rem" >
                    Language Detection
                </Typography>
                <TextField label="Text" variant="outlined" onChange={this.handleInput}
                    multiline
                    maxRows={15}
                />

                {languages_list.length > 0 ?
                    <>
                        <Typography variant="h5" color="text.primary" fontSize="1.5rem" fontWeight="bold" margin="1rem" >
                            Possible Languages
                        </Typography>
                        {languages_list.map((key, index) => {
                            return (
                                <Typography variant="p" color="text.primary" fontSize="1rem" display="block" margin="1rem" >
                                    <span style={{ fontWeight: "bold" }}>{`${index + 1}. `}</span>
                                    {`${languageNames.of(key)}`}
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
