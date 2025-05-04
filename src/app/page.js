import { client } from "../../lib/sanity";
import HomeContent from "./blog/HomeContent"; // <-- import the Client Component
export const revalidate = 0;

export default async function Home() {
  // 1. Fetch blog posts from Sanity on the server
  const query = `*[_type == "post"]{
    title,
    slug,
    description,
    mainImage {
      asset->{
        url
      }
    },
    publishedAt,
    readTime,
    tag
  }`;
  const posts = await client.fetch(query);

  // 2. Extract unique tags from the posts
  const uniqueTags = [
    "All", // Add an "All" filter at the start
    ...new Set(posts.map((post) => post.tag).filter(Boolean)),
  ];

  // 3. Pass data to the client component
  return <HomeContent posts={posts} uniqueTags={uniqueTags} />;
}
