import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { Page } from 'src/interfaces/page';
import {
  getSideBarPages,
  getFooterPages
} from 'src/pages';

const RenderLink = ({linkData}): JSX.Element => {

  return <>{linkData.map(page => {
    return (
      <Link to={page.route}>
        <div className={styles.item}>
          {page.icon &&
            <page.icon />
          }
          <span className={styles.label}>{page.title}</span>
        </div>
      </Link>
    )
  })}</>;

}

export const Sidebar: React.FC = () => {

  const sideBarPages = getSideBarPages();
  const footerLinkPages = getFooterPages();

  return (
      <div className={styles.sidebar}>
        <div className={styles.body}>
          <RenderLink linkData={sideBarPages} />
        </div>
        <div className={styles.footer}>
          <RenderLink linkData={footerLinkPages} />
        </div>
      </div>
  );
};
