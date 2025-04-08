import { Link } from "react-router-dom";

interface RepoCardProps {
  repo: {
    id: number;
    name: string;
    description: string;
    stargazers_count: number;
    language: string;
  };
  username: string;
}

export default function RepoCard({ repo, username }: RepoCardProps) {
  return (
    <Link
      to={`/repo/${username}/${repo.name}`}
      className="border border-blue-700 rounded-lg p-4 hover:bg-blue-900 transition"
    >
      <h3 className="text-xl font-semibold">{repo.name}</h3>
      <p>{repo.description || "No description"}</p>
      <p className="text-sm">
        ⭐ {repo.stargazers_count} | {repo.language}
      </p>
    </Link>
  );
}
