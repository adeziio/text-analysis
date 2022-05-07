import React, { Component } from 'react';
import { Typography } from '@mui/material';

export default class Help extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <>
                <Typography variant="h5" color="text.primary" fontSize="1.5rem" fontWeight="bold" margin="1rem" >
                    Help
                </Typography>
                <Typography variant="p" color="text.primary" fontSize="1rem" display="block" margin="1rem" >
                    <span style={{ fontWeight: "bold" }}>Sentiment Analysis </span>
                    is a natural language processing (NLP) technique used to determine whether data is positive, negative, or neutral.
                </Typography>
                <Typography variant="p" color="text.primary" fontSize="1rem" display="block" margin="1rem" >
                    <span style={{ fontWeight: "bold" }}>Summarize Text </span>
                    is an automatic summarization process to create a subset that represents the most important or relevant information within the original content.
                </Typography>
                <Typography variant="p" color="text.primary" fontSize="1rem" display="block" margin="1rem" >
                    <span style={{ fontWeight: "bold" }}>Language Detection </span>
                    is the problem of determining which natural language given content is in.
                </Typography>
            </>
        )
    }
}