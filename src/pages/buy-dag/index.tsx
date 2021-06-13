///////////////////////////
// ANCHOR Module Imports
///////////////////////////

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

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

  const handleDagSignMessage =  async (message) => {
    let currentAccount = await window["stargazer"].request({ method: "getAddress"});
    let network = await window['stargazer'].request({ method: "getNetwork"});
    let sig = await window['stargazer'].request({ 
      method: "signMessage", 
      params: [message, currentAccount]
    });
    
    return { address: currentAccount, sig, network };
  };

  const handleSubmitRequest = () => {
    const statement = `I am donating ${usdValue} USD and receiving ${dagValue} DAG`;
    handleDagSignMessage(statement).then(({ address, sig, network }) => {
      if (!sig) {
        setStep(2);
        return;
      }
      const body = {
        auth: { token: sig },
        order: {
          asset: "DAG",
          network,
          quantity: +dagValue,
          amountUSD: Math.floor(usdValue * 100),
          tokenAddress: address,
          statement,
        },
        customer: {
          email: email,
        },
        paymethod: {
          number: cardNumber,
          cvv: cvv,
          name: cardName,
          expYear: Number(`20${expiryDate.split("/")[1]}`),
          expMonth: Number(expiryDate.split("/")[0]),
          zip: postalCode || null
        },
      };
      fetch("https://portal.stargazer.network/api/v1/buy-dag/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then(async (res) => {
          const result = await res.json();
          // if (!res.ok) {
          //   throw result;
          // }
          // console.log(result);
          setReceipt(result);
          setTransactionLoading(false);
        })
        .catch((err) => console.log(err));
    });
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
