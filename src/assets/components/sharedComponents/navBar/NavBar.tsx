import { NavLink, useNavigate } from "react-router-dom";
import './NavBar.css';
import { useState } from "react";
import closeNav from '../../../images/homeImages/Close.svg';
import type { NavBarProps, NavItem } from '../interfaces/NavBar.ts';
import { useAuth } from "../../../context/AuthContext.tsx";

const NavBar = ({ logo, items, btn, smallBtn }: NavBarProps) => {
    const [js_isOpen, js_setOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const moveNavBar = () => {
        js_setOpen(prev => !prev);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    
const roleLinks = () => {
    if (!user) return null;
//choose if the user is admin or customer and show the links according to his role
    if (user.role === "admin") {
        return (
            <>
                <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
                <li><NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "active" : ""}>Admin Dashboard</NavLink></li>
            </>
        );
    }
    console.log("User role is:", user.role);

    if (user.role === "customer") {
        return (
            <>
                <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
                 <li><NavLink to='/account' className={({ isActive }) => isActive ? "active" : ""}>AccountCenter</NavLink></li>
                <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>Dashboard</NavLink></li>
                <li><NavLink to="/verify-account" className={({ isActive }) => isActive ? "active" : ""}>Verify Account</NavLink></li>
                
            </>
        );
    }
       if (user.role === "employee") {
        return (
            <>
                <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
                <li><NavLink to="/EmployeeDashboard" className={({ isActive }) => isActive ? "active" : ""}>Employee Dashboard</NavLink></li>
            </>
        );
    }

    return null;
};

    return (
        <>
            <nav className="border flex-between">
                <img src={logo} className="js_logo" alt="logo" />
                <ul>
                    {user ? (
                        // ✅ إذا مسجل دخول، عرض روابط الـ role
                        roleLinks()
                    ) : (
                        // ✅ إذا مش مسجل، عرض الروابط العادية
                        items.map((item: NavItem, index: number) => (
                            <li key={index}>
                                <NavLink 
                                    to={item.href} 
                                    className={({ isActive }) => isActive ? "active" : ""}
                                >
                                    {item.content}
                                </NavLink>
                            </li>
                        ))
                    )}
                </ul>

                <div className="js_signUp_logIn">
                    {user ? (
                        <button onClick={handleLogout} className="logout-btn">
                            Log Out
                        </button>
                    ) : (
                        <>
                            <p>
                                <NavLink to={btn[0].href}>{btn[0].content}</NavLink>
                            </p>
                            <button>
                                <NavLink to={btn[1].href}>{btn[1].content}</NavLink>
                            </button>
                        </>
                    )}
                </div>

                <button className="js_mobile_nav js_mobile_button" onClick={moveNavBar}>
                    <img src={smallBtn} className="js_strokes" alt="menu icon" />
                </button>
            </nav>

            {/* Mobile Nav */}
            <div className={`js_mobile_nav js_mobile_list_container ${js_isOpen ? 'js_slide_nav_list' : ''}`}>
                <button className="js_btn_close_nav" onClick={() => js_setOpen(false)}>
                    <img src={closeNav} alt="close nav" />
                </button>
                <ul className="js_mobile_list">
                    {user ? (
                        <>
                            {roleLinks()}
                            <li onClick={handleLogout}>Log Out</li>
                        </>
                    ) : (
                        <>
                            {items.map((item: NavItem, index: number) => (
                                <li key={index} onClick={() => js_setOpen(false)}>
                                    <NavLink to={item.href}>{item.content}</NavLink>
                                </li>
                            ))}
                            <li onClick={() => js_setOpen(false)}>
                                <NavLink to={btn[0].href}>{btn[0].content}</NavLink>
                            </li>
                            <li onClick={() => js_setOpen(false)}>
                                <NavLink to={btn[1].href}>{btn[1].content}</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </>
    );
};

export default NavBar;