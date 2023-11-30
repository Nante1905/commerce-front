import SidebarComponent from "../../components/sidebar-component/sidebar.component";
import { NavItem } from "../../types/navItem.type";

interface SidebarRootProps {
  children: JSX.Element;
}

const SidebarRoot = ({ children }: SidebarRootProps) => {
  const navs: NavItem[] = [
    {
      text: "Dashboard",
      icon: "bx bx-home-alt",
      link: "#",
      authorization: ["Direction des Achats"],
    },
  ];

  return <SidebarComponent navItems={navs}>{children}</SidebarComponent>;
};

export default SidebarRoot;
