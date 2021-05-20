import React from "react";

////////////////////////
// Page Interface
////////////////////////

export interface Page {
  title: string,
  route: string,
  surface: React.FC,
  icon?: React.FC,
};