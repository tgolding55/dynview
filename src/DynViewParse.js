import React from "react";
import Components from "./components/index";

const DynViewParse = viewObjects => {
  const parseViewObject = viewObject => {
    if (Components[viewObject.tag]) {
      return React.createElement(
        Components[viewObject.tag],
        {
          key: "parsedViewObject" + viewObject.id,
          style: viewObject.style,
          onClick: viewObject.onClick,
          id: viewObject.id,
          className: viewObject.className,
          ...viewObject.props
        },
        viewObject.body,
        viewObject.children.map(child => parseViewObject(child))
      );
    } else {
      return React.createElement(
        viewObject.tag,
        {
          key: "parsedViewObject" + viewObject.id,
          style: viewObject.style,
          onClick: viewObject.onClick,
          id: viewObject.id,
          className: viewObject.className,
          ...viewObject.props
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

export default DynViewParse;
