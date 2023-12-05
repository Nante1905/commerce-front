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
      text: "Insertion de besoin",
      icon: "",
      link: "/demandes/create",
      authorization: [],
    },
    {
      text: "Demandes par nature",
      icon: "bx bx-home-alt",
      link: "/demandes/nature",
      authorization: ["Direction des Achats", "Magasin"],
    },
    {
      text: "Demandes de proforma",
      icon: "bx bx-home-alt",
      link: "/proforma/demande",
      authorization: ["Direction des Achats"],
    },
    {
      text: "Proforma en attente",
      icon: "bx bx-home-alt",
      link: "/proforma/demandes/sans-reponse",
      authorization: ["Direction des Achats"],
    },
    {
      text: "Réponse aux proformas",
      icon: "bx bx-home-alt",
      link: "/proforma/demandes/avec-reponse",
      authorization: ["Direction des Achats"],
    },
    {
      text: "Liste des bons de commandes",
      icon: "bx bx-home-alt",
      link: "/bon-commandes",
      authorization: ["Direction des Achats"],
    },
    {
      text: "Saisir un bon de livraison",
      icon: "bx bx-home-alt",
      link: "/bon-livraison/saisie",
      authorization: ["Direction des Achats"],
    },
    {
      text: "Liste des bons de livraison",
      icon: "bx bx-home-alt",
      link: "/bon-livraison",
      authorization: ["Direction des Achats"],
    },
    {
      text: "Saisir une facture",
      icon: "bx bx-home-alt",
      link: "/facture/saisie",
      authorization: ["Magasin"],
    },
    {
      text: "Liste des factures",
      icon: "bx bx-home-alt",
      link: "/facture",
      authorization: ["Magasin"],
    },
    {
      text: "Saisir un bon de réception",
      icon: "bx bx-home-alt",
      link: "/bon-reception/saisie",
      authorization: ["Magasin"],
    },
    // {
    //   text: "Liste des bons de réception",
    //   icon: "bx bx-home-alt",
    //   link: "/bon-reception",
    //   authorization: ["Magasin"],
    // },
    {
      text: "Saisir une entrée de stock",
      icon: "bx bx-home-alt",
      link: "/entre-stock",
      authorization: ["Magasin"],
    },
    {
      text: "Liste des bons d'entrée",
      icon: "bx bx-home-alt",
      link: "/bon-entree",
      authorization: ["Magasin"],
    },
    {
      text: "Saisir une sortie de stock",
      icon: "bx bx-home-alt",
      link: "/sortie-stock",
      authorization: ["Magasin"],
    },
    {
      text: "Liste des bons de sortie",
      icon: "bx bx-home-alt",
      link: "/bon-Sortie",
      authorization: ["Magasin"],
    },
    {
      text: "Etat de stock",
      icon: "bx bx-home-alt",
      link: "/etat-stock",
      authorization: ["Magasin", "Direction Financière"],
    },
    {
      text: "Dispatch des articles",
      icon: "bx bx-home-alt",
      link: "/dispatch",
      authorization: ["Direction des Achats"],
    },
  ];

  return <SidebarComponent navItems={navs}>{children}</SidebarComponent>;
};

export default SidebarRoot;
