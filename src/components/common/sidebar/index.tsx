import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { Page } from "src/interfaces/page";
import get from "lodash/get";
import {
  getSideBarPages,
  getFooterPages
} from 'src/pages';

const RenderLinks = ({linkData}): JSX.Element => {

  return <>{linkData.map(page => {
    let itemStyle = styles.item;
    if(get(page, "navigation.disabled")){
      itemStyle = styles.itemDisabled;
    }
    return (
      <Link to={page.route}>
        <div className={itemStyle}>
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
          <RenderLinks linkData={sideBarPages} />
        </div>
        <div className={styles.footer}>
          <RenderLinks linkData={footerLinkPages} />
        </div>
      </div>
  );
};
