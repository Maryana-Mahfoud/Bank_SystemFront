import { useState } from 'react';
import '../components/AccountCenter/AccountCenter.css'; 
import NotificationComponent from '../components/AccountCenter/NotificationComponent/NotificationComponent';
import DepositModal from '../components/AccountCenter/DepositModal/DepositModal';
import WithdrawalModal from '../components/DashboardComponent/WithdrawalModal/WithdrawalModal';
import BalanceCard from '../components/AccountCenter/BalanceCard/BalanceCard';
import TransactionList from '../components/AccountCenter/TransactionList/TransactionList';
import ProfileSettings from '../components/AccountCenter/ProfileSettings/ProfileSettings';
import PasswordChange from '../components/AccountCenter/PasswordChange/PasswordChange';


const AccountCenter = () => {
  console.log("The AccountCenter page has loaded successfully!"); 
  const [activeTab, setActiveTab] = useState('main'); 

  return (
    <div className="account-container">
      <NotificationComponent />
      
      <aside className="ac-sidebar">
        <h2>Banking system</h2>
        <ul className="ad-nav" style={{flexDirection: 'column'}}>
          <li className={`ac-nav-item ${activeTab === 'main' ? 'active' : ''}`} onClick={() => setActiveTab('main')}>primary</li>
          <li className={`ac-nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>Profile</li>
          <li className={`ac-nav-item ${activeTab === 'password' ? 'active' : ''}`} onClick={() => setActiveTab('password')}>password</li>
        </ul>
      </aside>

      <main className="ac-content">
        {activeTab === 'main' && (
          <div className="ad-section">
            <div className="ad-section-header">
              <h1>Home</h1>
              <div className="action-buttons-wrapper">
                <DepositModal />
                <WithdrawalModal/>
              </div>
            </div>
            <BalanceCard />
            <h2 style={{marginTop: '30px'}}>Operations Log</h2>
            <div className="ad-recent-card" style={{marginTop: '20px'}}>
                <TransactionList />
            </div>
          </div>
        )}

        {(activeTab === 'profile' || activeTab === 'password') && (
            <div className="ad-section">
                {activeTab === 'profile' && <ProfileSettings/>}
                {activeTab === 'password' && <PasswordChange />}
            </div>
        )}
      </main>
    </div>
  );
};

export default AccountCenter;