///////////////////////////
// Module Imports 
///////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";

///////////////////////////
// Image Imports 
///////////////////////////


import CreditCardIcon from "@material-ui/icons/CreditCard";
import MasterCardIcon from "src/assets/icons/master-card.svg";
import VisaCardIcon from "src/assets/icons/visa-card.svg"
import UsdIcon from "src/assets/icons/usd.svg";
import DagIcon from 'src/assets/icons/dag.svg';

///////////////////////////
// Component Imports 
///////////////////////////

import { Button } from "src/components/base";
import { CurrencyInput } from "src/components/composed";

///////////////////////////
// Redux Imports 
///////////////////////////

import { setState } from "src/redux/actions";
import { RootState } from "src/redux/reducers";

///////////////////////////
// Style Imports 
///////////////////////////

import styles from "./index.module.scss";

///////////////////////////
// Constants
///////////////////////////

const MIN_SPEND_ERROR_STRING = 'The Minimum Spend is $10';
const MAX_SPEND_ERROR_STRING = 'The Maximum Spend is $1000';
const MAX_SPEND_NUMBER = 1000;
const MIN_SPEND_NUMBER = 10;
const DAG_PRICE_URL = "https://www.stargazer.network/api/price?symbol=DAG-USDT";


///////////////////////////
// Interfaces
///////////////////////////

interface BDFProp {
    nextStep: (usdValue, dagValue) => void;
  }
  
type LastPrice = {
  amount: number;
  time: number;
};
  
export const CreditCardSelection: React.FC = () => {
  return (
    <div className={styles.itemWrapper}>
      <div className={styles.labelWrapper} />
      <div className={classnames(styles.item, styles.credit)}>
        <CreditCardIcon />
        <span className={classnames(styles.innerLabel, styles.credit)}>New Card</span>
        <img src={MasterCardIcon} />
        <img src={VisaCardIcon} />
      </div>
    </div>
  );
};


///////////////////////////
// Component
///////////////////////////


export const StepOneGetDag: React.FC<BDFProp> = ({ nextStep }: BDFProp) => {

  const dispatch = useDispatch();
  const [lastPrice, setLastPrice] = useState<LastPrice>({ amount: 0, time: 0 });
  const { usdValue, dagValue } = useSelector((root: RootState) => root.buyDag);
  const [isSpendError, setIsSpendError] = useState<boolean>(false);
  const [spendErrorMessage, setSpendErrorMessage] = useState<string>(MIN_SPEND_ERROR_STRING);
  const [MAINTENANCE, setMaintenance] = useState<boolean>(false);

  // useEffect(() => {
  //   window["stargazer"].request({ method: "getNetwork" }).then((network) => {
  //     setMaintenance(network !== "ceres");
  //   });
  // }, []);

  useEffect( () => {
    if(usdValue > 0 && usdValue < MIN_SPEND_NUMBER){
      // alert('The minimum spend is $10')
      setIsSpendError(true);
      setSpendErrorMessage(MIN_SPEND_ERROR_STRING);
    }else if(usdValue > MAX_SPEND_NUMBER){
      // alert('The maximum spend is $10000')
      setIsSpendError(true);
      setSpendErrorMessage(MAX_SPEND_ERROR_STRING);
    }else{
      setIsSpendError(false);
    }
  }, [usdValue]);

  useEffect(() => {
    dispatch(
      setState({
        usdValue: "",
      }),
    );
    dispatch(
      setState({
        dagValue: "",
      }),
    );
  }, []);

  const setUsdValue = (value) => {
    dispatch(
      setState({
        usdValue: value,
      }),
    );
  };
  const setDagValue = (value) => {
    dispatch(
      setState({
        dagValue: value,
      }),
    );
  };

  const getDagPrice = async () => {
    // console.log(lastPrice.time, Date.now());
    if (lastPrice.time + 15000 > Date.now()) {
      return lastPrice.amount;
    }
    const res = await fetch(DAG_PRICE_URL);
    const b = await res.json();
    const amount = +b.price;
    setLastPrice({ amount, time: Date.now() });
    return amount;
  };

  const handleUsdValueChange = async (e) => {
    const inputValue = e.target.value;
    if (inputValue === "" || inputValue === "0") {
      setDagValue(0);
      setUsdValue(0);
    } else if (isFinite(inputValue)) {
      const nUsd = Math.min(1000, parseFloat(inputValue));
      setUsdValue(nUsd);
      const conversionRate = await getDagPrice();
      setDagValue((nUsd / conversionRate).toFixed(8));
    }
  };

  const handleDagValueChange = async (e) => {
    const inputValue = e.target.value;
    if (inputValue === "" || inputValue === "0") {
      setDagValue(0);
      setUsdValue(0);
    } else if (isFinite(inputValue)) {
      const conversionRate = await getDagPrice();
      let nDag: any = parseFloat(inputValue);
      //let usdValue = (nDag * conversionRate) / 0.95;
      let usdValue = nDag * conversionRate;
      if (usdValue > 1000) {
        usdValue = 1000;
        //nDag = (usdValue * 0.95) / conversionRate;
        nDag = nDag.toFixed(Math.min(8, nDag.toString().length));
      }
      setDagValue(nDag);
      setUsdValue(usdValue.toFixed(2));
    }
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.header}>
        <div className={styles.title}>Get Dag</div>
      </div>
      <div className={styles.body}>
        <CurrencyInput
          label="Donate"
          expandable={false}
          logoUrl={UsdIcon}
          currency="USD"
          disabled={MAINTENANCE}
          error={isSpendError}
          errMsg={spendErrorMessage}
          onValueChange={handleUsdValueChange}
          value={usdValue !== 0 ? usdValue.toString() : ""}
        />
        <CurrencyInput
          label="Receive"
          logoUrl={DagIcon}
          currency="DAG"
          disabled={MAINTENANCE}
          onValueChange={handleDagValueChange}
          value={dagValue !== 0 ? dagValue.toString() : ""}
        />
        <CreditCardSelection />
        <div className={styles.labelRow}>
          <span>Processing Fee</span>5%
        </div>
        <div className={styles.labelRowSm}>
          All proceeds are going to the Stardust Foundation. <br></br>30% of the
          processing fees are going to nonprofit organizations from Givebox.
        </div>
        <Button
          type="button"
          theme="primary"
          variant={styles.button}
          onClick={() => nextStep(usdValue, dagValue)}
          disabled={usdValue === 0 || dagValue === 0 || usdValue < MIN_SPEND_NUMBER || usdValue > MAX_SPEND_NUMBER || MAINTENANCE}
        >
          Get DAG
        </Button>
      </div>
      {MAINTENANCE && (
        <div className={styles.serviceDown}>
          *The service is down for maintenance and will be back soon.
        </div>
      )}
    </div>
  );
};

export default StepOneGetDag;