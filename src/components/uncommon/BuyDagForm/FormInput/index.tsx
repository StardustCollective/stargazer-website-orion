import React, { useEffect, useState } from "react";
import classnames from "classnames";
import ReactFlagsSelect from "react-flags-select";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

import styles from "./index.module.scss";

interface IProps {
  label: string;
  placeholder?: string;
  visa?: boolean;
  country?: boolean;
  value?: string;
  error?: boolean;
  errMsg?: string;
  onChange?: (e) => void;
}

export const FormInput: React.FC<IProps> = ({
  placeholder,
  label,
  visa,
  country,
  value,
  error,
  errMsg,
  onChange,
}: IProps) => {
  const [selected, setSelected] = useState("");
  const [dropdownStatus, setDropdownStatus] = useState(false);
  const handleDropdown = () => {
    setDropdownStatus((status) => !status);
  };

  useEffect(() => {
    if (country) {
      const el = document.getElementById("rfs-btn");
      if (el) {
        el.addEventListener("click", handleDropdown);
      }
    }
  }, []);

  return (
    <div className={styles.formInput}>
      <span className={classnames(styles.label, { [styles.error]: error })}>
        {label}
        {error && <span>{` (${errMsg})`}</span>}
      </span>
      {country ? (
        <>
          <ReactFlagsSelect
            selected={selected}
            onSelect={(code) => {
              console.log(code);
              setSelected(code);
              onChange(code);
            }}
            className={styles.countrySelector}
          />
          {dropdownStatus ? (
            <ExpandLessIcon className={styles.expandMore} />
          ) : (
            <ExpandMoreIcon className={styles.expandMore} />
          )}
        </>
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          className={classnames(visa ? styles.creditCard : "", {
            [styles.error]: error,
          })}
          onChange={onChange}
          value={value}
        />
      )}
      {visa && (
        <>
          <img className={styles.mastercard} src="/icons/master-card.svg" />
          <img className={styles.visacard} src="/icons/visa-card.svg" />
        </>
      )}
      {/* {error && (
        <div className={styles.error}>
          <span className={styles.errMsg}>{errMsg}</span>
        </div>
      )} */}
    </div>
  );
};
