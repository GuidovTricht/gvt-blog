export async function getFeed({ feed }: { feed: Object }): Promise<Object> {
  console.log(feed.constructor.name);

  // eslint-disable-next-line no-param-reassign
  //   feed.options = {
  //     title: 'My blog',
  //     link: 'https://blog.guidovtricht.nl/feed.xml',
  //     description: 'This is my personal feed!',
  //     id: '',
  //   };
  return feed;
}

export function emptyFunxtion(): string {
  console.log('Empty function called');
  return '';
}
