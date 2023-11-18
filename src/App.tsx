import "./App.scss";
import SidebarComponent from "./components/sidebar/components/sidebar-component/sidebar.component";

interface AppProps {
  children: JSX.Element;
}

function App({ children }: AppProps) {
  return (
    <>
      <SidebarComponent>{children}</SidebarComponent>
    </>
  );
}

export default App;
