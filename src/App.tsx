import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import RepoList from "@/pages/RepoList";
import RepoDetail from "@/pages/RepoDetails";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function App() {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />
      <main className="flex-1 mt-14 md:mt-0 overflow-auto h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/repos/:username" element={<RepoList />} />
          <Route path="/repo/:username/:reponame" element={<RepoDetail />} />
        </Routes>
        <Toaster />
      </main>
    </div>
  );
}
