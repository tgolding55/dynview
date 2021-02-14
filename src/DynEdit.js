import React, { useState } from "react";
import {
  Grid,
  Form,
  Dropdown,
  Button,
  Divider,
  Header,
  TextArea,
  Confirm
} from "semantic-ui-react";
import DynViewHook from "./DynViewHook";

const DynEdit = ({ viewObjects, setViewObjects }) => {
  const [selectedObj, setSelectedObj] = useState({});
  const [newElement, setNewElement] = useState({
    id: 1,
    tag: "div",
    style: { backgroundColor: "white", color: "black" },
    className: "",
    body: "",
    children: []
  });
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleClick = e => {
    e.stopPropagation();

    const recursiveSearch = searchObjects => {
      return searchObjects.forEach(searchObject => {
        if (searchObject.id === parseInt(e.target.id)) {
          setSelectedObj(searchObject);
        } else {
          recursiveSearch(searchObject.children);
        }
      });
    };
    //learn how to search gooder
    recursiveSearch(viewObjects);
  };

  const prepareEditObject = viewObject => {
    viewObject.onClick = handleClick;
    viewObject.children.forEach(child => prepareEditObject(child));
    return viewObject;
  };

  const preparedEditObjects = () => {
    const editObjects = viewObjects;

    return editObjects.map(viewObject => prepareEditObject(viewObject));
  };

  const getAvailableId = () => {
    let maxId = 1;
    const searchForMaxId = searchObj => {
      if (searchObj.id >= maxId) {
        maxId = searchObj.id + 1;
      }

      if (searchObj.children.length) {
        searchObj.children.forEach(child => searchForMaxId(child));
      }
    };
    viewObjects.forEach(viewObject => searchForMaxId(viewObject));

    return maxId;
  };

  const addElement = () => {
    if (Object.keys(selectedObj).length) {
      const editedViewObjects = [...viewObjects];

      const recursiveSearch = viewObjectsToSearch => {
        viewObjectsToSearch.forEach(viewObjectToSearch => {
          if (viewObjectToSearch.id === selectedObj.id) {
            viewObjectToSearch.children = [
              ...selectedObj.children,
              { ...newElement, id: getAvailableId() }
            ];
          } else {
            recursiveSearch(viewObjectToSearch.children);
          }
        });
      };
      recursiveSearch(editedViewObjects);

      setViewObjects(editedViewObjects);
    } else {
      setViewObjects([...viewObjects, { ...newElement, id: getAvailableId() }]);
    }
  };

  const updateSelectedObj = ({ key, value }) => {
    setSelectedObj({ ...selectedObj, [key]: value });
    updateObj({ obj: selectedObj, key, value });
  };

  const updateObj = ({ obj, key, value }) => {
    const editedViewObjects = [...viewObjects];

    const recursiveSearch = viewObjectsToSearch => {
      viewObjectsToSearch.forEach((viewObjectToSearch, index) => {
        if (viewObjectToSearch.id === obj.id) {
          viewObjectToSearch[key] = value;
        } else {
          recursiveSearch(viewObjectToSearch.children);
        }
      });
    };

    recursiveSearch(editedViewObjects);

    setViewObjects(editedViewObjects);
  };

  const deleteSelectedObjAndChildren = () => {
    const editedViewObjects = [...viewObjects];

    const recursiveSearch = viewObjectsToSearch => {
      viewObjectsToSearch.forEach((viewObjectToSearch, index) => {
        if (viewObjectToSearch.id === selectedObj.id) {
          viewObjectsToSearch.splice(index, 1);
        } else {
          recursiveSearch(viewObjectToSearch.children);
        }
      });
    };
    recursiveSearch(editedViewObjects);

    setViewObjects(editedViewObjects);

    setSelectedObj({});
  };

  return (
    <Grid style={{ height: "100%", paddingTop: "1rem" }}>
      <Grid.Row
        style={{
          height: "100%",
          width: "100%",
          paddingTop: 0,
          paddingBottom: 0
        }}
      >
        <Grid.Column
          color="black"
          style={{
            width: "30%",
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            margin: "0 0 0 0"
          }}
        >
          <div>
            <Form>
              <Form.Field>
                <label style={{ color: "white" }}>New Element Body</label>
                <input
                  onChange={e =>
                    setNewElement({ ...newElement, body: e.target.value })
                  }
                  placeholder="..."
                />
              </Form.Field>
              <Form.Field>
                <label style={{ color: "white" }}>New Element Tag</label>
                <Dropdown
                  options={[
                    { key: "div", text: "Div", value: "div" },
                    { key: "button", text: "Button", value: "button" },
                    { key: "h1", text: "Header", value: "h1" }
                  ]}
                  onChange={(e, data) =>
                    setNewElement({ ...newElement, tag: data.value })
                  }
                  selection
                ></Dropdown>
              </Form.Field>
              <Button onClick={() => addElement()}>Add new element</Button>
            </Form>
            <Divider />
            {Object.keys(selectedObj).length ? (
              <>
                <Header style={{ color: "white", textTransform: "capitalize" }}>
                  {selectedObj.tag}
                </Header>
                <TextArea
                  onChange={(e, data) => {
                    updateSelectedObj({ key: "body", value: data.value });
                  }}
                  value={selectedObj.body}
                />
                <input
                  onChange={e =>
                    updateSelectedObj({
                      key: "className",
                      value: e.target.value
                    })
                  }
                  placeholder="..."
                />
                <div>
                  <label>Background Colour</label>
                  <Dropdown
                    selection
                    onChange={(e, data) => {
                      updateSelectedObj({
                        key: "style",
                        value: {
                          ...selectedObj.style,
                          backgroundColor: data.value
                        }
                      });
                    }}
                    value={selectedObj.style.backgroundColor}
                    options={[
                      { key: "black", text: "Black", value: "black" },
                      { key: "red", text: "Red", value: "red" },
                      { key: "green", text: "Green", value: "green" },
                      { key: "white", text: "White", value: "white" }
                    ]}
                  />
                </div>
                <div>
                  <label>Text Colour</label>
                  <Dropdown
                    selection
                    onChange={(e, data) => {
                      updateSelectedObj({
                        key: "style",
                        value: { ...selectedObj.style, color: data.value }
                      });
                    }}
                    value={selectedObj.style.color}
                    options={[
                      { key: "black", text: "Black", value: "black" },
                      { key: "green", text: "Green", value: "green" },
                      { key: "red", text: "Red", value: "red" },
                      { key: "white", text: "White", value: "white" }
                    ]}
                  />
                </div>

                <div>
                  <Button negative onClick={() => setDeleteOpen(true)}>
                    Delete
                  </Button>
                  <Confirm
                    open={deleteOpen}
                    content="This will also delete delete all children."
                    onCancel={() => {
                      setDeleteOpen(false);
                    }}
                    onConfirm={() => {
                      deleteSelectedObjAndChildren();
                      setDeleteOpen(false);
                    }}
                  ></Confirm>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </Grid.Column>
        <Grid.Column
          style={{
            width: "70%",
            paddingRight: 0,
            paddingLeft: 0
          }}
        >
          <div
            style={{ borderStyle: "solid", height: "100%", width: "100%" }}
            onClick={() => {
              setSelectedObj({});
            }}
          >
            {DynViewHook(preparedEditObjects())}
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default DynEdit;
