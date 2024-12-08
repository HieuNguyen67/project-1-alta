import React, { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Menu, Drawer } from "antd";
import { useLocation, NavLink, Link } from "react-router-dom";
import "./header.css";
import logo from "../../assets/image/logo.png";
import { MdOutlinePersonSearch } from "react-icons/md";
import { RiFileEditLine } from "react-icons/ri";

const Navbar: React.FC = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const location = useLocation();

  const toggleDrawer = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  const menuItems = [
    {
      key: "/",
      label: "Xem JD yêu cầu tuyển dụng",
      icon: (
        <MdOutlinePersonSearch
          style={{ fontSize: "25px", position: "relative", top: "5px" }}
        />
      ),
    },
    {
      key: "/personal-register",
      label: "Cá nhân đăng ký",
      icon: (
        <RiFileEditLine
          style={{ fontSize: "25px", position: "relative", top: "5px" }}
        />
      ),
    },
    {
      key: "/business-register",
      label: "Doanh nghiệp đăng ký",
      icon: (
        <RiFileEditLine
          style={{ fontSize: "25px", position: "relative", top: "5px" }}
        />
      ),
    },
  ];

  const renderMenu = () => (
    <div
      
      style={{ justifyContent: "center", flex: 1 }}
    >
      {menuItems.map((item) => (
        <span style={{ margin: "0 10px" }} key={item.key} >
          <NavLink
            to={item.key}
            style={({ isActive }) => ({
              color: isActive ? "rgb(255, 90, 0)" : "black",
              fontWeight: isActive ? "bold" : "bold",
            })}
          >
           {item.icon} {item.label}
          </NavLink>
        </span>
      ))}
    </div>
  );

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "#ffffff",
      }}
    >
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="logo" className="navbar-logo-image" />
        </Link>
        <div className="navbar-menu-desktop">{renderMenu()}</div>
        <div className="navbar-menu-mobile">
          <MenuOutlined onClick={toggleDrawer} style={{ fontSize: "1.5rem" }} />
        </div>
        <Drawer
          title="Menu"
          placement="right"
          closable={true}
          onClose={toggleDrawer}
          open={isDrawerVisible}
        >
          <Menu
            mode="vertical"
            selectedKeys={[location.pathname]}
            theme="light"
          >
            {menuItems.map((item) => (
              <Menu.Item key={item.key}>
                <NavLink
                  to={item.key}
                  style={({ isActive }) => ({
                    color: isActive ? "rgb(255, 90, 0)" : "black", 
                    fontWeight: isActive ? "bold" : "bold",
                  })}
                >
                  {item.label}
                </NavLink>
              </Menu.Item>
            ))}
          </Menu>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
