import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import clm from "country-locale-map";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import CallMadeRoundedIcon from "@material-ui/icons/CallMadeRounded";
import MasterCardIcon from "src/assets/icons/master-card.svg";
import VisaCardIcon from "src/assets/icons/visa-card.svg"
import UsdIcon from "src/assets/icons/usd.svg";
import DagIcon from 'src/assets/icons/dag.svg';

import { setState } from "src/redux/actions";
import { RootState } from "src/redux/reducers";
import { Button } from "src/components/common";
import { StepMarker } from "./StepMarker";
import { FormInput } from "./FormInput";


import styles from "./index.module.scss";

const MIN_SPEND_ERROR_STRING = 'The Minimum Spend is $10';
const MAX_SPEND_ERROR_STRING = 'The Maximum Spend is $1000';
const MAX_SPEND_NUMBER = 1000;
const MIN_SPEND_NUMBER = 10;

interface IProps {
  label: string;
  expandable?: boolean;
  logoUrl: string;
  currency: string;
  onValueChange: (e) => void;
  value?: string;
  errMsg?: string;
  error?: boolean;
}

interface FIWProps {
  children: any;
  label: string;
}

const DAG_PRICE_URL = "https://www.stargazer.network/api/price?symbol=DAG-USDT";

export const FormItem: React.FC<IProps> = ({
  label,
  expandable,
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

export const Card: React.FC = () => {
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

interface BDFProp {
  nextStep: (usdValue, dagValue) => void;
}

type LastPrice = {
  amount: number;
  time: number;
};

export const BuyDagForm: React.FC<BDFProp> = ({ nextStep }: BDFProp) => {

  const dispatch = useDispatch();
  const [lastPrice, setLastPrice] = useState<LastPrice>({ amount: 0, time: 0 });
  const { usdValue, dagValue } = useSelector((root: RootState) => root.buyDag);
  const [isSpendError, setIsSpendError] = useState<boolean>(false);
  const [spendErrorMessage, setSpendErrorMessage] = useState<string>(MIN_SPEND_ERROR_STRING);

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
      const nUsd = Math.min(2000, parseFloat(inputValue));
      setUsdValue(inputValue);
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
      const nDag = parseFloat(inputValue);
      setDagValue(inputValue);
      const conversionRate = await getDagPrice();
      setUsdValue((nDag * conversionRate).toFixed(2));
    }
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.header}>
        <div className={styles.title}>Buy Dag</div>
      </div>
      <div className={styles.body}>
        <FormItem
          label="Spend"
          expandable={true}
          logoUrl={UsdIcon}
          currency="USD"
          error={isSpendError}
          errMsg={spendErrorMessage}
          onValueChange={handleUsdValueChange}
          value={usdValue !== 0 ? usdValue.toString() : ""}
        />
        <FormItem
          label="Buy"
          logoUrl={DagIcon}
          currency="DAG"
          onValueChange={handleDagValueChange}
          value={dagValue !== 0 ? dagValue.toString() : ""}
        />
        <Card />
        <div className={styles.labelRow}>
          <span>Processing Fee</span>5%
        </div>
        <Button
          type="button"
          theme="primary"
          variant={styles.button}
          onClick={() => nextStep(usdValue, dagValue)}
          disabled={usdValue === 0 || dagValue === 0 || usdValue < MIN_SPEND_NUMBER || usdValue > MAX_SPEND_NUMBER}
        >
          Buy DAG
        </Button>
      </div>
    </div>
  );
};

