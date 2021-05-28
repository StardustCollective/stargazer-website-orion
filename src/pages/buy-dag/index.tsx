import React, { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "src/redux/reducers";

import {
  StepOneGetDag,
  StepTwoEnterCreditCard,
  StepThreeTransactionReceipt,
} from "src/components/feature/buyDag/purchaseForm";

import ConnectStargazer from "src/components/feature/buyDag/connectStargazer";

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
  const [isConnected, setConnected] = useState<boolean>(false);
  const [isWalletInstalled, setWalletInstalled] = useState<boolean>(false);

  const [receipt, setReceipt] = useState({});

  const markAsInstalledAndCheckConnected = () => {
    setWalletInstalled(true);

    window["stargazer"]
      .isConnected()
      .then((result) => setConnected(result.connected));

  };

  React.useEffect(() => {
    if (window["stargazer"]) {
      markAsInstalledAndCheckConnected();
    } else {
      setTimeout(() => {
        if (window["stargazer"]) {
          markAsInstalledAndCheckConnected();
        }
      }, 3000);
    }
  }, []);

  const handleDagSignMessage = (message) => {
    return window["stargazer"]
      .request({ method: "getAddress" })
      .then((currentAccount) => {
        return window["stargazer"]
          .request({ method: "getNetwork" })
          .then((network) => {
            return window["stargazer"]
              .request({
                method: "signMessage",
                params: [message, currentAccount],
              })
              .then((sig) => {
                // console.log("SIG", sig);
                return { address: currentAccount, sig, network };
              });
          });
      });
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
