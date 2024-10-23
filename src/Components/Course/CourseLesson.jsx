import React, { useState } from "react";
import "../../assets/css/style.css";

const menuItems = ["Basics", "Phrases", "Food"];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState(menuItems[0]);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Lessons</h1>
      </div>
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li
              key={item}
              className={`sidebar-menu-item ${
                activeItem === item ? "active" : ""
              }`}
              onClick={() => setActiveItem(item)}
            >
              <div className="sidebar-menu-item-content">
                <span className="sidebar-menu-item-text">{item}</span>
                {activeItem === item && (
                  <span className="sidebar-menu-item-icon">&#9654;</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <p className="sidebar-progress">
          Progress:{" "}
          {(
            ((menuItems.indexOf(activeItem) + 1) / menuItems.length) *
            100
          ).toFixed(0)}
          %
        </p>
      </div>
    </aside>
  );
}