interface BDF1Prop {
  prevStep: () => void;
  nextStep: ({ cardName, cardNumber, expiryDate, cvv }) => void;
}
export const BuyDagFormStep1: React.FC<BDF1Prop> = ({
  prevStep,
  nextStep,
}: BDF1Prop) => {
  const dispatch = useDispatch();
  const { cardName, cardNumber, expiryDate, cvv, email } = useSelector(
    (root: RootState) => root.buyDag,
  );
  const [errCardName, setErrCardName] = useState("");
  const [errCardNumber, setErrCardNumber] = useState("");
  const [errExpDate, setErrExpDate] = useState("");
  const [errCvv, setErrCvv] = useState("");
  const [errEmail, setErrEmail] = useState("");

  useEffect(() => {
    dispatch(
      setState({
        cardName: "",
      }),
    );
    dispatch(
      setState({
        cardNumber: "",
      }),
    );
    dispatch(
      setState({
        expiryDate: "",
      }),
    );
    dispatch(
      setState({
        cvv: "",
      }),
    );
    dispatch(
      setState({
        email: "",
      }),
    );
  }, []);

  const validDate = (dValue) => {
    let result = false;
    const pattern = /^\d{2}$/;
    dValue = dValue.split("/");

    if (dValue[0] < 1 || dValue[0] > 12) result = true;

    if (!pattern.test(dValue[0]) || !pattern.test(dValue[1])) result = true;

    if (dValue[2]) result = true;
    return !result;
    // if (result) alert("Please enter a valid date in MM/YY format.");
  };
  const validateCVV = (cvv) => {
    return !!(cvv.length === 3 || cvv.length === 4);
  };
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const checkDisabled = () => {
    if (expiryDate && cvv && cardName && cardNumber && email) {
      if (
        cardName.length === 0 ||
        cardNumber.length !== 16 ||
        !validDate(expiryDate) ||
        !validateEmail(email) ||
        !validateCVV(cvv)
      ) {
        return true;
      }
      return false;
    }
    return true;
  };
  return (
    <form
      className={styles.formWrapper}
      onSubmit={() => nextStep({ cardName, cardNumber, expiryDate, cvv })}
    >
      <div className={styles.header}>
        <IconButton
          size="small"
          className={styles.backButton}
          onClick={prevStep}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <div className={styles.title}>Buy with Card</div>
      </div>
      <div className={styles.body}>
        {/* <StepMarker currentStep={1} /> */}
        <FormInput
          label="Name on Card"
          value={cardName}
          error={errCardName !== ""}
          errMsg={errCardName}
          onChange={(e) => {
            if (e.target.value.length === 0) {
              setErrCardName("Card Name required");
            } else {
              setErrCardName("");
            }
            dispatch(
              setState({
                cardName: e.target.value,
              }),
            );
          }}
        />
        <FormInput
          label="Card Number"
          visa={true}
          value={cardNumber}
          error={errCardNumber !== ""}
          errMsg={errCardNumber}
          onChange={(e) => {
            if (
              (e.nativeEvent.data >= "0" && e.nativeEvent.data <= "9") ||
              e.nativeEvent.data === null
            ) {
              if (e.target.value.length !== 16) {
                setErrCardNumber("Card Number should be 16 digit");
              } else {
                setErrCardNumber("");
              }
              dispatch(
                setState({
                  cardNumber: e.target.value,
                }),
              );
            }
          }}
        />
        <div className={styles.halfWrapper}>
          <FormInput
            label="Expiry Date"
            placeholder="MM/YY"
            value={expiryDate}
            error={errExpDate !== ""}
            errMsg={errExpDate}
            onChange={(event) => {
              const value = event.target.value
                .replace(
                  /^([1-9]\/|[2-9])$/g,
                  "0$1/", // 3 > 03/
                )
                .replace(
                  /^(0[1-9]|1[0-2])$/g,
                  "$1/", // 11 > 11/
                )
                .replace(
                  /^1([3-9])$/g,
                  "01/$1", // 13 > 01/3 //UPDATED by NAVNEET
                  // ).replace(
                  //   /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
                )
                .replace(
                  /^0\/|0+$/g,
                  "0", // 0/ > 0 and 00 > 0 //UPDATED by NAVNEET
                )
                .replace(
                  /[^\d|^/]*/g,
                  "", // To allow only digits and `/` //UPDATED by NAVNEET
                )
                .replace(
                  /\/\//g,
                  "/", // Prevent entering more than 1 `/`
                );
              if (!validDate(value)) {
                setErrExpDate("Invalid format");
              } else {
                setErrExpDate("");
              }
              dispatch(
                setState({
                  expiryDate: value,
                }),
              );
            }}
          />
          <FormInput
            label="CVV"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => {
              if (
                (e.nativeEvent.data > "0" && e.nativeEvent.data <= "9") ||
                e.nativeEvent.data === null
              ) {
                if (!validateCVV(e.target.value)) {
                  setErrCvv("CVV is invalid");
                } else {
                  setErrCvv("");
                }
                dispatch(
                  setState({
                    cvv: e.target.value,
                  }),
                );
              }
            }}
            error={errCvv !== ""}
            errMsg={errCvv}
          />
        </div>
        <FormInput
          label="E-mail"
          value={email}
          placeholder="johndoe@example.com"
          error={errEmail !== ""}
          errMsg={errEmail}
          onChange={(e) => {
            if (!validateEmail(e.target.value)) {
              setErrEmail("E-mail format is invalid");
            } else {
              setErrEmail("");
            }
            dispatch(
              setState({
                email: e.target.value,
              }),
            );
          }}
        />
        <Button
          type="submit"
          theme="success"
          variant={styles.button}
          disabled={checkDisabled()}
        >
          Pay Now
        </Button>
      </div>
    </form>
  );
};

