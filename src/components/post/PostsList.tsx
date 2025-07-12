import { getPosts } from "@/sanity/lib/post/getPosts";
import { currentUser } from "@clerk/nextjs/server";
import Post from "./Post";

async function PostsList() {
  const posts = await getPosts();
  const user = await currentUser();

  return (
    <div className="relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 via-purple-900/5 to-rose-900/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)] pointer-events-none" />

      {/* Posts Container */}
      <div className="relative space-y-6 pb-8">
        {/* Header Section */}
        <div className="sticky top-0 z-30 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50 -mx-6 px-6 py-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Latest Posts
              </h2>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6 lg:gap-8">
          {posts.map((post, index) => (
            <div
              key={post._id}
              className="group relative transform transition-all duration-700 ease-out animate-in fade-in slide-in-from-bottom-8"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Post Card Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/30 dark:from-gray-800/60 dark:to-gray-900/30 rounded-2xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg group-hover:shadow-2xl transition-all duration-500" />

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Post Content */}
              <div className="relative z-10 p-6 lg:p-8 group-hover:-translate-y-1 transition-transform duration-500">
                <Post post={post} userId={user?.id || null} />
              </div>

              {/* Animated Border */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-sm" />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-16 space-y-4">
            <div className="relative">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400 dark:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl opacity-50" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              No posts yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Be the first to share something amazing with the community!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostsList;
