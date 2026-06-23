import React from 'react';
import {type SectionTitleProps } from '../../sharedComponents/interfaces/Home';
import "./SectionTitle.css";

const SectionTitle: React.FC<SectionTitleProps> = ({ ftitle, title, subTitle, fbutton, sbutton, activeTab, setActiveTab }) => {
    return (
        <div className="ma-container flex-between section-margin">
            <div className="ma-fsection">
                <h1>{ftitle} <span>{title}</span></h1>
                <p>{subTitle}</p>
            </div>
            <div className="ma-btns flex-center">
                <button 
                    className={activeTab === 'individual' ? 'mar-btn active' : 'mar-btn'} 
                    onClick={() => setActiveTab('individual')}
                >{fbutton}</button>
                <button 
                    className={activeTab === 'businesses' ? 'mar-btn active' : 'mar-btn'} 
                    onClick={() => setActiveTab('businesses')}
                >{sbutton}</button>
            </div>
        </div>
    );
};
export default SectionTitle;