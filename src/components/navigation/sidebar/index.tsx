import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { Page } from "interfaces/page";
import get from "lodash/get";
import {
  getSideBarPages,
  getFooterPages
} from 'pages';

const RenderLinks = ({linkData}): JSX.Element => {

  return <>{linkData.map(page => {
    let itemStyle = styles.item;
    let Icon = undefined;
    const linkStyles = {
      textDecoration: "none",
      pointerEvents: "auto",
    };

    if(get(page, "navigation.disabled")){
      itemStyle = styles.itemDisabled;
      linkStyles.pointerEvents = "none";
    }
    if(get(page, "navigation.icon")){
      Icon = page.navigation.icon;
    }

    return (
      <Link style={linkStyles} key={page.title} to={page.route}>
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
