import { FunctionComponent } from "react";
import styles from "./footer.module.css";

export const Footer: FunctionComponent = () => {
  return (
    <footer className={styles.footer}>
      <p>
        &copy; {new Date().getFullYear()} Stock Vision. All Rights Reserved.
      </p>

      <p className={styles.footerLastText}>Made with ❤️ by Erick Badilla</p>
    </footer>
  );
};
