import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { fetchApiThunk, setIsLoading } from "./store/app.actions.js";
import { connect } from "react-redux";

import events from "./events.json";

const Forked = ({ arr }) => {
  const forkedList = arr.map((fork, index) => (
    <div key={`${fork.name}-${index}`}>
      <a href={fork.clone_url}></a>
      <h3>{fork.full_name}</h3>
      <p>{`Forked from: ${fork.parent_name}`}</p>
    </div>
  ));

  return <div className="row">{forkedList}</div>;
};

const PullEvents = ({ arr }) => {
  const pullList = arr.map(pull => (
    <div key={pull.repo_name}>
      <a href={pull.url}></a>
      <h3>{pull.repo_name}</h3>
      <p>{`Status: ${pull.status}`}</p>
    </div>
  ));

  return <div className="row">{pullList}</div>;
};

function App({ isLoading, repos, events, fetchApiData, setIsLoading }) {
  const [githubUser, setUser] = useState("pkanal");

  const handleBackButton = e => {
    setIsLoading(true);
  };

  const handleUserChange = e => {
    setUser(e.target.value);
  };

  const handleUserSubmit = e => {
    e.preventDefault();
    fetchApiData(githubUser);
  };

  return (
    <>
      {isLoading ? (
        <div>
          <form onSubmit={handleUserSubmit}>
            <label>
              Github username:
              <input
                type="text"
                name="name"
                value={githubUser}
                onChange={handleUserChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      ) : (
        <div>
          <h2>Recent forks</h2>
          <Forked arr={repos} />
          <h2>Recent pull requests</h2>
          <PullEvents arr={events} />
          <button onClick={handleBackButton}>back button</button>
        </div>
      )}
    </>
  );
}

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  events: state.events,
  repos: state.repos
});

const mapDispatchToProps = dispatch => ({
  fetchApiData: githubUser => dispatch(fetchApiThunk(githubUser)),
  setIsLoading: b => dispatch(setIsLoading(b))
});

export const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
