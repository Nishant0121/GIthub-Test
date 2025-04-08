import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Star, Code } from "lucide-react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Repo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
}

export default function RepoList() {
  const { username } = useParams();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setError(null);
        const res = await axios.get(
          `https://api.github.com/users/${username}/repos`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
            params: {
              sort: "updated",
              per_page: 30,
            },
          }
        );
        setRepos(res.data);
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            setError(`User "${username}" not found.`);
          } else if (error.response?.status === 403) {
            setError("API rate limit exceeded. Please try again later.");
          } else {
            setError("Failed to fetch repositories. Please try again later.");
          }
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  return (
    <div className="p-6 text-white bg-gradient-to-b from-black to-blue-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Github className="h-8 w-8 text-blue-500" />
          <h2 className="text-2xl font-bold text-blue-400">
            Repositories of {username}
          </h2>
        </div>

        {error && (
          <Alert
            variant="destructive"
            className="mb-6 bg-red-900/30 border-red-800"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>

            <Link to="/">
              <Button
                variant="outline"
                className="mt-4 bg-red-900/30 text-red-300 border-red-800 hover:bg-red-900/50"
              >
                Back to Home
              </Button>
            </Link>
          </Alert>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card
                key={i}
                className="border-blue-800 bg-black/80 backdrop-blur-sm"
              >
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 bg-blue-900/50" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full bg-blue-900/50 mb-2" />
                  <Skeleton className="h-4 w-2/3 bg-blue-900/50" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-4 w-1/2 bg-blue-900/50" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo) => (
              <Link
                to={`/repo/${username}/${repo.name}`}
                key={repo.id}
                className="block transition-transform hover:scale-[1.02]"
              >
                <Card className="h-full border-blue-800 bg-black/80 backdrop-blur-sm hover:border-blue-600 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-blue-400">
                      {repo.name}
                    </CardTitle>
                    <CardDescription className="text-blue-300 line-clamp-2">
                      {repo.description || "No description"}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="bg-blue-900/30 text-blue-300 border-blue-700"
                    >
                      <Star className="h-3 w-3 mr-1" /> {repo.stargazers_count}
                    </Badge>
                    {repo.language && (
                      <Badge
                        variant="outline"
                        className="bg-blue-900/30 text-blue-300 border-blue-700"
                      >
                        <Code className="h-3 w-3 mr-1" /> {repo.language}
                      </Badge>
                    )}
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
