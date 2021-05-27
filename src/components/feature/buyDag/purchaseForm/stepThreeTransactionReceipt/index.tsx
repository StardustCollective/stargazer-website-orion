///////////////////////////
// ANCHOR Module Imports 
///////////////////////////

import React from "react";
import classnames from "classnames";

///////////////////////////
// ANCHOR Component Imports 
///////////////////////////

import PurchaseFormContainer from './../purchaseFormContainer'

///////////////////////////
// ANCHOR Image Imports 
///////////////////////////

import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty"
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import IconButton from "@material-ui/core/IconButton";
import CallMadeRoundedIcon from "@material-ui/icons/CallMadeRounded";

///////////////////////////
// ANCHOR Styles
///////////////////////////

import styles from "./index.module.scss";

///////////////////////////
// ANCHOR Interfaces
///////////////////////////

interface TransactionReceiptProp {
  loading: boolean;
  receipt: any;
  onDone: () => void;
}

///////////////////////////
// ANCHOR Constants
///////////////////////////

const DAG_EXPLORER_SEARCH = {
  main: "https://www.dagexplorer.io/search?term=",
  ceres: "http://lb.exchanges.constellationnetwork.io:9000/transaction/",
};

///////////////////////////
// ANCHOR Component
///////////////////////////

export const StepThreeTransactionReceipt: React.FC<TransactionReceiptProp> = ({
  loading,
  receipt,
  onDone,
}: TransactionReceiptProp) => {

  ///////////////////////////
  // ANCHOR Callbacks
  ///////////////////////////

  const handleOpenLink = (txHash: string, network: string) => {
    window.open(`${DAG_EXPLORER_SEARCH[network]}${txHash}`, "_blank");
  };

  ///////////////////////////
  // ANCHOR Stateful Strings
  ///////////////////////////

  const headerLabel = (!loading && receipt.txHash === undefined) ?
    "Transaction Error" : "Transaction receipt";
  const buttonLabel = receipt.txHash !== undefined ? "DONE" : "CLOSE";

  ///////////////////////////
  // ANCHOR Render
  ///////////////////////////

  const RenderReceiptByStates = ({
    loading,
    receipt,
  }) => {
    if (loading) {
      return (
        <div className={styles.loadingContainer}>
          <HourglassEmptyIcon />
          <span>Waiting for Tokens</span>
        </div>
      );
    } else {
      if (receipt.txHash !== undefined) {
        return (
          <div className={styles.transactionReceipt}>
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
          </div>
        )
      }
      else {
        return (
          <div className={styles.errorItem}>
            {`${receipt.name}:  ${receipt.message}`}
          </div>
        );
      }
    }

  }

  return (
    <PurchaseFormContainer
      confirmButtonLabel={buttonLabel}
      onConfirmButtonClick={onDone}
      showConfirmButton={receipt.txHash !== undefined}
      headerLabel={headerLabel}
    >
      <RenderReceiptByStates receipt={receipt} loading={loading} />
    </PurchaseFormContainer>
  );
};

// <div className={styles.formWrapper}>
//   <div className={styles.header}>
//     <div className={styles.title}>
//       {!loading && receipt.txHash === undefined
//         ? "Transaction Error"
//         : "Transaction receipt"}
//     </div>
//   </div>
// </div>

export default StepThreeTransactionReceipt;



//   <div
//   className={classnames(styles.body, styles.transactionReceipt, {
//     [styles.loading]: loading,
//   })}
// >
//   {loading ? (
//     <>
//       <HourglassEmptyIcon />
//       <span>Waiting for Tokens</span>
//     </>
//   ) : (
//     <>
//       {receipt.txHash !== undefined ? (
//         <>
//           <div className={styles.trWrapper}>
//             <div className={styles.trItem}>
//               <p className={styles.title}>$DAG amount</p>
//               <span className={styles.description}>
//                 {Number(receipt.dagQtyPurchased).toFixed(2)} $DAG{" "}
//               </span>
//             </div>
//             <SwapHorizIcon />
//             <div className={classnames(styles.trItem, styles.trMargin)}>
//               <p className={styles.title}>Paid</p>
//               <span className={styles.description}>
//                 ${receipt.amountChargedUSD / 100} USD{" "}
//               </span>
//             </div>
//           </div>

//           <div className={styles.trItem}>
//             <p className={styles.title}>Transaction ID</p>
//             <span
//               className={classnames(
//                 styles.description,
//                 styles.transaction,
//               )}
//             >
//               {receipt.txHash}
//             </span>
//             <IconButton
//               size="small"
//               className={styles.txlink}
//               onClick={() =>
//                 handleOpenLink(receipt.txHash, receipt.network)
//               }
//             >
//               <CallMadeRoundedIcon fontSize="small" />
//             </IconButton>
//           </div>
//           {/*<div className={styles.trItem}>*/}
//           {/*  <p className={styles.title}>New $DAG Balance</p>*/}
//           {/*  <span className={styles.description}>${balance} $DAG</span>*/}
//           {/*</div>*/}
//           <div className={classnames(styles.trItem, styles.noBorder)}>
//             <p className={styles.title}>Timestamp</p>
//             <span className={styles.description}>
//               {new Date(
//                 receipt["receipt"].updatedAt * 1000,
//               ).toLocaleString()}
//             </span>
//           </div>
//         </>
//       ) : (
//         <div className={styles.errorItem}>
//           {`${receipt.name}:  ${receipt.message}`}
//         </div>
//         // <div className={styles.errorItem}>
//         //   This service is currently unavailable.
//         //   <br />
//         //   Please try again later.
//         // </div>
//       )}
//       {/* <Button
//         type="button"
//         theme="primary"
//         variant={styles.button}
//         onClick={onDone}
//       >
//         {receipt.txHash !== undefined ? "DONE" : "CLOSE"}
//       </Button> */}
//     </>
//   )}
// </div>