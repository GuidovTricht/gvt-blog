import glob from 'glob';
import fs from 'fs';
import path from 'path';
import { createExcerpt } from '../utils';

export function getFeedPosts(): {
  title: string;
  publishedAt: string;
  excerpt: string;
  newTitle: string;
  url: string;
  content: string;
}[] {
  const globSearchResults = glob.sync('*.json', { cwd: 'app/content/blog' });
  const posts: {
    title: string;
    publishedAt: string;
    excerpt: string;
    newTitle: string;
    url: string;
    content: string;
  }[] = [];

  globSearchResults.forEach((file: any) => {
    const data = fs.readFileSync(path.resolve('app/content/blog', file), { encoding: 'utf-8' });
    const jsonObject = JSON.parse(data);
    jsonObject.excerpt = createExcerpt({ text: jsonObject.content });
    jsonObject.newTitle = jsonObject.title;
    jsonObject.url = `https://guidovtricht.nl/blog/${path.parse(file).name}`;
    posts.push(jsonObject);
  });
  return posts.sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export function emptyFunxtion(): string {
  console.log('Empty function called');
  return '';
}
