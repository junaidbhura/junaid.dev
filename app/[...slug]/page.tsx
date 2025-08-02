import { getAllPosts, getPostData, formatDate } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: [post.id],
  }));
}

// Generate metadata for each post
export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const postId = params.slug[0];

  try {
    const postData = await getPostData(postId);
    
    return {
      title: `${postData.title} - Junaid Bhura`,
      description: postData.excerpt,
    };
  } catch (error) {
    return {
      title: 'Post Not Found - Junaid Bhura',
    };
  }
}

export default async function Post({ params }: { params: { slug: string[] } }) {
  // Get the post ID from the slug
  const postId = params.slug[0];

  try {
    // Fetch the post data
    const postData = await getPostData(postId);

    return (
      <main className="main">
        <article>
          {Array.isArray(postData.tags) && (
            <div className="tags">
              {postData.tags.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}
          <time>{formatDate(postData.date)}</time>
          <h1>{postData.title}</h1>
          <hr/>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </main>
    );
  } catch (error) {
    // Handle case where post doesn't exist
    notFound();
  }
}
