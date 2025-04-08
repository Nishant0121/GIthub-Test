import axios from "axios";

const token = import.meta.env.VITE_GITHUB_TOKEN;

export const useGitHubAPI = () => {
  const fetchUserRepos = async (username: string) => {
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { sort: "updated", per_page: 30 },
      }
    );
    return res.data;
  };

  const fetchRepoDetails = async (username: string, reponame: string) => {
    const res = await axios.get(
      `https://api.github.com/repos/${username}/${reponame}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  };

  return { fetchUserRepos, fetchRepoDetails };
};
