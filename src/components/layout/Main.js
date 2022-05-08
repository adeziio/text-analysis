import React, { Component } from 'react';
import Header from './Header';
import Footer from "./Footer";
import SentimentAnalysis from '../service/SentimentAnalysis';
import SummarizeText from '../service/SummarizeText';
import Help from '../service/Help';
import LanguageDetection from '../service/LanguageDetection';
import TextExtraction from '../service/TextExtraction';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "Sentiment Analysis"
        }
    }

    setPage = (page) => {
        this.setState({
            page: page
        })
    }


    render() {
        const { page } = this.state;

        return (
            <>
                <div className="header-container">
                    <Header page={page} setPage={this.setPage} />
                </div>

                <div className="content-container">
                    {page === "Sentiment Analysis" ? <SentimentAnalysis />
                        : page === "Summarize Text" ? <SummarizeText />
                            : page === "Language Detection" ? <LanguageDetection />
                                : page === "Text Extraction" ? <TextExtraction />
                                    : page === "Help" ? <Help />
                                        : null
                    }
                </div>

                <div className="footer-container">
                    <Footer />
                </div>
            </>
        )
    }
}