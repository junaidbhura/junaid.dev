import { getAllPosts } from '@/lib/posts';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://junaid.dev';
  
  // Get all posts
  const posts = getAllPosts();
  
  // Create sitemap entries
  const sitemap: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...posts.map((post) => ({
      url: `${baseUrl}/${post.id}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];

  return sitemap;
} 