import { useSelector } from "react-redux";
import { AuthenticationStore } from "../../../authentication/store/authentication.store";
import "./nav-item.component.scss";

interface NavItemProps {
  navItem: NavItem;
}

const NavItemComponent = (props: NavItemProps) => {
  const employe = useSelector(
    (state: AuthenticationStore) => state.authentication.user
  );

  if (props.navItem.authorization.includes(employe?.direction.nom as string)) {
    return (
      <li className="nav-link">
        <a href={props.navItem.link}>
          <i className="bx bx-home-alt icon"></i>
          <span className="text nav-text">{props.navItem.text}</span>
        </a>
      </li>
    );
  }
};

export default NavItemComponent;
