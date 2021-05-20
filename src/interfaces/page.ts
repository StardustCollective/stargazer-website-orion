import React from "react";

////////////////////////
// Page Interface
////////////////////////


/**
 *  @param {Object} Page A page object as defined by the Page interface.
 *  @param {string} Page.route A requried string defining a route that will 
 *  be displayed in the URL
 *  @param {React.FC} Page.surface A required page view component that will 
 *  be displayed when the current url matched the route.
 *  @param {string} Page.title A optional string that will be displayed in 
 *  the sidebar or footer navigation when the page is registered to a 
 *  page list.
 *  @param {React.FC} Page.icon A optional svg icon compoennt that will be displayed
 * in the sidebar when a page os regisred to the side bar list.
 */

export interface Page {
  title: string,
  route: string,
  surface: React.FC,
  icon?: React.FC,
};