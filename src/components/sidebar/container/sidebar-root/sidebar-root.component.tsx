import SidebarComponent from "../../components/sidebar-component/sidebar.component";
import { NavItem } from "../../types/navItem.type";

interface SidebarRootProps {
  children: JSX.Element;
}

const SidebarRoot = ({ children }: SidebarRootProps) => {
  const navs: NavItem[] = [
    {
      text: "Liste des demandes",
      icon: "bx bx-home-alt",
      link: "/demandes/",
      authorization: ["Direction des Achats", "Direction Financière"],
    },
    {
      text: "Demandes par nature",
      icon: "bx bx-home-alt",
      link: "/demandes/nature",
      authorization: ["Direction des Achats"],
    },
  ];

  return <SidebarComponent navItems={navs}>{children}</SidebarComponent>;
};

export default SidebarRoot;
