/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { eachDayOfInterval, format, subDays } from "date-fns";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

interface HeatmapProps {
  username: string;
}

export default function Heatmap({ username }: HeatmapProps) {
  const [data, setData] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.github.com/users/${username}/events/public`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
          }
        );
        const events = res.data;
        const map: Record<string, number> = {};

        events.forEach((event: any) => {
          const date = format(new Date(event.created_at), "yyyy-MM-dd");
          map[date] = (map[date] || 0) + 1;
        });

        setData(map);
        setLoading(false);
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Failed to fetch activity data."
        );
        setLoading(false);
      }
    };
    fetchData();
  }, [username]);

  const days = eachDayOfInterval({
    start: subDays(new Date(), 365),
    end: new Date(),
  });

  if (loading) {
    return (
      <div className="grid grid-cols-53 gap-1">
        {Array.from({ length: 365 }).map((_, i) => (
          <Skeleton key={i} className="w-2 h-2 bg-blue-900/50 rounded-sm" />
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

  // Find the maximum count for better color scaling
  const maxCount = Math.max(...Object.values(data), 1);

  return (
    <Card className="border-blue-800 bg-black/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-blue-300">
          Activity Heatmap
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-53 gap-1">
          {days.map((day, i) => {
            const key = format(day, "yyyy-MM-dd");
            const count = data[key] || 0;

            // Calculate color intensity based on count relative to max
            const intensity = count / maxCount;

            // Use a gradient from dark to bright blue
            const bgColor =
              intensity > 0.8
                ? "bg-blue-500"
                : intensity > 0.6
                ? "bg-blue-600"
                : intensity > 0.4
                ? "bg-blue-700"
                : intensity > 0.2
                ? "bg-blue-800"
                : intensity > 0
                ? "bg-blue-900"
                : "bg-zinc-800";

            return (
              <div
                key={i}
                className={`w-2 h-2 ${bgColor} rounded-sm transition-colors duration-300 hover:scale-110`}
                title={`${key}: ${count} events`}
              />
            );
          })}
        </div>

        <div className="flex justify-end mt-2 text-xs text-blue-300">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-zinc-800 rounded-sm"></div>
            <span>0</span>
            <div className="w-2 h-2 bg-blue-900 rounded-sm"></div>
            <div className="w-2 h-2 bg-blue-800 rounded-sm"></div>
            <div className="w-2 h-2 bg-blue-700 rounded-sm"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-sm"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
            <span>Many</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
