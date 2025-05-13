import { client } from "../../../../lib/sanity";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import { IoIosShare } from "react-icons/io";
import ShareButton from "@/components/ShareButton";
// Configure the image URL builder
const builder = imageUrlBuilder(client);

// Helper function to generate image URLs
function urlFor(source) {
  return builder.image(source);
}
export async function generateMetadata({ params }) {
  const { slug } = params;
  const blogPost = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      description,
      mainImage{
        asset->{
          url
        }
      }
    }`,
    { slug }
  );

  if (!blogPost) {
    return {
      title: "Post not found",
    };
  }

  // must use a fully qualified URL for og:image
  const image = imageUrlBuilder(client)
    .image(blogPost.mainImage?.asset?.url)
    .url();

  const url = `https://blog.shopmythrift.store/blog/${slug}`;

  return {
    title: blogPost.title,
    description: blogPost.description,
    openGraph: {
      title: blogPost.title,
      description: blogPost.description,
      url,
      images: [
        {
          url: image,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blogPost.title,
      description: blogPost.description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = params;

  // Single blog query
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    description,
    body,
    mainImage{
      asset->{
        _id,
        url
      }
    },
      "authorName": author->name,
  "authorImage": author->image.asset->url,

    publishedAt,
    readTime,
    tag
  }`;

  // Query for the sidebar "Most Popular" blogs, excluding current slug
  const otherBlogsQuery = `*[_type == "post" && slug.current != $slug]{
    title,
    publishedAt,
    readTime,
    slug,
    mainImage {
      asset->{
        url
      }
    },
    tag,
    description
  } | order(publishedAt desc)[0...5]`;

  // Query for the bottom "More Blogs" section, excluding current slug
  const moreBlogsQuery = `*[_type == "post" && slug.current != $slug]{
    title,
    slug,
    mainImage {
      asset->{
        url
      }
    },
    publishedAt,
    readTime,
    tag,
    description
  } | order(publishedAt desc)[0...9]`;

  const blogPost = await client.fetch(query, { slug });
  const otherBlogs = await client.fetch(otherBlogsQuery, { slug });
  const moreBlogs = await client.fetch(moreBlogsQuery, { slug });

  // Handle the case where no matching post is found
  if (!blogPost) {
    return (
      <div className="px-8 md:py-20 sm:px-20 bg-customBg min-h-screen">
        <h1 className="text-4xl text-center mt-20">Post not found</h1>
      </div>
    );
  }

  return (
    <>
      <div className="px-4 md:px-12 sm:px md:py-32 py-32 bg-white min-h-screen">
        <div className="mb-12 flex md:flex-row flex-col items-center">
          {blogPost.mainImage?.asset && (
            <div className="relative md:w-[700px] w-full">
              <Image
                src={urlFor(blogPost.mainImage.asset).url()}
                alt={blogPost.title}
                width={1200}
                height={600}
                className="w-full md:h-[500px] h-[320px] object-cover rounded-lg"
              />
            </div>
          )}
          <div className="md:px-12 w-full mt-4 md:mt-0">
            <p className="text-sm text-gray-600 font-roboto">
              {new Date(blogPost.publishedAt)
                .toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
                .replace(/, /g, " ")}{" "}
              • {blogPost.readTime}
            </p>
           <div className="flex items-center mt-4">

            {blogPost.authorName && (
              <p className="text-sm text-gray-500 mr-3 font-roboto italic ">
                By{" "}
                <span className="font-medium text-customRichBrown">
                  {blogPost.authorName}
                </span>
              </p>
            )}
             <ShareButton
              title={blogPost.title}
              description={blogPost.description}
              url={
                typeof window === "undefined"
                  ? `https://blog.shopmythrift.store/blog/${slug}`
                  : window.location.href
              }
            />
           </div>
            <h1 className="md:text-5xl text-customOrange text-3xl font-semibold font-ubuntu mt-2 md:mt-4">
              {blogPost.title}
            </h1>
            <p className="text-gray-700 text-md font-opensans mt-2">
              {blogPost.description}
            </p>

           
            {/* ————————————— */}
          </div>
        </div>
        {/* Blog Body + Sidebar */}
        <div className="md:flex md:gap-24">
          {/* Main Blog Body */}
          <div className="prose md:w-[890px] w-full text-black">
            <PortableText
              value={blogPost.body}
              components={{
                // Custom rendering for images
                types: {
                  image: ({ value }) => {
                    if (!value?.asset) return null;
                    return (
                      <div className="my-6">
                        <Image
                          src={urlFor(value.asset).url()}
                          alt={value.alt || "Image"}
                          width={550}
                          height={500}
                          className="md:w-[890px] object-cover h-[280px] sm:w-[428px] rounded-xl md:h-[600px]"
                        />
                      </div>
                    );
                  },
                },
                // Custom rendering for marks (e.g., links)
                marks: {
                  link: ({ children, value }) => (
                    <a
                      href={value.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {children}
                    </a>
                  ),
                },
                // List serializers for bullet & numbered lists
                list: {
                  bullet: ({ children }) => (
                    <ul className="list-disc ml-6 mb-6">{children}</ul>
                  ),
                  number: ({ children }) => (
                    <ol className="list-decimal ml-6 mb-6">{children}</ol>
                  ),
                },
                listItem: {
                  bullet: ({ children }) => (
                    <li className="mb-2">{children}</li>
                  ),
                  number: ({ children }) => (
                    <li className="mb-2">{children}</li>
                  ),
                },
                // Optional: custom block styles (headings, blockquote, and paragraphs)
                block: {
                  normal: ({ children }) => (
                    <p className="mb-6 leading-relaxed">{children}</p>
                  ),
                  h1: ({ children }) => (
                    <h1 className="text-4xl font-bold text-black my-6">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-3xl font-semibold text-black my-4">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-2xl font-semibold text-black my-4">
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-xl font-semibold text-black my-4">
                      {children}
                    </h4>
                  ),
                  h5: ({ children }) => (
                    <h5 className="text-lg font-semibold text-black my-4">
                      {children}
                    </h5>
                  ),
                  h6: ({ children }) => (
                    <h6 className="text-xl font-semibold text-black my-4">
                      {children}
                    </h6>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="pl-4 border-l-4 border-gray-300 italic text-gray-600 my-4">
                      {children}
                    </blockquote>
                  ),
                },
              }}
            />
          </div>

          {/* Most Popular (Sticky Sidebar) */}
          {otherBlogs.length > 2 && (
            <div className="mt-16 bg-rose-50 md:block hidden p-6 md:w-[420px] py-12 h-full rounded-lg sticky top-24">
              <h2 className="text-2xl text-center font-ubuntu font-medium mb-6">
                Most Popular
              </h2>
              <div className="space-y-4">
                {otherBlogs.map((blog) => (
                  <div
                    key={blog.slug.current}
                    className="border-b border-pink-300 pb-4"
                  >
                    <p className="text-xs text-gray-600">
                      {new Date(blog.publishedAt).toLocaleDateString()} •{" "}
                      {blog.readTime}
                    </p>
                    <Link href={`/blog/${blog.slug.current}`}>
                      <h3 className="text-lg font-roboto font-medium text-gray-900">
                        {blog.title}
                      </h3>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* More Blogs Section */}
        {/* More Blogs Section */}
        {moreBlogs.length > 2 && (
          <section className="mt-24">
            <h2 className="text-3xl font-semibold font-ubuntu text-black mb-8 text-center">
              More Blogs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {moreBlogs.map((blog) => (
                <Link
                  key={blog.slug.current}
                  href={`/blog/${blog.slug.current}`}
                >
                  <div className="bg-transparent overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <div className="relative">
                      {blog.mainImage?.asset?.url && (
                        <Image
                          src={blog.mainImage.asset.url}
                          alt={blog.title}
                          width={400}
                          height={250}
                          className="w-full h-[280px] rounded-lg object-cover"
                        />
                      )}
                      {blog.tag && (
                        <span className="absolute top-4 left-4 bg-[rgba(0,0,0,0.4)] text-white text-sm px-4 py-1 rounded-full backdrop-blur-md shadow-lg">
                          {blog.tag}
                        </span>
                      )}
                    </div>
                    <div className="py-3">
                      <p className="text-sm text-gray-500 mb-2">
                        {new Date(blog.publishedAt).toLocaleDateString()} •{" "}
                        {blog.readTime}
                      </p>
                      <h3 className="text-2xl font-semibold font-ubuntu text-gray-900 mb-1">
                        {blog.title}
                      </h3>
                      {blog.description && (
                        <p className="text-sm text-gray-600 mt-2">
                          {blog.description.slice(0, 100)}...
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
