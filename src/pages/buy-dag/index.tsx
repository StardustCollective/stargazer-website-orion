import React, { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@redux/reducers";
import { Layout } from "@components/common";
import {
  BuyDagForm,
  BuyDagFormStep1,
  // BuyDagFormStep2,
  TransactionReceipt,
} from "@components/uncommon/BuyDagForm";

import styles from "./index.module.scss";

const BuyDag: React.FC = () => {
  const {
    usdValue,
    dagValue,
    cardName,
    cardNumber,
    expiryDate,
    cvv,
    email,
  } = useSelector((root: RootState) => root.buyDag);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmitRequest = () => {
    const body = {
      order: { token: "DAG", quantity: dagValue, amountUSD: usdValue },
      customer: {
        email: email,
        firstName: "1",
        lastName: "1",
      },
      paymethod: {
        number: cardNumber,
        cvv: cvv,
        name: cardName,
        expYear: `20${expiryDate.split("/")[1]}`,
        expMonth: expiryDate.split("/")[0],
        zip: "",
      },
    };
    fetch("https://www.stargazer.network/api/v1/buy-dag/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        const result = await res.json();
        console.log(result);
        setTransactionLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout>
      <div className={styles.pageWrapper}>
        {step === 1 && (
          <BuyDagForm
            nextStep={(usdValue, dagValue) => {
              console.log(usdValue, dagValue);
              setStep(2);
            }}
          />
        )}
        {step === 2 && (
          <BuyDagFormStep1
            nextStep={({ cardName, cardNumber, expiryDate, cvv }) => {
              console.log({ cardName, cardNumber, expiryDate, cvv });
              setStep(3);
              handleSubmitRequest();
              setTransactionLoading(true);
            }}
          />
        )}
        {step === 3 && <TransactionReceipt loading={transactionLoading} />}
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
    </Layout>
  );
};

export default BuyDag;
