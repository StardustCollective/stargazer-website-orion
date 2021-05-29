
///////////////////////////
// Module Imports
///////////////////////////

import React from "react";
import classnames from "classnames";

///////////////////////////
// Image Imports 
///////////////////////////

import CreditCardIcon from "@material-ui/icons/CreditCard";
import MasterCardIcon from "assets/icons/master-card.svg";
import VisaCardIcon from "assets/icons/visa-card.svg"

///////////////////////////
// Style Imports 
///////////////////////////

import styles from "./index.module.scss";

///////////////////////////
// Component
///////////////////////////

const CreditCardSelection: React.FC = () => {
  return (
    <div className={styles.creditCardSelector}>
      <div className={styles.creditCardItem}>
        <CreditCardIcon />
        <span className={styles.innerLabel}>New Card</span>
        <img src={MasterCardIcon} />
        <img src={VisaCardIcon} />
      </div>
    </div>
  );
};

export default CreditCardSelection;
