///////////////////////////
// ANCHOR Module Imports 
///////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

///////////////////////////
// ANCHOR Component Imports 
///////////////////////////

import { FormInput } from "src/components/base/formInput";
import PurchaseFormContainer from '../purchaseFormContainer';

///////////////////////////
// ANCHOR Util Imports 
///////////////////////////

import formatStringUtil from 'src/util/formatString';

///////////////////////////
// ANCHOR Redux Imports 
///////////////////////////

import { setState } from "src/redux/actions";
import { RootState } from "src/redux/reducers";

///////////////////////////
// ANCHOR Style Imports 
///////////////////////////

import styles from "./index.module.scss";

///////////////////////////
// ANCHOR Interfaces
///////////////////////////

interface BDF1Prop {
  prevStep: () => void;
  nextStep: ({ cardName, cardNumber, expiryDate, cvv }) => void;
}

///////////////////////////
// ANCHOR Component
///////////////////////////

const StepTwoEnterCreditCard: React.FC<BDF1Prop> = ({
  prevStep,
  nextStep,
}: BDF1Prop) => {

  ///////////////////////////
  // ANCHOR Hooks
  ///////////////////////////

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

  ///////////////////////////
  // ANCHOR Helpers
  // TODO: Refactor helpers to a util library. 
  ///////////////////////////

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

  ///////////////////////////
  // ANCHOR Callbacks
  ///////////////////////////

  const onSubmit = () => {
    nextStep({ cardName, cardNumber, expiryDate, cvv });
  }

  ///////////////////////////
  // ANCHOR Render
  ///////////////////////////

  return (
    <PurchaseFormContainer
      confirmButtonDisabled={checkDisabled()}
      confirmButtonLabel="Pay Now"
      confirmButtonTheme="success"
      headerLabel="Donate with card"
      showBackButton={true}
      onBackButtonClick={prevStep}
      onSubmitClick={onSubmit}
    >
      <div className={styles.creditCardFormContainer} >
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
          value={formatStringUtil.creditCard(cardNumber)}
          error={errCardNumber !== ""}
          errMsg={errCardNumber}
          onChange={(e) => {
            const value = e.target.value;
            // Get only the first 16 characters and remove white space.
            const trimmedValue = value.replace(/ /g, '').substring(0, 16);
            const data = e.nativeEvent.data;
            if (
              (data >= "0" && data <= "9") || data === null) {
              if (trimmedValue.length !== 16) {
                setErrCardNumber("Card Number should be 16 digit");
              } else {
                setErrCardNumber("");
              }
              dispatch(
                setState({
                  cardNumber: trimmedValue,
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
                (e.nativeEvent.data >= "0" && e.nativeEvent.data <= "9") ||
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
      </div>
    </PurchaseFormContainer>
  );
};

export default StepTwoEnterCreditCard;