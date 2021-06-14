///////////////////////////
// ANCHOR Module Imports
///////////////////////////

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PurchaseBuilder from "api/builders/purchase.builder";
import buyDag from "api/buyDag";

///////////////////////////
// ANCHOR Component Imports
///////////////////////////

import {
  StepOneGetDag,
  StepTwoEnterCreditCard,
  StepThreeTransactionReceipt,
} from "components/feature/buyDag/purchaseForm";
import ConnectStargazer from "components/feature/buyDag/ConnectStargazer";

///////////////////////////
// ANCHOR Redux Imports
///////////////////////////

import { RootState } from "redux/reducers";

///////////////////////////
// ANCHOR Style Imports
///////////////////////////

import styles from "./index.module.scss";

///////////////////////////
// ANCHOR Component
///////////////////////////

const BuyDag: React.FC = () => {
  const {
    usdValue,
    dagValue,
    cardName,
    cardNumber,
    expiryDate,
    postalCode,
    cvv,
    email,
  } = useSelector((root: RootState) => root.buyDag);

  ///////////////////////////
  // ANCHOR Hooks
  ///////////////////////////

  const [transactionLoading, setTransactionLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [isConnected, setConnected] = useState<boolean>(false);
  const [isWalletInstalled, setWalletInstalled] = useState<boolean>(false);

  const [receipt, setReceipt] = useState({});

  useEffect(() => {
    const onPageShow = () => {
      if (window["stargazer"]) {
        markAsInstalledAndCheckConnected();
      }
    }
    window.addEventListener('pageshow', onPageShow);
    return () => {
      window.removeEventListener('pageshow', onPageShow);
    }
  }, []);

  ///////////////////////////
  // ANCHOR Helpers
  ///////////////////////////

  const markAsInstalledAndCheckConnected = () => {
    setWalletInstalled(true);

    window["stargazer"]
      .isConnected()
      .then((result) => setConnected(result.connected));
  };

  ///////////////////////////
  // ANCHOR Callbacks
  ///////////////////////////

  const handleDagSignMessage = async (message) => {
    const currentAccount = await window["stargazer"].request({ method: "getAddress" });
    const network = await window['stargazer'].request({ method: "getNetwork" });
    const sig = await window['stargazer'].request({
      method: "signMessage",
      params: [message, currentAccount]
    });

    return { address: currentAccount, sig, network };
  };

  const handleSubmitRequest = async () => {
    const statement = `I am donating ${usdValue} USD and receiving ${dagValue} DAG`;
    const { address, sig, network } = await handleDagSignMessage(statement);
    if (!sig) {
      setStep(2);
      return;
    }

    try {
      const results = await buyDag.purchase({
        authToken: sig,
        orderAsset: "DAG",
        orderNetwork: network,
        orderQuantity: dagValue,
        orderAmountUsd: usdValue,
        orderTokenAddress: address,
        orderStatement: statement,
        customerEmail: email,
        cardNumber: cardNumber,
        cardCvv: cvv,
        cardName: cardName,
        cardExpiration: expiryDate,
        cardZipCode: postalCode,
      })
      if (results) {
        setReceipt(results);
        setTransactionLoading(false);
      }
    } catch (error) {
      console.log(error)
    }
  };

  ///////////////////////////
  // ANCHOR Render
  ///////////////////////////

  const renderForm = () => {
    if (!isConnected) {
      return (
        <ConnectStargazer
          installed={isWalletInstalled}
          onConnect={() => {
            setConnected(true);
          }}
        />
      );
    }

    switch (step) {
      case 1:
        return (
          <StepOneGetDag
            nextStep={() => {
              setStep(2);
            }}
          />
        );
      case 2:
        return (
          <StepTwoEnterCreditCard
            prevStep={() => {
              setStep(1);
            }}
            nextStep={() => {
              setStep(3);
              handleSubmitRequest();
              setTransactionLoading(true);
            }}
          />
        );
      case 3:
        return (
          <StepThreeTransactionReceipt
            loading={transactionLoading}
            receipt={receipt}
            onDone={() => {
              setStep(1);
              setReceipt({});
            }}
          />
        );
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {renderForm()}
      {/* {step === 3 && (
        <BuyDagFormStep2
          prevStep={() => setStep(2)}
          nextStep={({ country, address, city, postalCode }) => {
            console.log({ country, address, city, postalCode });
            handleSubmitRequest();
          }}
        />
      )} */}
    </div>
  );
};

export default BuyDag;
