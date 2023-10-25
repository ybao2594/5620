import * as React from 'react';
import { Link } from 'react-router-dom';
export default function Home() {

    const titleStyle = {
        fontSize: '20px', // 设置所需的字体大小
        fontFamily: 'Georgia',
    };
    const boxStyle = {
        background: '#f9fbff',
        fontSize: '35px',
        padding: '30px',
        margin: '0 10px',
        border: '2px solid #eee',
        borderRadius: '10px',
        fontFamily: 'Georgia' ,
        fontWeight: 'bold',
    }

    const smallBoxStyle = {
        background: '#f9fbff',
        fontSize: '15px',
        padding: '25px',
        border: '2px solid #eee',
        borderRadius: '10px',
        width: 'calc((100% - 10px) / 2)', // 计算小盒子的宽度，考虑空隙
        margin: '0 15px', // 添加小盒子之间的空隙
        position: 'relative',
    };

    const arrowStyle = {
        fontSize: '25px',
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        cursor: 'pointer',
    };

    const boxContainerStyle = {
        marginTop: '20px', // 添加上外边距来分离标题和盒子
    };

    const smallBoxesContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '40px 0', // 添加内边距来分隔小盒子和 "box" 内容
    };


    return (
        <>
            <div className="row">
                <div className='col-md-6'>
                    <h1 style={titleStyle}>Home page</h1>
                </div>
                <div className='col-md-3'>
                </div>
            </div>
            <div className="row">
                <div className='col-md-15' style={boxContainerStyle}>
                    <div style={boxStyle}>
                        <p>EnergyHub: Energy Insights for a Better Today</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12" style={smallBoxesContainerStyle}>
                    <div style={smallBoxStyle}>
                        <h2 style={{ fontFamily: 'Georgia' , fontWeight: 'bold'}}>AI Q&A</h2>
                        <p>You can engage in intelligent Q&A with fastGPT. Based on the user's energy consumption patterns, lifestyle, and household characteristics, fastGPT provides personalized energy-saving recommendations.</p>
                        <Link to="/home/chat">
                            <span style={arrowStyle}>➜</span>
                        </Link>
                    </div>
                    <div style={smallBoxStyle}>
                        <h2 style={{ fontFamily: 'Georgia' , fontWeight: 'bold'}}>Social Incentives & User Feedback</h2>
                        <p>You can participate in an Energy-Saving Leaderboard, share-saving achievements and provide feedback to the energy company.</p>
                        <Link to="/home/social">
                            <span style={arrowStyle}>➜</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12" style={smallBoxesContainerStyle}>
                    <div style={smallBoxStyle}>
                        <h2 style={{ fontFamily: 'Georgia' , fontWeight: 'bold'}}>Energy Calculator</h2>
                        <p>You can input the device's power consumption and usage time, calculate the monthly or annual energy consumption and visualize the results.</p>
                        <Link to="/home/calculator">
                            <span style={arrowStyle}>➜</span>
                        </Link>
                    </div>
                    <div style={smallBoxStyle}>
                        <h2 style={{ fontFamily: 'Georgia' , fontWeight: 'bold'}}>Energy Education</h2>
                        <p> You can receive brief energy-saving tips each week (in the navigation bar) and access educational content on energy conservation and renewable energy.</p>
                        <Link to="/home/education">
                            <span style={arrowStyle}>➜</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}