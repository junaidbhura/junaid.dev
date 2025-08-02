import { getAllPosts, formatDate } from '@/lib/posts';

export default function Home() {
  const posts = getAllPosts();

  return (
      <main className="main home">
        <h1 className="page-title">Latest Updates:</h1>
        <hr/>
        {posts.map((post) => (
          <article key={post.id}>
            {Array.isArray(post.tags) && (
              <div className="tags">
                {post.tags.map(tag => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            )}
            <time>{formatDate(post.date)}</time>
            <h2>
              <a href={`/${post.id}`}>{post.title}</a>
            </h2>
            <p>{post.excerpt}</p>
            <p><a href={`/${post.id}`}>Continue reading &raquo;</a></p>
          </article>
        ))}
      </main>
  );
}
