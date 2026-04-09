const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(process.cwd(), 'public', 'posts');
const externalPostsPath = path.join(process.cwd(), 'public', 'external-posts.json');

function sortPostsByDate(posts) {
  return posts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

function getLocalPostsData() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      content: matterResult.content,
      contentHtml: '',
      isExternal: false,
      ...(matterResult.data)
    };
  });
}

function getExternalPostsData() {
  if (!fs.existsSync(externalPostsPath)) {
    return [];
  }

  const fileContents = fs.readFileSync(externalPostsPath, 'utf8');
  const externalPosts = JSON.parse(fileContents);

  return externalPosts.map((post) => ({
    content: '',
    contentHtml: '',
    tags: [],
    isExternal: true,
    link_text: 'Read article',
    ...post
  }));
}

const posts = sortPostsByDate([
  ...getLocalPostsData(),
  ...getExternalPostsData()
]);
fs.writeFileSync('public/posts.json', JSON.stringify(posts, null, 2));
console.log('posts.json generated');
