import { Link } from "react-router-dom";
import { Github, Home, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div
        className={`fixed top-0 py-2 left-4 z-50 w-full md:hidden  ${
          isMobileMenuOpen ? "" : "backdrop-blur-lg"
        }`}
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-blue-300 hover:text-blue-400 hover:bg-blue-900/30"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? "" : <Menu className="h-8 w-8" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static w-64 bg-gradient-to-b from-blue-950 to-black text-white h-screen p-6 border-r border-blue-800 transition-transform duration-300 ease-in-out z-40 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center gap-2 mb-6">
          <Github className="h-8 w-8 text-blue-500" />
          <h2 className="text-2xl font-bold text-blue-300">Analyzer</h2>
        </div>

        <Separator className="bg-blue-800 mb-6" />

        <nav className="flex flex-col gap-2">
          <Button
            asChild
            variant="ghost"
            className="justify-start text-blue-300 hover:text-blue-400 hover:bg-blue-900/30"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Home
            </Link>
          </Button>
        </nav>
      </aside>
    </>
  );
}
