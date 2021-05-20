import React from "react";

////////////////////////
// Interfaces
////////////////////////

/**
 * @typedef {object} Navigation Options applied the the left sidebar navigation component.
 * @param {React.FC} Navigation.icon A optional svg icon component that will be displayed
 * in the sidebar when a page is registered to the side bar list.
 * @param {boolean} Navigation.disabled A optional flag that can disable the page in the sidebar
 * navigation.
 */

interface Navigation {
  icon?: React.FC,
  disabled?: boolean,
}

/**
 *  @param {Object} Page A page object as defined by the Page interface.
 *  @param {string} Page.route A required string defining a route that will 
 *  be displayed in the URL
 *  @param {React.FC} Page.surface A required page view component that will 
 *  be displayed when the current url matched the route.
 *  @param {string} Page.title A optional string that will be displayed in 
 *  the sidebar or footer navigation when the page is registered to a 
 *  page list.
 */

export interface Page {
  title?: string,
  route: string,
  surface: React.FC,
  navigation?: Navigation,
};

