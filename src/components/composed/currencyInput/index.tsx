
///////////////////////////
// Module Imports 
///////////////////////////

import React, { useEffect, useState } from "react";
import classnames from "classnames";

///////////////////////////
// Style Imports 
///////////////////////////

import styles from "./index.module.scss";

///////////////////////////
// Module Imports 
///////////////////////////

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

//////////////////////////
// Interfaces
//////////////////////////

interface IProps {
    label: string;
    expandable?: boolean;
    logoUrl: string;
    currency: string;
    disabled?: boolean;
    onValueChange: (e) => void;
    value?: string;
    errMsg?: string;
    error?: boolean;
  }

  //////////////////////////
// Component
///////////////////////////

const CurrencyInput: React.FC<IProps> = ({
    label,
    expandable,
    disabled,
    logoUrl,
    currency,
    onValueChange,
    error,
    errMsg,
    value,
  }: IProps) => {
  
    return (
      <div className={styles.itemWrapper}>
        <div className={styles.labelWrapper} >
          {error && (
            <span className={classnames(styles.label, { [styles.error]: error })}>
              {errMsg}
            </span>
            )
          }
        </div>
        <div className={classnames(styles.item, { [styles.error]: error })}>
          <span className={styles.innerLabel}>{label}</span>
          <input placeholder="0.0" onChange={onValueChange} value={value} />
          <span className={styles.splitter}></span>
          <div className={styles.currencySelector}>
            <img className={styles.logo} src={logoUrl} />
            <span className={styles.currency}>{currency}</span>
            {expandable && <ExpandMoreIcon />}
          </div>
        </div>
      </div>
  
    );
};

export default CurrencyInput;
  