
/////////////////////////
// Module Imports
/////////////////////////

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

/////////////////////////
// Components
/////////////////////////

import { Layout } from "src/components/common";

/////////////////////////
// Interfaces
/////////////////////////

import { Page } from "src/interfaces/page";

/////////////////////////
// Pages
/////////////////////////

import BuyDag from "src/pages/buy-dag";
import ConnectWallet from "src/pages/connect-wallet";
import Portfolio from "src/pages/portfolio";
import Swap from "src/pages/swap";
import Terminal from "src/pages/terminal";
import TermsAndConditions from "src/pages/terms-and-conditions";
import PrivacyPolicy from "src/pages/privacy-policy";

/////////////////////////
// Icons
/////////////////////////

import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import PersonIcon from "@material-ui/icons/Person";
import SwapCallsIcon from "@material-ui/icons/SwapCalls";
import DashboardIcon from "@material-ui/icons/Dashboard";

/////////////////////////
// Page Titles
/////////////////////////

const PAGE_TITLES = {
  connectWallet: 'Connect Wallet',
  buyDag: 'Buy DAG',
  portfolio: 'Portfolio',
  swap: 'Swap',
  terminal: 'Terminal',
  termsAndCondition: 'Terms & Conditions',
  privacyPolicy: 'Privacy Policy',
}

/////////////////////////
// All Pages List
/////////////////////////

export const PAGES: Array<Page> = [
  {
    title: PAGE_TITLES.connectWallet,
    route: "/connect-wallet",
    surface: ConnectWallet,
    icon: AccountBalanceWalletIcon,
  },
  { 
    title: PAGE_TITLES.buyDag,
    route: "/buy-dag",
    surface: BuyDag,
    icon: CreditCardIcon,
  },
  {
    title: PAGE_TITLES.portfolio,
    route: "/portfolio",
    surface: Portfolio,
    icon: PersonIcon,
  },
  {
    title: PAGE_TITLES.swap,
    route: "/swap",
    surface: Swap,
    icon: SwapCallsIcon,
  },
  {
    title: PAGE_TITLES.terminal,
    route: "/terminal",
    surface: Terminal,
    icon: DashboardIcon,
  }, 
  {
    title: PAGE_TITLES.termsAndCondition,
    route: "/terms-and-conditions",
    surface: TermsAndConditions,
    icon: undefined,
  },
  {
    title: PAGE_TITLES.privacyPolicy,
    route: '/privacy-policy',
    surface: PrivacyPolicy,
    icon: undefined,
  }
];

/////////////////////////
// Page List
/////////////////////////

// Sidebar Links - Filters by title
const SIDE_BAR_PAGE_LIST: Array<string> = [
  PAGE_TITLES.connectWallet,
  PAGE_TITLES.buyDag,
  PAGE_TITLES.portfolio,
  PAGE_TITLES.swap,
  PAGE_TITLES.terminal,
];

// Footer Links - Filters by title
const FOOTER_PAGE_LIST: Array<string> = [
  PAGE_TITLES.termsAndCondition,
  PAGE_TITLES.privacyPolicy,
]

///////////////////////////////////////
// Page List Filter - Helper Functions
///////////////////////////////////////

const getSideBarPages = (): Array<Page> => {
  return PAGES.filter(page => {
    return SIDE_BAR_PAGE_LIST.includes(page.title);
  })
}

const getFooterPages = (): Array<Page> => {
  return PAGES.filter(page => {
    return FOOTER_PAGE_LIST.includes(page.title);
  })
}

///////////////////////////////////////
// Page Rendering - Helper Functions
///////////////////////////////////////

const LoadRoutes = () => {
  return (
    <Switch>
      {PAGES.map(page => {
        return (
          <Route path={page.route}>
            <page.surface />
          </Route>
        )
      })}
    </Switch>
  );
}

const LoadPages = () => {
  return (
    <Router>
      <Layout>
          <LoadRoutes />
      </Layout>
    </Router>
  )
}

/////////////////////////
// Export
/////////////////////////

export {
  getSideBarPages,
  getFooterPages,
  LoadPages,
}