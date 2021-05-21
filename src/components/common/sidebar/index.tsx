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
    let Icon = undefined;
    if(get(page, "navigation.disabled")){
      itemStyle = styles.itemDisabled;
    }
    if(get(page, "navigation.icon")){
      Icon = page.navigation.icon;
    }
    return (
      <Link key={page.title} to={page.route}>
        <div className={itemStyle}>
          {Icon &&
            <Icon />
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
