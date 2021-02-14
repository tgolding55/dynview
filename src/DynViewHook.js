import React from "react";
import TestComponent from "./TestComponent";

const Components = { TestComponent };

const DynViewHook = viewObjects => {
  const parseViewObject = viewObject => {
    if (Components[viewObject.tag]) {
      return React.createElement(
        Components[viewObject.tag],
        {
          style: viewObject.style,
          onClick: viewObject.onClick,
          id: viewObject.id,
          className: viewObject.className
        },
        viewObject.body,
        viewObject.children.map(child => parseViewObject(child))
      );
    } else {
      return React.createElement(
        viewObject.tag,
        {
          style: viewObject.style,
          onClick: viewObject.onClick,
          id: viewObject.id,
          className: viewObject.className
        },
        viewObject.body,
        viewObject.children.map(child => parseViewObject(child))
      );
    }
  };

  const convertViewobjectsToReactElements = () => {
    const parsedViewObjects = viewObjects.map(viewObject =>
      parseViewObject(viewObject)
    );

    return parsedViewObjects;
  };

  return viewObjects.length ? convertViewobjectsToReactElements() : [];
};

export default DynViewHook;
