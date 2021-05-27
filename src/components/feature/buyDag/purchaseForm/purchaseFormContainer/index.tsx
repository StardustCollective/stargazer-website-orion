///////////////////////////
// Module Imports 
///////////////////////////

import React from "react";


///////////////////////////
// Component Imports 
///////////////////////////

import { Button } from "src/components/base";

///////////////////////////
// Image Imports
///////////////////////////

import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

///////////////////////////
// styles
///////////////////////////

import styles from "./index.module.scss";

///////////////////////////
// Interfaces
///////////////////////////

interface IPurchaseFromContainerProps {
  headerLabel: string;
  showBackButton?: boolean;
  onBackButtonClick?: undefined;
  onSubmitClick?: React.FormEventHandler;
  showConfirmButton?: boolean;
  confirmButtonDisabled?: boolean;
  onConfirmButtonClick?: () => void;
  confirmButtonLabel?: string;
};

///////////////////////////
// Component
///////////////////////////

const purchaseFormContainer: React.FC<IPurchaseFromContainerProps> = ({
  headerLabel,
  showBackButton = false,
  onBackButtonClick,
  onSubmitClick,
  confirmButtonLabel,
  showConfirmButton = true,
  confirmButtonDisabled,
  onConfirmButtonClick,
  children,
}) => {

  return (
    <form
      className={styles.purchaseFormContainer}
      onSubmit={onSubmitClick}
    >
      <div className={styles.header}>
        {showBackButton && (
          <IconButton
            size="small"
            className={styles.backButton}
            onClick={onBackButtonClick}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
        )}

        <div className={styles.title}>{headerLabel}</div>
      </div>
      <div className={styles.body}>
        {children}
        {showConfirmButton && (
          <Button
            type="button"
            theme="primary"
            variant={styles.button}
            onClick={onConfirmButtonClick}
            disabled={confirmButtonDisabled}
          >
            {confirmButtonLabel}
          </Button>
        )}
      </div>
    </form>
  );

}

export default purchaseFormContainer;
