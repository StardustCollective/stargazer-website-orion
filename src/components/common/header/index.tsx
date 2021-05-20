import React, { useState } from "react";
import AppsSharpIcon from "@material-ui/icons/AppsSharp";
import { IconButton } from "@material-ui/core";
// import { Button } from "@components/common/button/index";
import styles from "./index.module.scss";

export const Header: React.FC = () => {
  let currentAccount;

  const [isConnected, setConnected] = useState<boolean>(false);

  React.useEffect(() => {
    if (window["ethereum"]) {
      setConnected(true);
    } else {
      setTimeout(() => {
        if (window["ethereum"]) {
          setConnected(true);
        }
      }, 3000);
    }
  }, []);

  // const handleClick = () => {
  //   //handleEthEnable();
  //   handleStargazerEnable();
  // };

  // const handleStargazerEnable = () => {
  //   window["stargazer"]
  //     .enable()
  //     .then((account) => {
  //       console.log("Successfully connected to Stargazer.", account);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  // const handleEthEnable = () => {
  //   window["ethereum"]
  //     .request({ method: "eth_requestAccounts" })
  //     .then(handleAccountsChanged)
  //     .catch((err) => {
  //       if (err.code === 4001) {
  //         // EIP-1193 userRejectedRequest error
  //         // If this happens, the user rejected the connection request.
  //         console.log("Please connect to MetaMask.");
  //       } else {
  //         console.error(err);
  //       }
  //     });
  // };

  const handleAccountsChanged = async (accounts) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log("Please connect to MetaMask.");
    } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0];
      // Do any other work!
      console.log("currentAccount", currentAccount);
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <img
          className={styles.logo}
          src="/images/logo.png"
          alt="logo"
          width="95"
          height="44"
        />
        <span className={styles.title}>Stargazer Network</span>
      </div>
      <div className={styles.right}>
        {/*<a className={styles.navItem}>Tools & Analytics</a>*/}
        {/*<span className={styles.splitter} />*/}
        {/*<a className={styles.navItem}>Documentation</a>*/}
        {/*<span className={styles.splitter} />*/}
        {/*<a className={styles.navItem}>About</a>*/}
        {/* <Button
          type="button"
          theme="secondary"
          variant={styles.button}
          onClick={handleClick}
          disabled={false}
        >
          Connect Wallet
        </Button> */}
        <IconButton className={styles.iconButton}>
          <AppsSharpIcon />
        </IconButton>
      </div>
    </div>
  );
};
