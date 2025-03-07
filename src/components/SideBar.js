import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFilter } from "../store/taskSlice";
import { logout } from "../store/authSlice";
import { useSelector } from "react-redux";

/**
 * SideBar component displays the sidebar with user profile, task lists, and statistics.
 *
 * @param {Object} props - The component props.
 * @param {string} props.userName - The name of the user to be displayed in the greeting.
 *
 * @returns {JSX.Element} The rendered sidebar component.
 *
 * @example
 * <SideBar userName="John Doe" />
 *
 * @component
 */
const SideBar = ({ userName }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };
    const tasks = useSelector((state) => state.tasks.tasks);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return (
        <div className="sidebar">
            <div className="user-profile" onClick={() => setShowDropdown(!showDropdown)}>
                <div className="avatar">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIxioSwj_zZl2yzntHpuDRq_O6TlVidyWtSw&s"
                        alt="User avatar"
                    />
                </div>
                <p className="user-greeting">Hey, {userName}</p>
                {showDropdown && (
                    <div className="user-dropdown d-flex flex-column">
                        <button className="btn">My Profile</button>
                        <button className="btn" onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>

            <div className="lists-section">
                <div className="list-item active" onClick={() => dispatch(setFilter("all"))}>
                    <i className="bi bi-card-checklist"></i>
                    <span>All Tasks</span>
                </div>
                <div className="list-item selected">
                    <i className="bi bi-calendar-day"></i>
                    <span>Today</span>
                </div>
                <div className="list-item" onClick={() => dispatch(setFilter("important"))}>
                    <i className="bi bi-star"></i>
                    <span>Important</span>
                </div>
                <div className="list-item">
                    <i className="bi bi-calendar"></i>
                    <span>Planned</span>
                </div>
                <div className="list-item">
                    <i className="bi bi-person"></i>
                    <span>Assigned to me</span>
                </div>
            </div>

            <div className="add-list-btn">
                <i className="bi bi-plus"></i>
                <span>Add list</span>
            </div>

            <div className="stats-section">
                <div className="stats-header">
                    <div>
                        <div>Today Tasks</div>
                        <div className="task-count">{totalTasks}</div>
                    </div>
                    <div className="info-icon">
                        <i className="bi bi-info-circle"></i>
                    </div>
                </div>

                <div className="progress-chart">
                    <div className="donut-chart">
                        <div className="donut-placeholder" style={{
                            background: `conic-gradient(var(--primary-color) 0% ${progress}%, #333 ${progress}% 100%)`
                        }}></div>
                    </div>
                    <div className="chart-legend">
                        <div className="legend-item">
                            <span className="pending-dot"></span>
                            <span>Pending</span>
                        </div>
                        <div className="legend-item">
                            <span className="done-dot"></span>
                            <span>Done</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SideBar;
