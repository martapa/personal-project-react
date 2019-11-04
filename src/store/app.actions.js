import axios from "axios";

export const ACTION_TYPES = {
  GET_REPOS: "get list of repositories",
  GET_EVENTS: "get list of events",
  SET_IS_LOADING: "set loading"
};

export const setRepoList = (repos = []) => ({
  type: ACTION_TYPES.GET_REPOS,
  payload: repos
});

export const setEventsList = (events = []) => ({
  type: ACTION_TYPES.GET_EVENTS,
  payload: events
});

export const setIsLoading = (isLoading = false) => ({
  type: ACTION_TYPES.SET_IS_LOADING,
  payload: isLoading
});

export const fetchApiThunk = githubUser => async dispatch => {
  const resRepos = await axios.get(
    `https://api.github.com/users/${githubUser}/repos?sort=created`
  );
  const recentRepos = resRepos.data.slice(0, 2);
  const repos = [];
  for (let i = 0; i < recentRepos.length; i++) {
    const resParent = await axios.get(
      `https://api.github.com/repos/${githubUser}/${recentRepos[i].name}`
    );
    const parentName = resParent.data.parent
      ? resParent.data.parent.name
      : "No data avalible";
    const newRepo = {
      username: githubUser,
      full_name: recentRepos[i].full_name,
      clone_url: recentRepos[i].clone_url,
      parent_name: parentName
    };
    repos.push(newRepo);
  }
  const resEvents = await axios.get(
    `https://api.github.com/users/${githubUser}/events`
  );

  const pullEvents = resEvents.data.filter(
    event => event.type === "PullRequestEvent"
  );

  const events = pullEvents.map(event => {
    const newPullEvent = {
      repo_name: event.repo.name,
      status: event.payload.action,
      url: event.repo.url
    };
    return newPullEvent;
  });
  dispatch(setIsLoading(false));
  dispatch(setRepoList(repos));
  dispatch(setEventsList(events));
};
