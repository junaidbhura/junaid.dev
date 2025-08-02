import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import * as fs from 'fs';
import * as path from 'path';
// Use require for gray-matter since it doesn't have proper TypeScript types
const matter = require('gray-matter');

// Helper function to format date as "Month Day, Year"
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

// Define types for post data
export interface PostData {
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  [key: string]: string | string[] | Date | unknown;
}

// Define types for gray-matter result
interface MatterResult {
  data: {
    [key: string]: string | string[] | Date | unknown;
  };
  content: string;
}

// Define type for processed content from remark
interface ProcessedContent {
  toString: () => string;
}

// Helper function to normalize post data from matter result
function normalizePostData(matterResult: MatterResult): Partial<PostData> {
  const normalizedData: Partial<PostData> = {};
  Object.keys(matterResult.data).forEach(key => {
    const value = matterResult.data[key];
    const lowerKey = key.toLowerCase();

    // Special handling for tags - convert comma-separated string to array
    if (lowerKey === 'tags' && typeof value === 'string') {
      normalizedData[lowerKey as keyof PostData] = value.split(',').map(tag => tag.trim()) as any;
    } else {
      // Convert Date objects to strings to avoid React rendering issues
      normalizedData[lowerKey as keyof PostData] = value instanceof Date ? value.toISOString() : value as any;
    }
  });

  return normalizedData;
}

export const postsDirectory = path.join(process.cwd(), 'posts');

export function getAllPosts(): (PostData & { id: string })[] {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => {
            // Remove ".md" from file name to get id
            const id = fileName.replace(/\.md$/, '');

            // Read markdown file as string
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            // Use gray-matter to parse the post metadata section
            const matterResult = matter(fileContents) as MatterResult;

            // Normalize the post data using the helper function
            const normalizedData = normalizePostData(matterResult);

            return {
                id,
                ...normalizedData as PostData,
            };
        });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export async function getPostData(id: string): Promise<PostData & { id: string; contentHtml: string }> {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents) as MatterResult;

    // Use remark to convert markdown into HTML string with syntax highlighting
    const processedContent = await remark()
        .use(remarkRehype)
        .use(rehypeHighlight, { ignoreMissing: true }) // Add syntax highlighting
        .use(rehypeStringify)
        .process(matterResult.content) as ProcessedContent;
    const contentHtml = processedContent.toString();

    // Normalize the post data using the helper function
    const normalizedData = normalizePostData(matterResult);

    return {
        id,
        contentHtml,
        ...normalizedData as PostData,
    };
}
