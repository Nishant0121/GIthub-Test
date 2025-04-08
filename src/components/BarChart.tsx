/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

interface BarChartProps {
  username: string;
  reponame: string;
}

export default function BarChart({ username, reponame }: BarChartProps) {
  const [weeklyCommits, setWeeklyCommits] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let retries = 0;
    const fetchCommitActivity = async () => {
      try {
        const res = await axios.get(
          `https://api.github.com/repos/${username}/${reponame}/stats/commit_activity`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
          }
        );

        if (!Array.isArray(res.data)) {
          if (retries < 5) {
            retries++;
            setTimeout(fetchCommitActivity, 1000); // Retry in 1 sec
          } else {
            setError(
              "GitHub is taking too long to generate stats. Try again later."
            );
          }
          return;
        }

        setWeeklyCommits(res.data.map((w: any) => w.total).slice(-12));
        setLoading(false);
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Failed to fetch commit activity."
        );
        setLoading(false);
      }
    };

    fetchCommitActivity();
  }, [username, reponame]);

  if (loading) {
    return (
      <div className="flex items-end gap-2 h-32">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="flex-1 h-8 bg-blue-900/50 rounded-t" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-red-400 text-sm p-2 rounded-md bg-red-900/20 border border-red-800">
        <AlertCircle className="h-4 w-4" />
        <span>{error}</span>
      </div>
    );
  }

  const maxCommits = Math.max(...weeklyCommits);
  const weekLabels = Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`);

  return (
    <Card className="border-blue-800 bg-black/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-blue-300">
          Weekly Commit Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-2 h-32">
          {weeklyCommits.map((count, i) => {
            const height = maxCommits > 0 ? (count / maxCommits) * 60 : 0; // Modified to 60% of max height
            return (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className="bg-blue-600 w-full rounded-t transition-all duration-300 hover:bg-blue-500"
                  style={{ height: `${height}px` }}
                  title={`${weekLabels[i]}: ${count} commits`}
                ></div>
                <span className="text-xs text-blue-300 mt-1">{count}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
