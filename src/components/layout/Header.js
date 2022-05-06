import React, { Component } from 'react';
import { Button, AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, MenuItem, Grid, Tooltip } from '@mui/material';
import { MenuOutlined, Create, Help } from '@mui/icons-material';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorElLeft: null,
            anchorElRight: null
        }
    }

    setAnchorElLeft = (param) => {
        this.setState({
            anchorElLeft: param
        })
    }

    setAnchorElRight = (param) => {
        this.setState({
            anchorElRight: param
        })
    }

    setPage = (page) => {
        this.props.setPage(page);
        this.handleCloseRightMenu();
        this.handleCloseLeftMenu();
    }

    handleCloseLeftMenu = () => {
        this.setAnchorElLeft(null);
    }

    handleCloseRightMenu = () => {
        this.setAnchorElRight(null);
    }

    handleOpenLeftMenu = (event) => {
        this.setAnchorElLeft(event.currentTarget);
    }

    handleOpenRightMenu = (event) => {
        this.setAnchorElRight(event.currentTarget);
    }

    render() {
        const { page } = this.props;
        const { anchorElLeft, anchorElRight } = this.state;
        const leftOption = ['Sentiment Analysis', 'Summarize Text'];
        const rightOption = ['Help'];

        return (
            <>
                <AppBar position="fixed" sx={{ backgroundColor: "#2185d0" }}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, "&:hover": { cursor: "pointer" } }}
                                onClick={() => window.location.reload()}
                            >
                                <Grid container spacing={1}>
                                    <Grid item xs={5}>
                                        <Create sx={{ color: "lime", fontSize: "4rem" }} />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <span style={{ display: "block", marginBottom: "-0.5rem", marginTop: "0.5rem" }}>Text</span>
                                        <span style={{ display: "block" }}>Analysis</span>
                                    </Grid>
                                </Grid>
                            </Typography>

                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="current page"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={this.handleOpenLeftMenu}
                                    color="inherit"
                                >
                                    <MenuOutlined />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElLeft}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElLeft)}
                                    onClose={this.handleCloseLeftMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    {leftOption.map((option, index) => (
                                        <MenuItem key={`f-${option}-${index}`} onClick={() => { this.setPage(option); }}>
                                            <Typography textAlign="center">{option}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', "&:hover": { cursor: "pointer" }, marginRight: "2rem" } }}
                                onClick={() => window.location.reload()}
                            >
                                <Grid container spacing={0}>
                                    <Grid item xs={4}>
                                        <Create sx={{ color: "lime", fontSize: "4rem" }} />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <span style={{ display: "block", marginBottom: "-0.5rem", marginTop: "0.5rem" }}>Text</span>
                                        <span style={{ display: "block" }}>Analysis</span>
                                    </Grid>
                                </Grid>
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {leftOption.map((option, index) => (
                                    <Button
                                        key={`f2-${option}-${index}`}
                                        onClick={() => { this.setPage(option) }}
                                        sx={{ my: 2, color: page === option ? 'lime' : 'white', display: 'block' }}
                                    >
                                        {option}
                                    </Button>
                                ))}
                            </Box>

                            <Box sx={{ flexGrow: 0 }} >
                                <Tooltip title="Help">
                                    <Typography onClick={this.handleOpenRightMenu} sx={{ p: 0 }}>
                                        <Help className="pointer" fontSize="large" />
                                    </Typography>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElRight}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElRight)}
                                    onClose={this.handleCloseRightMenu}
                                >
                                    {rightOption.map((page, index) => (
                                        <MenuItem key={`p-${page}-${index}`} onClick={() => { this.setPage(page) }}>
                                            <Typography textAlign="center" >{page}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </>
        )
    }
}