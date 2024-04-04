import AppNav from "./AppNav";
import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import { Outlet } from "react-router-dom";
export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} copyright by syed tawseef
        </p>
      </footer>
    </div>
  );
}
