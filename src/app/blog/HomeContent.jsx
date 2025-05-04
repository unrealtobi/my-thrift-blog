"use client";
import Typewriter from "typewriter-effect";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // (Optional) If you plan to navigate on card click

/**
 * Helper function to highlight search matches within a text string.
 * Wraps matching text in a <mark> tag.
 */

function highlightText(text = "", query = "") {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, idx) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={idx} className="bg-yellow-200">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function HomeContent({ posts, uniqueTags }) {
  const [activeTag, setActiveTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  const handleCardClick = (slug) => {
    router.push(`/blog/${slug}`);
  };

  // ----- FILTER BY TAG + SEARCH -----
  useEffect(() => {
    // We filter posts by (activeTag) AND (searchQuery in title/description/tag)
    const queryLower = searchQuery.toLowerCase();

    const newFiltered = posts.filter((post) => {
      // 1. Tag check (if "All", skip)
      const matchesTag = activeTag === "All" || post.tag === activeTag;

      // 2. Search check
      const inTitle = post.title.toLowerCase().includes(queryLower);
      const inDescription = post.description.toLowerCase().includes(queryLower);
      const inTag = post.tag?.toLowerCase().includes(queryLower);

      // Must match the active tag AND the search text (if any)
      return matchesTag && (inTitle || inDescription || inTag || !searchQuery);
    });

    setFilteredPosts(newFiltered);
  }, [activeTag, searchQuery, posts]);

  // ----- SUGGESTIVE DROPDOWN -----
  // As user types, show matching titles/tags to pick from (like ChatGPT).
  useEffect(() => {
    if (!searchQuery) {
      setSuggestions([]);
      return;
    }
    const queryLower = searchQuery.toLowerCase();

    // Gather all possible suggestions from titles & tags
    const matchedTitles = [
      ...new Set(
        posts
          .map((p) => p.title)
          .filter((title) => title.toLowerCase().includes(queryLower))
      ),
    ];

    const matchedTags = [
      ...new Set(
        posts
          .map((p) => p.tag)
          .filter(Boolean)
          .filter((t) => t.toLowerCase().includes(queryLower))
      ),
    ];

    // Merge them (titles first, then tags, or however you prefer)
    setSuggestions([...matchedTitles, ...matchedTags]);
  }, [searchQuery, posts]);

  // When user clicks a suggestion, we fill the input and hide suggestions
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
    // Optionally reset tag to "All" if you want to search across all tags
    // setActiveTag("All");
  };

  return (
    <div className="px-8 md:py-40 py-36 sm:px-8 bg-white min-h-screen">
      {/* Page Header */}
      <header className="text-center md:px-96 mb-12">
        <h1 className="md:text-6xl text-3xl font-ubuntu font-semibold text-black sm:text-4xl  mb-4">
          The My Thrift Blog
        </h1>
        <div className="text-black">

        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString(
                "Tap into our world, insider tips, smart thrift shopping guides, exclusive drops, product updates, and more."
              )
              .callFunction(() => {
                // Hide cursor after typing
                const cursor = document.querySelector(".Typewriter__cursor");
                if (cursor) cursor.style.display = "none";
              })
              .start();
          }}
          options={{
            autoStart: true,
            loop: false,
            delay: 30,
            cursor: "|",
            wrapperClassName: "text-black", 
          }}
        />
        </div>
      </header>

      {/* Search Bar + Suggestive Dropdown */}
      <div className="flex justify-center mb-12">
        <div className="relative flex flex-col items-center w-full max-w-lg">
          {/* Input and Search Button */}
          <div className="flex items-center border py-1 px-2 border-gray-300 rounded-lg w-full md:px-2 md:py-1 bg-lightOrange">
            <input
              type="text"
              placeholder="Search Keyword"
              className="flex-grow outline-none bg-lightOrange md:text-base text-sm text-gray-700 px-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-customOrange text-sm text-white md:px-9 md:py-3 px-5 py-2 rounded-lg font-medium hover:bg-customDeepOrange transition-colors">
              Search
            </button>
          </div>

          {/* Dropdown suggestions (if any) */}
          {searchQuery && suggestions.length > 0 && (
            <div className="absolute top-[105%] left-0 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-10">
              {suggestions.map((sug) => (
                <div
                  key={sug}
                  onClick={() => handleSuggestionClick(sug)}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                >
                  {/* Highlight the part of the suggestion that matches */}
                  {highlightText(sug, searchQuery)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Top Blogs Section */}
      {posts.length > 0 ? (
        <section className="mt-20">
          <h2 className="text-3xl font-semibold font-ubuntu text-black mb-6 text-center">
            Blogs
          </h2>

          {/* Tags Filter */}
          <div className="flex flex-wrap justify-center space-x-4 mb-12">
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTag === tag
                    ? "bg-lightOrange text-gray-800 font-opensans font-medium"
                    : "bg-transparent text-gray-500 font-roboto font-normal"
                } hover:bg-customOrange hover:text-white`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Filtered Blogs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.slug.current}
                className="bg-transparent overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
                onClick={() => handleCardClick(post.slug.current)}
              >
                <div className="relative">
                  <Image
                    src={post.mainImage?.asset?.url}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="w-full h-[200px] rounded-lg object-cover"
                  />
                  {post.tag && (
                    <span className="absolute top-4 left-4 bg-[rgba(0,0,0,0.4)] text-white text-sm px-4 py-1 rounded-full backdrop-blur-md shadow-lg">
                      {highlightText(post.tag, searchQuery)}
                    </span>
                  )}
                </div>
                <div className="py-4">
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(post?.publishedAt).toLocaleDateString()} •{" "}
                    {post?.readTime}
                  </p>
                  <h3 className="text-2xl font-semibold font-ubuntu text-customOrange mb-1">
                    {highlightText(post.title, searchQuery)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {highlightText(
                      post.description.length > 100
                        ? `${post.description.slice(0, 100)}...`
                        : post.description,
                      searchQuery
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <div className="text-center mt-32">
          <h2 className="text-3xl font-semibold font-ubuntu text-gray-700">
            No blogs yet. Check back later!
          </h2>
        </div>
      )}

      {/* Tags Section */}
    </div>
  );
}
