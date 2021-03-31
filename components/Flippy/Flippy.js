import React from "react";
import styles from "./Flippy.module.css";

const Horizontal = () => {
  return (
    <div className={styles.flipperTile}>
      <div
        className={styles.flipperTilewrap}
        //onTouchStart="this.classNameList.add('istouchdevice');this.classNameList.toggle('hover');"
      >
        <div className={styles.flipperTilefrontDos}>First tile front</div>
        <div className={styles.flipperTilefront}>First tile front</div>
        <div className={styles.flipperTileback}>First tile back</div>
      </div>
    </div>
  );
};

export const BackSide = ({ children }) => {
  return (
  <div className={styles.flipperTileback}>{children}</div>
  );
};

export const FrontSide = ({ children }) => {
  return <div className={styles.flipperTilefront}>{children}</div>;
};

export const FrontSideDos = ({ children }) => {
  return <div className={styles.flipperTilefrontDos}>{children}</div>;
};

export const Vertical = ({ children }) => {
  return (
    <div className={`${styles.flipperTile} ${styles.vertical}`}>
      <div className={styles.flipperTilewrap}>
        <div>{children}</div>
      </div>
    </div>
  );
};

const Flippy = ({ children }) => {
  return <div className={styles.flipperBoard}>{children}</div>;
};
export default Flippy;
