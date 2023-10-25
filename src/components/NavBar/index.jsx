import React, { Component, useState } from 'react';
import { Popover, Typography, Button } from '@mui/material';
import './style.css';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPopoverOpen: false,
            anchorEl: null,
        };

    this.electricitySentences = [
        "In summer, try to use fans instead of the air conditioner, and if you use your air conditioner, set it to 26 degrees.",
        "Reduce electricity consumption by turning off lights and appliances when not in use.",
        "Replace traditional incandescent light bulbs with LED light bulbs. LED light bulbs are more energy efficient and last longer than traditional light bulbs.",
        "Keep your air conditioner filter clean to ensure it operates efficiently. Dirty filters cause your air conditioner to use more power.",
        // Add more electricity sentences here
    ];

    this.waterSentences = [
        "Put in low-flow shower heads - ask at your hardware store.",
        "Save water by fixing any leaks in your plumbing.",
        "During the rainy season, set up a rainwater collection system to reduce the use of tap water.",
        "Use a dishwasher to wash dishes as it is usually more efficient than hand washing, saving water while ensuring a good result.",
        // Add more water sentences here
    ];
}
    handlePopoverOpen = (event) => {
        this.setState({
            isPopoverOpen: true,
            anchorEl: event.currentTarget,
        });
    };

    handlePopoverClose = () => {
        this.setState({
            isPopoverOpen: false,
        });
    };
    getRandomSentence(sentences) {
        const randomIndex = Math.floor(Math.random() * sentences.length);
        return sentences[randomIndex];
    }
    render() {
        const { isPopoverOpen, anchorEl } = this.state;

        return (
            <nav className="navbar navbar-default" style={{ backgroundColor: 'white' }}>
                <div className="container-fluid" style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                        <a className="navbar-brand" href="/home" style={{ color: 'black', marginLeft: '20px', fontFamily: 'Georgia', display: 'flex', alignItems: 'center' }}>
                            <img src="/logo192.png" alt="EnergyHub Logo" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                            <span>EnergyHub</span>
                        </a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center', fontFamily: 'Georgia' }}>
                        <input
                            type="text"
                            placeholder="Search..."
                            style={{ padding: '5px', borderRadius: '20px', width: '300px' }}
                        />
                    </div>
                    <div>
                        <a
                            style={{ color: 'black', marginRight: '50px', cursor: 'pointer', fontFamily: 'Georgia' }}
                            onClick={this.handlePopoverOpen}
                        >
                            Username
                        </a>
                        <Popover
                            open={isPopoverOpen}
                            anchorEl={anchorEl}
                            onClose={this.handlePopoverClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <div className="popover-content">
                                <Typography variant="h6" style={{ padding: '10px', fontSize: '18px', fontFamily: 'Georgia' }}>
                                    Electricity
                                </Typography>
                                <Typography style={{ padding: '10px', fontSize: '16px' }}>
                                    {this.getRandomSentence(this.electricitySentences)}
                                </Typography>
                                <hr style={{ width: '80%', margin: '10px auto' }} />
                                <Typography variant="h6" style={{ padding: '10px', fontSize: '18px', fontFamily: 'Georgia' }}>
                                    Water
                                </Typography>
                                <Typography style={{ padding: '10px', fontSize: '16px' }}>
                                    {this.getRandomSentence(this.waterSentences)}
                                </Typography>
                                <Link to="/home/education">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ margin: '10px auto', display: 'block', fontSize: '16px' }}
                                        onClick={this.handlePopoverClose}
                                    >
                                        View more
                                    </Button>
                                </Link>
                            </div>
                        </Popover>
                    </div>
                </div>
            </nav>
        );
    }
}










