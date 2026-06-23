import React, { useState } from 'react';
import axios from 'axios';
import '../EmployeeDashboard.css';

const AddCustomer: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', date_of_birth: '', address: '', 
        identity_number: '', gender: '', marital_status: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        
        // تحويل البيانات لـ FormData
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key as keyof typeof formData]);
        });

        try {
            await axios.post('http://127.0.0.1:8000/api/employee/customers', data, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                }
            });
            alert("تم إضافة العميل بنجاح");
        } catch (error: any) {
            console.error("خطأ:", error.response?.data);
            alert("فشل الإضافة: تأكدي من تعبئة جميع الحقول بشكل صحيح");
        }
    };

    return (
        <div className="em-section">
            <h2 className="em-section-title">Add New Customer</h2>
            <input className="em-modal-input" name="name" placeholder="Full Name" onChange={handleChange} />
            <input className="em-modal-input" name="email" type="email" placeholder="Email Address" onChange={handleChange} />
            <input className="em-modal-input" name="date_of_birth" type="date" onChange={handleChange} />
            <input className="em-modal-input" name="address" placeholder="Address" onChange={handleChange} />
            <input className="em-modal-input" name="identity_number" placeholder="Identity Number" onChange={handleChange} />
            
            <select className="em-modal-input" name="gender" onChange={handleChange} style={{background: '#1A1A1A', color: 'white'}}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>

            <select className="em-modal-input" name="marital_status" onChange={handleChange} style={{background: '#1A1A1A', color: 'white'}}>
                <option value="">Marital Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
            </select>

            <button className="em-btn-add" onClick={handleSubmit}>Create Customer</button>
        </div>
    );
};
export default AddCustomer;