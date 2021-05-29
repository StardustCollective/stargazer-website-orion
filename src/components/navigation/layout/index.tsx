import { Header, Sidebar } from "components/navigation";
import styles from "./index.module.scss";
import bottomLogo from 'assets/images/bottom-logo.svg';

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles.bodyWrapper}>
        <Sidebar />
        <div className={styles.contentWrapper}>
          {children}
          <div className={styles.bottomLogoWrapper}>
            <img
              className={styles.bottomLogo}
              src={bottomLogo}
              alt="logo"
            />
          </div>
        </div>
      </div>
    </>
  );
};
