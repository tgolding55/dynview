import React from "react";
import DynViewHook from "./DynViewHook";

const DynView = ({ viewObjects }) => {
  return DynViewHook(viewObjects);
};

export default DynView;
