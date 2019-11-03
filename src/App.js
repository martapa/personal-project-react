import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import events from "./events.json";

const Forked = ({ arr }) => {
  const forkedList = arr.map(fork => (
    <div>
      <a href={fork.clone_url}></a>
      <h3>{fork.full_name}</h3>
      <p>{`Forked from: ${fork.parent_name}`}</p>
    </div>
  ));

  return <div className="row">{forkedList}</div>;
};

const PullEvents = ({ arr }) => {
  const pullList = arr.map(pull => (
    <div>
      <a href={pull.url}></a>
      <h3>{pull.repo_name}</h3>
      <p>{`Status: ${pull.status}`}</p>
    </div>
  ));

  return <div className="row">{pullList}</div>;
};

function App() {
  const [githubUser, setUser] = useState("pkanal");
  const [repos, setRepos] = useState([]);
  const [events, setEvents] = useState([]);

  const handleBackButton = e => {
    setRepos([]);
    setEvents([]);
  }

  const handleUserChange = e => {
    setUser(e.target.value);
  };

  const handleUserSubmit = async e => {
    e.preventDefault();
    const parents = [
      {
        clone_url: "https://github.com/pkanal/bridge-workshop-slides-two.git",
        full_name: "pkanal/bridge-workshop-slides-two",
        parent_name: "bridge-workshop-slides-two",
        username: "pkanal"
      },
      {
        clone_url:
          "https://github.com/pkanal/gatsby-mdx-netlify-cms-starter.git",
        full_name: "pkanal/gatsby-mdx-netlify-cms-starter",
        parent_name: "gatsby-mdx-netlify-cms-starter",
        username: "pkanal"
      }
    ];
    // try {
    //   const resRepos = await axios.get(
    //     `https://api.github.com/users/${githubUser}/repos?sort=created`
    //   )
    //   const recentRepos = resRepos.data.slice(0,2)
    //   const parents = [];
    //   for (let i = 0; i < recentRepos.length; i++) {
    //     const resParent = await axios.get(`https://api.github.com/repos/${githubUser}/${recentRepos[i].name}`)
    //     const parentName = resParent.data.parent ? resParent.data.parent.name : "No data avalible"
    //     const newRepo = {
    //       username: githubUser,
    //       full_name: recentRepos[i].full_name,
    //       clone_url: recentRepos[i].clone_url,
    //       parent_name: parentName
    //     }
    //     parents.push(newRepo)
    //   }

    //   console.log("parents", parents)
    //   setRepos(parents);

    const resEvents = await axios.get(
      `https://api.github.com/users/${githubUser}/events`
    );

    console.log(resEvents);
    const pullEvents = resEvents.data.filter(
      event => event.type === "PullRequestEvent"
    );

    const newPullEvents = pullEvents.map(event => {
      const newPullEvent = {
        repo_name: event.repo.name,
        status: event.payload.action,
        url: event.repo.url
      };
      return newPullEvent;
    });
    
    setRepos(parents);
    setEvents(newPullEvents);
  };

  return (
    <>
      {repos.length === 0 ? (
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
      ) : (
        <div>
          <h2>Recent forks</h2>
          <Forked arr={repos} />
          <h2>Recent pull requests</h2>
          <PullEvents arr={events} />
        </div>
      )}
         <button onClick={handleBackButton}>
          Back button
        </button>
    </>
  );
}

export default App;
