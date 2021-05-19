import React from "react";
import classnames from "classnames";
import CheckIcon from "@material-ui/icons/Check";

import styles from "./index.module.scss";

interface IProps {
  currentStep: number;
}
export const StepMarker: React.FC<IProps> = ({ currentStep }: IProps) => {
  return (
    <div className={styles.stepMarker}>
      <span>Enter Card Information</span>
      <div className={styles.stepsWrapper}>
        <div className={classnames(styles.step, styles.active)}>
          {currentStep === 2 ? <CheckIcon /> : <span>1</span>}
        </div>
        <div className={styles.line}></div>
        <div
          className={classnames(styles.step, {
            [styles.active]: currentStep === 2,
          })}
        >
          <span>2</span>
        </div>
      </div>
    </div>
  );
};
