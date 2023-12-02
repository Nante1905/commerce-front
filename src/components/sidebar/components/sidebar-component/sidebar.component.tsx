import { useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AuthenticationStore } from "../../../authentication/store/authentication.store";
import { NavItem } from "../../types/navItem.type";
import NavItemComponent from "../nav-item/nav-item.component";
import "./sidebar.component.scss";

interface SidebarProps {
  children: JSX.Element;
  navItems: NavItem[];
}

const SidebarComponent = ({ children, navItems }: SidebarProps) => {
  const sidebarRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const employe = useSelector(
    (state: AuthenticationStore) => state.authentication.user
  );

  return (
    <>
      <nav
        className="sidebar close"
        ref={sidebarRef}
        onMouseOver={() => sidebarRef.current?.classList.remove("close")}
        onMouseLeave={() => sidebarRef.current?.classList.add("close")}
      >
        <header>
          <div className="image-text">
            <span className="image">
              <img src="/spring-3.svg" alt="" />
            </span>

            <div className="text logo-text">
              <span className="name">
                {employe ? (
                  `${employe.nom} ${employe.prenom}`
                ) : (
                  <Link to="/login">Se connecter</Link>
                )}
              </span>
              <span className="profession">{employe?.direction.nom}</span>
            </div>
          </div>
        </header>

        <div className="menu-bar">
          <div className="menu">
            {/* <li
              className="search-box"
              onClick={() => sidebarRef.current?.classList.remove("close")}
            >
              <i className="bx bx-search icon" style={{}}></i>
              <input type="text" placeholder="Search..." />
            </li> */}

            <ul className="menu-links">
              {navItems.map((navItem, index) => (
                <NavItemComponent key={index} navItem={navItem} />
              ))}
              <li className="nav-link">
                <a href="#">
                  <i className="bx bx-home-alt icon"></i>
                  <span className="text nav-text">Dashboard</span>
                </a>
              </li>

              <li className="nav-link">
                <a href="#">
                  <i className="bx bx-bar-chart-alt-2 icon"></i>
                  <span className="text nav-text">Revenue</span>
                </a>
              </li>

              <li className="nav-link">
                <a href="#">
                  <i className="bx bx-bell icon"></i>
                  <span className="text nav-text">Notifications</span>
                </a>
              </li>

              <li className="nav-link">
                <a href="#">
                  <i className="bx bx-pie-chart-alt icon"></i>
                  <span className="text nav-text">Analytics</span>
                </a>
              </li>

              <li className="nav-link">
                <a href="#">
                  <i className="bx bx-heart icon"></i>
                  <span className="text nav-text">Likes</span>
                </a>
              </li>

              <li className="nav-link">
                <a href="#">
                  <i className="bx bx-wallet icon"></i>
                  <span className="text nav-text">Wallets</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="bottom-content">
            <li
              className=""
              style={{
                color: "#ffffff",
              }}
            >
              <a
                href="#"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
              >
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Logout</span>
              </a>
            </li>

            {/* <li className="mode">
              <div className="sun-moon">
                <i className="bx bx-moon icon moon"></i>
                <i className="bx bx-sun icon sun"></i>
              </div>
              <span className="mode-text text">Dark mode</span>
            </li> */}
          </div>
        </div>
      </nav>

      <section className="home">
        {children}
        {/* <div className="text">Dashboard Sidebar</div> */}
      </section>
    </>
  );
};

export default SidebarComponent;
