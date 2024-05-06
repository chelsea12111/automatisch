// new-comment.js
export default function newComment() {
  // implementation here
}

// new-page.js
export default function newPage() {
  // implementation here
}

// new-post.js
export default function newPost() {
  // implementation here
}

// index.js
import newComment from './new-comment.js';
import newPage from './new-page.js';
import newPost from './new-post.js';

export default [newComment, newPage, newPost];

