import React, { Component } from 'react';
import { Grid, Typography, TextField, Select, MenuItem, Button, Alert, CircularProgress, List, ListItem } from '@mui/material';
import { fetchWebsiteExtraction, fetchFileExtraction } from '../../api/BackendAPI';

export default class TextExtraction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "url",
            url: "",
            file: undefined,
            data: undefined,
            resMsg: undefined,
            isLoading: false
        }
    }

    setFile = (file) => {
        this.setState({
            file: file
        })
    }

    setData = (data) => {
        this.setState({
            data: data
        })
    }

    setResMsg = (resMsg) => {
        this.setState({
            resMsg: resMsg
        })
    }

    setIsLoading = (isLoading) => {
        this.setState({
            isLoading: isLoading
        })
    }

    handleTypeSelect = (e) => {
        this.setState({
            type: e.target.value,
            url: "",
            file: "",
            data: undefined,
            resMsg: undefined,
            isLoading: false
        })
    }

    handleFileSelect = (e) => {
        this.setFile(e.target.files[0]);
    }

    handleInput = (e) => {
        this.setState({
            url: e.target.value
        })
    }

    handleSubmit = () => {
        const { type, url, file } = this.state;

        this.setIsLoading(true);

        if (type === "url") {
            this.fetchDataFromUrl(url);
        }
        else if (type === "file") {
            this.fetchDataFromFile(file);
        }
    }

    fetchDataFromUrl = async (url) => {
        const response = await fetchWebsiteExtraction(url);
        if (response) {
            if (response.website) {
                this.setData(response.website);
                this.setResMsg(undefined);
                this.setIsLoading(false);
            }
            else {
                this.setData(undefined);
                this.setResMsg(response.msg);
                this.setIsLoading(false);
            }
        }
        else {
            this.setData(undefined);
            this.setResMsg("Unexpected Error");
            this.setIsLoading(false);
        }
    }

    fetchDataFromFile = async (file) => {
        const response = await fetchFileExtraction(file);
        if (response) {
            if (response.text) {
                this.setData(response.text.split(/\r?\n/));
                this.setResMsg(undefined);
                this.setIsLoading(false);
            }
            else {
                this.setData(undefined);
                this.setResMsg(response.msg);
                this.setIsLoading(false);
            }
        }
        else {
            this.setData(undefined);
            this.setResMsg("Unexpected Error");
            this.setIsLoading(false);
        }
    }

    render() {
        const { type, data, resMsg, isLoading } = this.state;

        return (
            <>
                <Typography variant="h5" color="text.primary" fontSize="1.5rem" fontWeight="bold" margin="1rem" >
                    Text Extraction
                </Typography>
                <Grid spacing={1} columns={16} >
                    <Grid item xs={4} display="inline-block">
                        <Select
                            value={type}
                            label="Type"
                            onChange={this.handleTypeSelect}
                        >
                            <MenuItem value={"url"}>URL</MenuItem>
                            <MenuItem value={"file"}>FILE</MenuItem>
                        </Select>

                    </Grid>
                    <Grid item xs={8} display="inline-block">
                        <div
                            style={{ marginTop: "-2rem" }}
                        >
                            {type === "url" ?
                                <TextField sx={{ marginTop: "-1rem", maxWidth: "11rem", marginLeft: "0.5rem", marginRight: "0.5rem" }} label="" variant="outlined" onChange={this.handleInput} />
                                :
                                <input style={{ marginTop: "1rem", maxWidth: "11rem", marginLeft: "0.5rem", marginRight: "0.5rem" }} type="file" name="file" accept="*" onChange={this.handleFileSelect} />
                            }
                        </div>

                    </Grid>
                    <Grid item xs={4} display="inline-block">
                        <Button
                            variant="contained"
                            component="label"
                            sx={{ height: "3.5rem" }}
                            onClick={this.handleSubmit}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
                {resMsg ? <Alert sx={{ marginTop: 1 }} severity="error">{resMsg}</Alert> : null}
                {isLoading ? <CircularProgress sx={{ marginTop: 1 }} /> : null}
                {type === "url" ?
                    data ?
                        <List>
                            <Typography variant="h5" color="text.primary" fontSize="1.5rem" fontWeight="bold" margin="1rem" >
                                {data.title}
                            </Typography>
                            {data.contents.length > 0 ? data.contents.map((item, index) => {
                                return (
                                    <ListItem>
                                        < Typography variant="p" color="text.primary" fontSize="1rem" display="block" margin="1rem"  >
                                            <span style={{ fontWeight: "bold" }}>{`${index}. `}</span>
                                            {`${item}`}
                                        </Typography>
                                    </ListItem>

                                )
                            })
                                : null
                            }
                        </List>
                        : null
                    : type === "file" ?
                        data ?
                            data.length > 0 ? data.map((item, index) => {
                                return (
                                    <ListItem>
                                        <Typography variant="p" color="text.primary" fontSize="1rem" display="block"   >
                                            {`${item}`}
                                        </Typography>
                                    </ListItem>

                                )
                            })
                                : null
                            : null
                        : null
                }
            </>
        )
    }
}
