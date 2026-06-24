import React, { useState } from 'react';
import "../components/EmployeeDashboard/EmployeeDashboard.css";

import PendingApprovals from '../components/EmployeeDashboard/PendingApprovals/PendingApprovals';
import PendingTransfers from '../components/EmployeeDashboard/PendingTransfers/PendingTransfers';
import PendingWithdrawals from '../components/EmployeeDashboard/PendingWithdrawals/PendingWithdrawals';
import CustomerSearch from '../components/EmployeeDashboard/CustomerSearch/CustomerSearch';

import CustomerProfile from '../components/EmployeeDashboard/CustomerProfile/CustomerProfile';
import AddCustomer from '../components/EmployeeDashboard/AddCustomer/Add Customer';

const EmployeeDashboard: React.FC = () => {
    const [view, setView] = useState('approvals');
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null); // حالة لتخزين العميل المختار
    
    const btnClass = (name: string) => `em-nav-btn ${view === name ? 'active' : ''}`;

    // دالة للانتقال للبروفايل مع تمرير بيانات العميل
    const openProfile = (customer: any) => {
        setSelectedCustomer(customer);
        setView('profile');
    };

    return (
        <div className="em-container">
            <aside className="em-sidebar">
                <h3 style={{color: 'white', padding: '10px'}}>Dashboard</h3>
                <button className={btnClass('approvals')} onClick={() => setView('approvals')}>Approvals</button>
                <button className={btnClass('transfers')} onClick={() => setView('transfers')}>Transfers</button>
                <button className={btnClass('withdrawals')} onClick={() => setView('withdrawals')}>Withdrawals</button>
                <hr style={{width: '100%', borderColor: '#333'}} />
                <button className={btnClass('search')} onClick={() => setView('search')}>Customer Search</button>
                <button className={btnClass('add-customer')} onClick={() => setView('add-customer')}>Add Customer</button>
            </aside>

            <main className="em-main">
                {view === 'approvals' && <PendingApprovals />}
                {view === 'transfers' && <PendingTransfers />}
                {view === 'withdrawals' && <PendingWithdrawals />}
                {/* نمرر دالة openProfile لمكون البحث ليتمكن من فتح البروفايل */}
                {view === 'search' && <CustomerSearch onSelectCustomer={openProfile} />}
                {view === 'add-customer' && <AddCustomer />}
                {view === 'profile' && <CustomerProfile customer={selectedCustomer} />}
            </main>
        </div>
    );
};

export default EmployeeDashboard;