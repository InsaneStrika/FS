const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const mostLikedBlog = blogs.reduce((mostLiked, blog) => {
    return blog.likes > mostLiked.likes ? blog : mostLiked;
  }, blogs[0]);

  console.log('Most liked blog details:', mostLikedBlog.title, 'by', mostLikedBlog.author, 'with', mostLikedBlog.likes, 'likes');

  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes,
  };
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const blogCounts = {};

  blogs.forEach((blog) => {
    blogCounts[blog.author] = (blogCounts[blog.author] || 0) + 1;
  });

  const mostBlogsAuthor = Object.keys(blogCounts).reduce((mostBlogsAuthor, author) => {
    return blogCounts[author] > blogCounts[mostBlogsAuthor] ? author : mostBlogsAuthor;
  }, Object.keys(blogCounts)[0]);

  console.log('Author with most blogs:', mostBlogsAuthor, 'with', blogCounts[mostBlogsAuthor], 'blogs');

  return {
    author: mostBlogsAuthor,
    blogs: blogCounts[mostBlogsAuthor],
  };
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const likesCounts = {};

  blogs.forEach((blog) => {
    likesCounts[blog.author] = (likesCounts[blog.author] || 0) + blog.likes;
  });

  const mostLikesAuthor = Object.keys(likesCounts).reduce((mostLikesAuthor, author) => {
    return likesCounts[author] > likesCounts[mostLikesAuthor] ? author : mostLikesAuthor;
  }, Object.keys(likesCounts)[0]);

  console.log('Author with most likes:', mostLikesAuthor, 'with', likesCounts[mostLikesAuthor], 'likes');

  return {
    author: mostLikesAuthor,
    likes: likesCounts[mostLikesAuthor],
  };
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}