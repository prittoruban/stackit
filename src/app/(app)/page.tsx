import PostsList from "@/components/post/PostsList";
import CreatePost from "@/components/post/CreatePost";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { TrendingUp, MessageSquare, Users, Search, Filter, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20 border-b border-gray-200/60 dark:border-gray-700/60">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-6">
            {/* Brand */}
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                StackIt
              </h1>
            </div>
            
            {/* Tagline */}
            <div className="space-y-3">
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                A collaborative Q&A platform for developers, learners, and knowledge sharers
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                Ask questions, share knowledge, and build a community of learning together
              </p>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium">Active Community</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Growing Daily</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Users className="w-4 h-4 text-purple-500" />
                <span className="font-medium">Expert Contributors</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <SignedIn>
                <CreatePost />
              </SignedIn>
              <SignedOut>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                    <SignInButton mode="modal">
                      <span>Join the Community</span>
                    </SignInButton>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Browse Questions
                  </Button>
                </div>
              </SignedOut>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Feed */}
            <div className="lg:col-span-3 space-y-6">
              {/* Content Header */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      Latest Questions
                    </h2>
                    <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full">
                      New
                    </div>
                  </div>
                  
                  {/* Static Controls - You can move these to a separate client component if needed */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-300 dark:border-gray-600"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                    
                    <select
                      defaultValue="latest"
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="latest">Latest</option>
                      <option value="trending">Trending</option>
                      <option value="unanswered">Unanswered</option>
                      <option value="votes">Most Votes</option>
                    </select>
                  </div>
                </div>
                
                {/* Static Filter Tags */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600">
                      All Topics
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600">
                      Programming
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600">
                      Technology
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600">
                      Career
                    </Button>
                  </div>
                </div>
              </div>

              {/* Questions Feed */}
              <div className="space-y-4">
                <PostsList />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Quick Actions
                  </h3>
                </div>
                <div className="p-6 space-y-3">
                  <SignedIn>
                    <CreatePost />
                  </SignedIn>
                  <SignedOut>
                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <SignInButton mode="modal">
                        <span>Sign in to Ask</span>
                      </SignInButton>
                    </Button>
                  </SignedOut>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    asChild
                  >
                    <Link href="/communities">
                      <Users className="w-4 h-4 mr-2" />
                      Browse Communities
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Community Guidelines */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Community Guidelines
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">1</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        Be respectful
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Treat all members with kindness and respect
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">2</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        Ask clear questions
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Provide context and be specific
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">3</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        Share knowledge
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Help others by providing helpful answers
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Popular Topics
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {["JavaScript", "React", "Python", "Next.js", "TypeScript", "Node.js", "CSS", "HTML"].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Help Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <HelpCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}