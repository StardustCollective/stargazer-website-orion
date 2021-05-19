import React from "react";
import Link from "next/link";

import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import PersonIcon from "@material-ui/icons/Person";
import SwapCallsIcon from "@material-ui/icons/SwapCalls";
import DashboardIcon from "@material-ui/icons/Dashboard";

import styles from "./index.module.scss";

export const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.body}>
        <Link href="/connect-wallet">
          <div className={styles.item}>
            <AccountBalanceWalletIcon />
            <span className={styles.label}>Connect Wallet</span>
          </div>
        </Link>
        <Link href="/buy-dag">
          <div className={styles.item}>
            <CreditCardIcon />
            <span className={styles.label}>Buy DAG</span>
          </div>
        </Link>
        <Link href="/portfolio">
          <div className={styles.item}>
            <PersonIcon />
            <span className={styles.label}>Portfolio</span>
          </div>
        </Link>
        <Link href="/swap">
          <div className={styles.item}>
            <SwapCallsIcon />
            <span className={styles.label}>Swap</span>
          </div>
        </Link>
        <Link href="/terminal">
          <div className={styles.item}>
            <DashboardIcon />
            <span className={styles.label}>Terminal</span>
          </div>
        </Link>
      </div>
      <div className={styles.footer}>
        <div className={styles.item}>
          <Link href="/terms-and-conditions">
            <span className={styles.label}>Terms & Conditions</span>
          </Link>
        </div>
        <div className={styles.item}>
          <Link href="/privacy-policy">
            <span className={styles.label}>Privacy Policy</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
