import { Link } from "react-router-dom";
import * as React from 'react';

const titleStyle = {
    fontSize: '20px',
    fontFamily: 'Georgia',
};

const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
};

const boxStyle = {
    backgroundColor: '#f9fbff',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    marginTop: '20px',
};

const smallTitleRowStyle = {
    display: 'flex', // 水平排列
    justifyContent: 'space-between',
    marginTop: '13px',
};

const smallTitleStyle = {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Georgia',
};

const additionalBoxStyle = {
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '30px',
    marginTop: '20px',
    display: 'flex', // 水平排列
    justifyContent: 'space-between',
    alignItems:'center',
};

const buttonStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer',
    position: 'relative', // 为了定位弹出框
};

const dotStyle = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'gray',
    marginRight: '2px',
};
const popupBoxStyle = {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column', // 垂直排列
    width: '120px', // 调整宽度适应内容
    alignItems: 'center', // 居中
    marginTop: '5px',
};
const horizontalLineStyle = {
    width: '100%',
    height: '1px',
    backgroundColor: '#ccc',
    margin: '8px 0', // 添加上下间距
};
const newPopupBoxStyle1 = {
    // 添加样式，设置白色背景、灰色四角圆滑框、文本内容
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column', // 垂直排列
    width: '120px', // 调整宽度适应内容
    alignItems: 'center', // 居中
    marginTop: '5px',
};

export default function Home() {
    const [isPopupOpen, setIsPopupOpen] = React.useState(false);
    const [isDetailPopupOpen, setIsDetailPopupOpen] = React.useState(false);
    const [isStatusPopupOpen, setIsStatusPopupOpen] = React.useState(false);
    const [greenBoxColor, setGreenBoxColor] = React.useState('#f9fbff');
    const [greenBoxText, setGreenBoxText] = React.useState('Status');

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const toggleDetailPopup = (e) => {
        e.stopPropagation(); // Prevent the click event from reaching the outer elements
        setIsDetailPopupOpen(!isDetailPopupOpen);
    };
    const toggleStatusPopup = (e) => {
        e.stopPropagation();
        setIsStatusPopupOpen(!isStatusPopupOpen);
    };


    const handleStatusButtonClick = (color, text) => {
        setGreenBoxColor(color);
        setGreenBoxText(text);
        setIsStatusPopupOpen(false); // Close the Status popup
    };


    const closePopups = () => {
        setIsDetailPopupOpen(false);
        setIsStatusPopupOpen(false);
    };

    const handleDocumentClick = () => {
        closePopups();
    };

    React.useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [isDetailPopupOpen, isStatusPopupOpen]);

    return (
        <>
            <div className="row" style={rowStyle}>
                <div className='col-md-12'>
                    <h1 style={titleStyle}>User Feedback</h1>
                </div>
                <div className='col-md-3' style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '10px', fontFamily: 'Georgia' }}>Accounts</span>
                    <span>|</span>
                    <span style={{ marginLeft: '10px', fontFamily: 'Georgia' }}>Username</span>
                </div>
            </div>

            <div style={boxStyle}>
                <div style={smallTitleRowStyle}>
                    <div style={smallTitleStyle}>Feedback Status</div>
                    <div style={smallTitleStyle}>User Name</div>
                    <div style={smallTitleStyle}>Email</div>
                    <div style={smallTitleStyle}>Action</div>
                </div>

                <div style={additionalBoxStyle}>
                    <div style={{ backgroundColor: greenBoxColor , border: '1px solid #ccc', borderRadius: '8px', color: "white", padding: '5px'}}>{greenBoxText}</div>
                    <div>Username</div>
                    <div>Email</div>
                    <div className="button-style" style={buttonStyle} onClick={togglePopup}>
                        <div style={dotStyle}></div>
                        <div style={dotStyle}></div>
                        <div style={dotStyle}></div>
                        {isPopupOpen && (
                            <div style={popupBoxStyle}>
                                <button onClick={toggleDetailPopup} style={{ backgroundColor: "#f9fbff", border: '1px solid #ccc', borderRadius: '8px' }}>Detail</button>
                                <div style={horizontalLineStyle}></div>
                                <button onClick={toggleStatusPopup} style={{ backgroundColor: "#f9fbff", border: '1px solid #ccc', borderRadius: '8px' }}>Status</button>
                            </div>
                        )}
                        {isDetailPopupOpen && (
                            <div style={popupBoxStyle}>
                                12345
                            </div>
                        )}
                        {isStatusPopupOpen && (
                            <div style={popupBoxStyle}>
                                <button onClick={() => handleStatusButtonClick('#6cd736', 'Active')} style={{ color: "white", backgroundColor: "#6cd736", border: '1px solid #ccc', borderRadius: '8px' }}>Active</button>
                                <button onClick={() => handleStatusButtonClick('#ef0e5a', 'Down')} style={{ color: "white", backgroundColor: "#ef0e5a", border: '1px solid #ccc', borderRadius: '8px', marginTop: '5px' }}>Down</button>
                                <button onClick={() => handleStatusButtonClick('#2966e0', 'Pending')} style={{ color: "white", backgroundColor: "#2966e0", border: '1px solid #ccc', borderRadius: '8px', marginTop: '5px' }}>Pending</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}



