import React from 'react'
import Link from 'next/link'
import styles from './Footer.module.css'

const Footer: React.FC = () => {
  return (
    <footer className={styles.footerBig}>
      <p>© 2024 Joe Lee. All rights reserved.</p>
      <Link href="/license">
        License
      </Link>
    </footer>
  );
};

export default Footer;