interface BDF2Prop {
  prevStep: () => void;
  nextStep: ({ country, address, city, postalCode }) => void;
}
export const BuyDagFormStep2: React.FC<BDF2Prop> = ({
  prevStep,
  nextStep,
}: BDF2Prop) => {
  const dispatch = useDispatch();
  const { country, address, city, postalCode } = useSelector(
    (root: RootState) => root.buyDag,
  );
  const checkDisabled = () => {
    if (country && address && city && postalCode) {
      return false;
    }
    return true;
  };
  return (
    <div className={styles.formWrapper}>
      <div className={styles.header}>
        <div className={styles.title}>Buy with Card</div>
      </div>
      <div className={styles.body}>
        <StepMarker currentStep={2} />
        <FormInput
          label="Country"
          country={true}
          onChange={(country) => {
            dispatch(
              setState({
                country: clm.getCountryByAlpha2(country).name,
              }),
            );
          }}
        />
        <FormInput
          label="Address"
          value={address}
          onChange={(e) =>
            dispatch(
              setState({
                address: e.target.value,
              }),
            )
          }
        />
        <div className={styles.halfWrapper}>
          <FormInput
            label="City"
            value={city}
            onChange={(e) =>
              dispatch(
                setState({
                  city: e.target.value,
                }),
              )
            }
          />
          <FormInput
            label="Postal Code"
            value={postalCode}
            onChange={(e) =>
              dispatch(
                setState({
                  postalCode: e.target.value,
                }),
              )
            }
          />
        </div>
        <div className={classnames(styles.actionGroup, styles.halfWrapper)}>
          <Button
            type="button"
            theme="darkgray"
            variant={styles.button}
            onClick={() => prevStep()}
          >
            Previous
          </Button>
          <Button
            type="button"
            theme="success"
            variant={styles.button}
            onClick={() => nextStep({ country, address, city, postalCode })}
            disabled={checkDisabled()}
          >
            Pay Now
          </Button>
        </div>
      </div>
    </div>
  );
};

interface TransactionReceiptProp {
  loading: boolean;
  receipt: any;
  onDone: () => void;
}
export const TransactionReceipt: React.FC<TransactionReceiptProp> = ({
  loading,
  receipt,
  onDone,
}: TransactionReceiptProp) => {
  // const [balance, setBalance] = useState(0);
  //
  // useEffect(() => {
  //   window["stargazer"]
  //     .request({ method: "getBalance" })
  //     .then((value) => setBalance(value));
  // }, [loading]);

  const DAG_EXPLORER_SEARCH = {
    main: "https://www.dagexplorer.io/search?term=",
    ceres: "http://lb.exchanges.constellationnetwork.io:9000/transaction/",
  };

  const handleOpenLink = (txHash: string, network: string) => {
    window.open(`${DAG_EXPLORER_SEARCH[network]}${txHash}`, "_blank");
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.header}>
        <div className={styles.title}>
          {!loading && receipt.txHash === undefined
            ? "Transaction Error"
            : "Transaction receipt"}
        </div>
      </div>
      <div
        className={classnames(styles.body, styles.transactionReceipt, {
          [styles.loading]: loading,
        })}
      >
        {loading ? (
          <>
            <HourglassEmptyIcon />
            <span>Waiting for Tokens</span>
          </>
        ) : (
          <>
            {receipt.txHash !== undefined ? (
              <>
                <div className={styles.trWrapper}>
                  <div className={styles.trItem}>
                    <p className={styles.title}>$DAG amount</p>
                    <span className={styles.description}>
                      {Number(receipt.dagQtyPurchased).toFixed(2)} $DAG{" "}
                    </span>
                  </div>
                  <SwapHorizIcon />
                  <div className={classnames(styles.trItem, styles.trMargin)}>
                    <p className={styles.title}>Paid</p>
                    <span className={styles.description}>
                      ${receipt.amountChargedUSD / 100} USD{" "}
                    </span>
                  </div>
                </div>

                <div className={styles.trItem}>
                  <p className={styles.title}>Transaction ID</p>
                  <span
                    className={classnames(
                      styles.description,
                      styles.transaction,
                    )}
                  >
                    {receipt.txHash}
                  </span>
                  <IconButton
                    size="small"
                    className={styles.txlink}
                    onClick={() =>
                      handleOpenLink(receipt.txHash, receipt.network)
                    }
                  >
                    <CallMadeRoundedIcon fontSize="small" />
                  </IconButton>
                </div>
                {/*<div className={styles.trItem}>*/}
                {/*  <p className={styles.title}>New $DAG Balance</p>*/}
                {/*  <span className={styles.description}>${balance} $DAG</span>*/}
                {/*</div>*/}
                <div className={classnames(styles.trItem, styles.noBorder)}>
                  <p className={styles.title}>Timestamp</p>
                  <span className={styles.description}>
                    {new Date(
                      receipt["receipt"].updatedAt * 1000,
                    ).toLocaleString()}
                  </span>
                </div>
              </>
            ) : (
              <div className={styles.errorItem}>
                {`${receipt.name}:  ${receipt.message}`}
              </div>
              // <div className={styles.errorItem}>
              //   This service is currently unavailable.
              //   <br />
              //   Please try again later.
              // </div>
            )}
            <Button
              type="button"
              theme="primary"
              variant={styles.button}
              onClick={onDone}
            >
              {receipt.txHash !== undefined ? "DONE" : "CLOSE"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
