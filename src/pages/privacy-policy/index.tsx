import React from "react";

import { Layout } from "@components/common";

import styles from "./index.module.scss";

const PrivacyPolicy: React.FC = () => {
  return (
    <Layout>
      <div className={styles.pageWrapper}>
        <div className={styles.header}>
          <img src="/images/bottom-logo.svg" alt="logo" />
        </div>
        <div className={styles.body}>
          <p className={styles.TYPO_BIG}>Privacy Policy</p>
          <p className={styles.TYPO_XSMALL}>
            This Privacy Policy informs you of the ways we ensure privacy and
            the confidentiality of Personal Data. We are compliant with
            applicable privacy laws in the countries in which we operate. It's
            your own responsibility to read the Privacy Policy carefully before
            you start to use Stargazer Wallet.
          </p>
          <p className={styles.TYPO_MEDIUM}>Principles</p>
          <li className={styles.TYPO_XSMALL}>
            Privacy is a human right and software should help protect your
            rights.
          </li>
          <li className={styles.TYPO_XSMALL}>
            We don’t require you to register or log in.
          </li>
          <li className={styles.TYPO_XSMALL}>
            We don’t have access to your funds (private keys).
          </li>
          <li className={styles.TYPO_XSMALL}>
            We don’t require your name or email address.
          </li>
          <p className={styles.TYPO_MEDIUM}>Registration/Login Not Required</p>
          <p className={styles.TYPO_XSMALL}>
            Stargazer Wallet does not require you to register or log in with any
            identifying information.
          </p>
          <p className={styles.TYPO_SMALL}>
            Private Keys Stay on a Device
            <br />
            <span className={styles.TYPO_XSMALL}>
              Your private keys will stay on your device.
            </span>
          </p>
          <p className={styles.TYPO_SMALL}>
            Blockchain Transactions
            <br />
            <span className={styles.TYPO_XSMALL}>
              Your blockchain transactions may be relayed through servers
              (“nodes”) and will be publicly visible due to the public nature of
              distributed ledger systems.
            </span>
          </p>
          <p className={styles.TYPO_SMALL}>
            Communication with Third-Party Servers
            <br />
            <span className={styles.TYPO_XSMALL}>
              Balances, transactions and other blockchain information may be
              read from or relayed to, third-party servers. We cannot guarantee
              the privacy of your Internet connection.
            </span>
          </p>

          <p className={styles.TYPO_SMALL}>
            Analytics
            <br />
            <span className={styles.TYPO_XSMALL}>
              Stargazer Wallet does not currently use an analytics service. If
              that changes in the future, we will be updating our Privacy Policy
              to reflect that and include any associated privacy policies.
            </span>
          </p>
          <p className={styles.TYPO_SMALL}>
            All User Information is Confidential
            <br />
            <span className={styles.TYPO_XSMALL}>
              Any personally identifying information which is voluntarily
              submitted, in the event of providing support, will be kept
              strictly confidential and never provided to third parties (other
              than in an aggregated, anonymized report such as the number of
              users per month). All Stardust Collective staff are bound by
              confidentiality agreements.
            </span>
          </p>
          <p className={styles.TYPO_SMALL}>
            Acceptance
            <br />
            <span className={styles.TYPO_XSMALL}>
              By using Stargazer Wallet, you signify your agreement to this
              Policy. Stardust Collective reserves the right to change this
              Privacy Policy at any time. Any changes will be posted so that you
              are always aware of any updates.
            </span>
          </p>
          <p className={styles.TYPO_SMALL}>
            Questions
            <br />
            <span className={styles.TYPO_XSMALL}>
              Any questions about this policy should be directed to
              https://t.me/StardustSupport.
            </span>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
