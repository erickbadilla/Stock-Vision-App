import React, { FunctionComponent } from "react";
import styles from "./Footer.module.css";

const Footer: FunctionComponent = () => {
  return (
    <footer className={styles.footer}>
      <p>
        &copy; {new Date().getFullYear()} Stock Vision. All Rights Reserved.
      </p>

      <p className={styles.footerLastText}>Made with ❤️ by Erick Badilla</p>
    </footer>
  );
};

export default Footer;
