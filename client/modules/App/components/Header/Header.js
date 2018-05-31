import React from 'react';

import styles from './Header.css';

export function Header(props, context) {
  return (
    <div className={styles.header}>
      <h1>Kanban-App</h1>
    </div>
  );
}

export default Header;
