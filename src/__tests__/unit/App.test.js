import React from "react";
import ReactDOM from "react-dom";
import App from "../../App";
import axios from "axios";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

Enzyme.configure({ adapter: new Adapter() });

import { shallow } from "enzyme";

import repos from "../mockData/repos.json";

axios.get = jest.fn(() => Promise.resolve(repos));

it("calls axios and returns repos", async () => {
  const response = await axios.get(
    "https://api.github.com/users/martapa/repos?sort=created"
  );
  expect(response).toEqual(repos);
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith(
    "https://api.github.com/users/martapa/repos?sort=created"
  );
});

describe("<App /> shallow rendering", () => {
  it("should render App", () => {
    const wrapper = shallow(<App />);
  });

  it("matches the snapshot", () => {
    const wrapper = shallow(<App />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
