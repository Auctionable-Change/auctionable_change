import NavBar from "./NavBar";
import React from "react";
import renderer from "react-test-renderer";


describe("NavBar", () => {
  it("should render three icons component", () => {
    const tree = renderer.create(<NavBar />).toJSON();
    expect(tree.children.length).toBe(3);
  });
  it("renders correctly", () => {
    const tree = renderer.create(<NavBar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should render a search icon first", () => {
    const tree = renderer.create(<NavBar />).toJSON();
    const searchIconId = tree.children[0].children[0].children[0].props.id;
    expect(searchIconId).toBe("search");
  });
  it("should render a plus icon second", () => {
    const tree = renderer.create(<NavBar />).toJSON();
    const addIconId = tree.children[1].children[0].children[0].props.id;
    expect(addIconId).toBe("add");
  });
  it("should render a profile icon third", () => {
    const tree = renderer.create(<NavBar />).toJSON();
    const addIconId = tree.children[2].children[0].children[0].props.id;
    expect(addIconId).toBe("home");
  });

});
