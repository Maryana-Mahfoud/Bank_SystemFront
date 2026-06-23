import { useState } from 'react';
import axios from 'axios';
import "../AccountCenter.css";

const PasswordChange = () => {
  const [passwords, setPasswords] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });

  // دالة موحدة لتحديث الحالة
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = async () => {
    const token = localStorage.getItem('token');
    
    try {
      // تم حذف متغير response لأنه غير مستخدم، مما يلغي تحذير TypeScript
      await axios.post('http://localhost:8000/api/user/change-password', passwords, {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json' 
        }
      });
      
      alert("Password changed successfully!");
      setPasswords({ current_password: '', new_password: '', new_password_confirmation: '' });
      
    } catch (err: any) {
      const errorData = err.response?.data?.errors;
      const errorMsg = errorData 
        ? Object.values(errorData).flat().join('\n') 
        : (err.response?.data?.message || "Error updating password.");
      
      alert(errorMsg);
    }
  };

  return (
    <div className="ad-section">
      <h2 className="ad-section-title">Change Password</h2>
      <div className="ad-modal">
        <input 
            type="password" 
            name="current_password"
            placeholder="Current Password" 
            value={passwords.current_password}
            onChange={handleInputChange} 
        />
        <input 
            type="password" 
            name="new_password"
            placeholder="New Password" 
            value={passwords.new_password}
            onChange={handleInputChange} 
        />
        <input 
            type="password" 
            name="new_password_confirmation"
            placeholder="Confirm New Password" 
            value={passwords.new_password_confirmation}
            onChange={handleInputChange} 
        />
        <button className="ad-btn-add" onClick={handleChangePassword}>
            Update Password
        </button>
      </div>
    </div>
  );
};

export default PasswordChange;