
/////////////////////////
// Module Imports
/////////////////////////

import { Switch, Redirect, Route, BrowserRouter as Router } from "react-router-dom";

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

const PAGE_ROUTES = {
  home: "/",
  connectWallet: "/connect-wallet",
  buyDag: "/buy-dag",
  portfolio: "/portfolio",
  swap: "/swap",
  terminal: "/terminal",
  termsAndCondition: "/terms-and-conditions",
  privacyPolicy: "/privacy-policy",
}

/////////////////////////
// All Pages List
/////////////////////////

export const PAGES: Array<Page> = [
  {
    title: PAGE_TITLES.connectWallet,
    route: PAGE_ROUTES.connectWallet,
    surface: ConnectWallet,
    navigation: {
      icon: AccountBalanceWalletIcon,
    }
  },
  {
    title: PAGE_TITLES.buyDag,
    route: PAGE_ROUTES.buyDag,
    surface: BuyDag,
    navigation: {
      icon: CreditCardIcon,
    }
  },
  {
    title: PAGE_TITLES.portfolio,
    route: PAGE_ROUTES.portfolio,
    surface: Portfolio,
    navigation: {
      icon: PersonIcon,
      disabled: true,
    }
  },
  {
    title: PAGE_TITLES.swap,
    route: PAGE_ROUTES.swap,
    surface: Swap,
    navigation: {
      icon: SwapCallsIcon,
      disabled: true,
    }
  },
  {
    title: PAGE_TITLES.terminal,
    route: PAGE_ROUTES.terminal,
    surface: Terminal,
    navigation: {
      icon: DashboardIcon,
      disabled: true,
    }
  },
  {
    title: PAGE_TITLES.termsAndCondition,
    route: PAGE_ROUTES.termsAndCondition,
    surface: TermsAndConditions,
  },
  {
    title: PAGE_TITLES.privacyPolicy,
    route: PAGE_ROUTES.privacyPolicy,
    surface: PrivacyPolicy,
  }
];

/////////////////////////
// Page List
/////////////////////////

// Sidebar Links - Filters by title
const SIDE_BAR_PAGE_LIST: Array<string> = [
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
      <Route
        exact
        path={PAGE_ROUTES.home}
        render={() => {
          return (
            <Redirect to={PAGE_ROUTES.buyDag}/>
          );
        }}
      />
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