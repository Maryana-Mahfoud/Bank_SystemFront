import { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import '../AccountCenter.css'; 

const NotificationComponent = () => {
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // ربط الاتصال فقط إذا كنتِ متأكدة أن الباك-إند مهيأ لاستقباله
    const socket = io('http://127.0.0.1:8000', {
      auth: { token: token },
      reconnection: false 
    });

    socket.on('deposit_received', (data) => {
      setNotification(`New deposit received: ${data.amount} $`);
      setTimeout(() => setNotification(null), 5000);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (!notification) return null;

  return (
    <div className="notification-toast">
      <div className="toast-content">
        <span className="toast-icon">🔔</span>
        <p>{notification}</p>
      </div>
    </div>
  );
};

export default NotificationComponent;