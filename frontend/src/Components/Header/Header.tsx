import { Link } from "react-router-dom";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";

import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-wrapper">
          <div className="logo">
            <Link to="/">
              <img
                src={require("../../assets/svg/SHOPPE.svg").default}
                alt="Shoppe Logo"
              />
            </Link>
          </div>
          <div className="menu">
            <div className="site-menu">
              <div className="menu-item">
                <Link to="/shop">Shop</Link>
              </div>
              <div className="menu-item">
                <Link to="/blog">Blog</Link>
              </div>
              <div className="menu-item">
                <Link to="/our-story">Our Story</Link>
              </div>
            </div>

            <div className="account-menu">
              <div className="search">
                <Link to="/search">
                  <SearchOutlined style={{ fontSize: "20px" }} />
                </Link>
              </div>
              <div className="cart">
                <Link to="/cart">
                  <ShoppingCartOutlined style={{ fontSize: "20px" }} />
                </Link>
              </div>
              <div className="user">
                <Link to="/profile">
                  <UserOutlined style={{ fontSize: "20px" }} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
