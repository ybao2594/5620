import * as React from 'react';
import { Link } from 'react-router-dom';

export default function Social() {
    const titleStyle = {
        fontSize: '20px', // 设置所需的字体大小
        fontFamily: 'Georgia',
    };

    const rowStyle = {
        display: 'flex',
        justifyContent: 'space-between',
    };

    const boxStyle = {
        background: '#87A9FF',
        fontSize: '25px',
        padding: '30px',
        margin: '0 10px',
        border: '2px solid #eee',
        borderRadius: '10px',
        fontFamily: 'Georgia',
        fontWeight: 'bold',
        color: '#FFFFFF',
        position: 'relative', // 设置相对定位
        marginTop: '40px',
    };

    const buttonStyle = {
        position: 'absolute', // 设置绝对定位
        top: '30px', // 距离顶部的距离
        right: '30px', // 距离右侧的距离
        background: 'white', // 白色背景
        border: '2px solid #87A9FF', // 边框
        padding: '10px', // 内边距
        borderRadius: '5px', // 圆角边框
        color: '#87A9FF',
        fontSize: '14px',
    };

    const trophyImageStyle = {
        width: '250px', // 图像的宽度
        height: '250px', // 图像的高度
        marginRight: '30px', // 右侧间距
    };

    const smallBoxStyle = {
        background: '#87A9FF',
        padding: '10px',
        margin: '0 10px',
        border: '2px solid #87A9FF',
        borderRadius: '10px',
        flex: 1,
        marginTop: '30px',
    };

    const smallTitleStyle = {
        background: '#91d775',
        padding: '5px 10px',
        borderRadius: '10px',
        color: '#FFFFFF',
        fontSize: '14px',
        display: 'inline-block',
    };

    const smallContentStyle = {
        color: '#FFFFFF',
        fontSize: '14px',
    };

    const smallRankingStyle = {
        color: '#FFFFFF',
        fontSize: '30px',
    };

    const smallBoxAndImageContainer = {
        display: 'flex',
        alignItems: 'flex-start', // 使用此行来垂直对齐
    };

    const inputBoxStyle = {
        marginTop: '40px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '10px',
    };

    const inputStyle = {
        flex: 1,
        padding: '10px',
        border: '2px solid #87A9FF',
        borderRadius: '10px',
    };

    const buttonContainerStyle = {
        display: 'flex',
        marginLeft: '10px',
    };

    const blueButtonStyle = {
        background: '#87A9FF',
        color: 'white',
        padding: '10px',
        borderRadius: '10px',
        border: 'none',
        marginRight: '10px',
        cursor: 'pointer',
    };

    return (
        <>
            <div className="row" style={rowStyle}>
                <div className='col-md-12'>
                    <h1 style={titleStyle}>Social Incentives</h1>
                </div>
                <div className='col-md-3' style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '10px' , fontFamily: 'Georgia'}}>Accounts</span>
                    <span>|</span>
                    <span style={{ marginLeft: '10px' , fontFamily: 'Georgia' }}>Username</span>
                </div>
            </div>
            <div className="row">
                <div className='col-md-15'>
                    <div style={boxStyle}>
                        <p>Rank</p>
                        <Link to="/rankinglist">
                            <button style={buttonStyle}>View ranking list</button>
                        </Link>
                        <div style={smallBoxAndImageContainer}>
                            <div style={smallBoxStyle}>
                                <div style={smallTitleStyle}>
                                    Monthly Ranking
                                </div>
                                <p style={smallRankingStyle}>#225</p>
                                <p style={smallContentStyle}>Top the charts with your energy-saving efforts.</p>
                            </div>
                            <div style={smallBoxStyle}>
                                <div style={smallTitleStyle}>
                                    Overall  Ranking
                                </div>
                                <p style={smallRankingStyle}>#346</p>
                                <p style={smallContentStyle}>Energize your life with eco-friendly choices.</p>
                            </div>
                            <img
                                src="/Trophy.png"
                                alt="Trophy"
                                style={trophyImageStyle}
                            />
                        </div>
                    </div>
                    <div style={inputBoxStyle}>
                        <input type="text" style={inputStyle} placeholder="Share your achievements here, like: Electric: 100 + Water: 50" />
                        <div style={buttonContainerStyle}>
                            <Link to="/home">
                                <button style={blueButtonStyle}>Send</button>
                            </Link>
                        </div>
                    </div>
                    <div style={inputBoxStyle}>
                    <input type="text" style={inputStyle} placeholder="Write feedback here" />
                    <div style={buttonContainerStyle}>
                        <Link to="/home">
                            <button style={blueButtonStyle}>Send</button>
                        </Link>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}
