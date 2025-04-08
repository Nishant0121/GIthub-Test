/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Heatmap from "@/components/Heatmap";
import BarChart from "@/components/BarChart";
import { SkeletonCard } from "@/components/SkeletonLoader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Star,
  GitFork,
  AlertCircle,
  Calendar,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RepoDetails() {
  const { username, reponame } = useParams<{
    username: string;
    reponame: string;
  }>();
  const [repo, setRepo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepo = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `https://api.github.com/repos/${username}/${reponame}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      );
      setRepo(res.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Error fetching repository details."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepo();
  }, [username, reponame]);

  if (loading) return <SkeletonCard />;
  if (error)
    return (
      <div className="p-4">
        <Card className="border-red-800 bg-black/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2 text-red-400">
              <AlertCircle className="h-5 w-5" />
              <CardTitle>Error</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-red-300">{error}</p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="border-red-700 text-red-300 hover:bg-red-900/20"
            >
              <RefreshCw className="h-4 w-4 mr-2" /> Retry
            </Button>
          </CardFooter>
        </Card>
      </div>
    );

  return (
    <div className="p-4 text-white space-y-6 bg-gradient-to-b from-black to-blue-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Card className="border-blue-800 bg-black/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Github className="h-6 w-6 text-blue-500" />
              <CardTitle className="text-xl font-semibold text-blue-400">
                {repo.full_name}
              </CardTitle>
            </div>
            <CardDescription className="text-blue-300">
              {repo.description || "No description provided."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Badge
                variant="outline"
                className="bg-blue-900/30 text-blue-300 border-blue-700"
              >
                <Star className="h-3 w-3 mr-1" /> Stars: {repo.stargazers_count}
              </Badge>
              <Badge
                variant="outline"
                className="bg-blue-900/30 text-blue-300 border-blue-700"
              >
                <GitFork className="h-3 w-3 mr-1" /> Forks: {repo.forks_count}
              </Badge>
              <Badge
                variant="outline"
                className="bg-blue-900/30 text-blue-300 border-blue-700"
              >
                <AlertCircle className="h-3 w-3 mr-1" /> Issues:{" "}
                {repo.open_issues_count}
              </Badge>
              <Badge
                variant="outline"
                className="bg-blue-900/30 text-blue-300 border-blue-700"
              >
                <Calendar className="h-3 w-3 mr-1" /> Created:{" "}
                {new Date(repo.created_at).toLocaleDateString()}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card className="border-blue-800 bg-black/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-blue-300">
                User Activity Heatmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              {username && <Heatmap username={username} />}
            </CardContent>
          </Card>

          <Card className="border-blue-800 bg-black/80 backdrop-blur-sm">
            <CardContent>
              {username && reponame && (
                <BarChart username={username} reponame={reponame} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
