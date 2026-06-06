import React from 'react';
import './IconText.css';
interface IconTextProps {
    icon: string;   
    text: string;
}
const IconText: React.FC<IconTextProps> = ({ icon, text }) => {
    return (
        <div className="ma-icon-text">
        <img className="ma-icon" src={icon} alt="icon" />
        <p className="ma-text">{text}</p>
        </div>
    );
};

export default IconText;