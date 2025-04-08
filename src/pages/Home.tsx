import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function Home() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!username.trim()) return;
    navigate(`/repos/${username}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-black to-blue-950">
      <Card className="w-full max-w-md border-blue-800 bg-black/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Github className="h-12 w-12 text-blue-500" />
          </div>
          <CardTitle className="text-3xl font-bold text-blue-500">
            GitHub Profile Analyzer
          </CardTitle>
          <CardDescription className="text-blue-300">
            Enter a GitHub username to analyze their profile and repositories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter GitHub Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-black/50 border-blue-800 focus:border-blue-500 text-white text-shadow-white"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Analyze Profile
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
