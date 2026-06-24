import { useState } from 'react';
import axios from 'axios';
import "../AccountCenter.css"

const ProfileSettings = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

    const handleUpdate = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.put('http://localhost:8000/api/user/update-profile', formData, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Accept': 'application/json' 
                }
            });
            alert("Profile updated successfully!");
        } catch (err: any) {
            console.error("Update error:", err.response?.data);
            alert("Failed to update: " + JSON.stringify(err.response?.data?.errors || "Check input"));
        }
    };
    return (
        <div className="ad-section">
            <h2 className="ad-section-title">Edit Personal Information</h2>
            <div className="ad-modal">
                <input type="text" placeholder="Name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <input type="text" placeholder="Phone" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                <button className="ad-btn-add" onClick={handleUpdate}>Save Changes</button>
            </div>
        </div>
    );
};
export default ProfileSettings;