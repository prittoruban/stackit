"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import {
  Search,
  Bell,
  Plus,
  Home,
  Users,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import CreatePost from "../post/CreatePost";
import CreateCommunityButton from "./CreateCommunityButton";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  subreddits?: Array<{
    title: string;
    slug: string;
  }>;
}

function Header({ subreddits }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setShowMobileSearch(false);
    }
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
    setShowMobileMenu(false);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
    setShowMobileSearch(false);
  };

  const closeMobileMenus = () => {
    setShowMobileMenu(false);
    setShowMobileSearch(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/98 dark:bg-gray-900/98 backdrop-blur-md shadow-lg border-b border-gray-200/90 dark:border-gray-700/90"
            : "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200/60 dark:border-gray-700/60 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - Logo & Navigation */}
            <div className="flex items-center space-x-1">
              {/* Logo/Brand */}
              <Link
                href="/"
                className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-gray-100/70 dark:hover:bg-gray-800/70 transition-all duration-200 group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200">
                  <span className="text-white font-bold text-sm">Q</span>
                </div>
                <span className="text-gray-900 dark:text-white font-semibold text-lg hidden sm:block">
                  QnA
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-1 ml-6">
                <Link
                  href="/"
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-gray-100/70 dark:hover:bg-gray-800/70 transition-all duration-200 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <Home className="w-4 h-4" />
                  <span className="font-medium">Home</span>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-gray-100/70 dark:hover:bg-gray-800/70 transition-all duration-200 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                      <Users className="w-4 h-4" />
                      <span className="font-medium">Communities</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-64 mt-1">
                    <DropdownMenuItem asChild>
                      <CreateCommunityButton />
                    </DropdownMenuItem>
                    {subreddits && subreddits.length > 0 && (
                      <>
                        <DropdownMenuSeparator />
                        <div className="px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Your Communities
                        </div>
                        {subreddits.map((subreddit) => (
                          <DropdownMenuItem key={subreddit.slug} asChild>
                            <Link
                              href={`/community/${subreddit.slug}`}
                              className="flex items-center space-x-2 px-3 py-2"
                            >
                              <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-md flex items-center justify-center text-white text-xs font-medium">
                                {subreddit.title.charAt(0).toUpperCase()}
                              </div>
                              <span>{subreddit.title}</span>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>
            </div>

            {/* Center - Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions, topics, or communities..."
                  className="w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/60 focus:bg-white dark:focus:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
                />
              </form>
            </div>

            {/* Right Side - Actions & User */}
            <div className="flex items-center space-x-2">
              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100/70 dark:hover:bg-gray-800/70 transition-all duration-200"
              >
                {showMobileMenu ? (
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
              </button>

              {/* Mobile Search Toggle */}
              <button
                onClick={toggleMobileSearch}
                className="md:hidden p-2 rounded-xl hover:bg-gray-100/70 dark:hover:bg-gray-800/70 transition-all duration-200"
              >
                <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>

              {/* Notifications */}
              <SignedIn>
                <button className="relative p-2 rounded-xl hover:bg-gray-100/70 dark:hover:bg-gray-800/70 transition-all duration-200 hidden sm:block">
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </SignedIn>

              {/* Ask Question Button */}
              <div className="hidden sm:block">
                <CreatePost />
              </div>

              {/* Mobile Ask Question */}
              <SignedIn>
                <div className="sm:hidden">
                  <button className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </SignedIn>

              {/* User Authentication */}
              <SignedIn>
                <div className="flex items-center">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox:
                          "w-8 h-8 ring-2 ring-blue-500/20 hover:ring-blue-500/40 transition-all duration-200 shadow-sm hover:shadow-md",
                      },
                    }}
                  />
                </div>
              </SignedIn>

              <SignedOut>
                <Button
                  asChild
                  variant="outline"
                  className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <SignInButton mode="modal">
                    <span>
                      <span className="hidden sm:inline">Sign In</span>
                      <span className="sm:hidden">Login</span>
                    </span>
                  </SignInButton>
                </Button>
              </SignedOut>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="md:hidden border-t border-gray-200/50 dark:border-gray-700/50 px-4 py-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/60 focus:bg-white dark:focus:bg-gray-800 transition-all duration-200 shadow-sm"
                autoFocus
              />
            </form>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={closeMobileMenus}
        >
          <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg">
            <nav className="px-4 py-3 space-y-1">
              <Link
                href="/"
                onClick={closeMobileMenus}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-100/70 dark:hover:bg-gray-800/70 transition-all duration-200 text-gray-700 dark:text-gray-300"
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Home</span>
              </Link>

              <div className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Communities
              </div>

              <div className="px-4 py-2">
                <CreateCommunityButton />
              </div>

              {subreddits?.map((subreddit) => (
                <Link
                  key={subreddit.slug}
                  href={`/community/${subreddit.slug}`}
                  onClick={closeMobileMenus}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-100/70 dark:hover:bg-gray-800/70 transition-all duration-200 text-gray-700 dark:text-gray-300"
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-md flex items-center justify-center text-white text-xs font-medium">
                    {subreddit.title.charAt(0).toUpperCase()}
                  </div>
                  <span>{subreddit.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
