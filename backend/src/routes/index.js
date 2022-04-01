import { addComment } from "./addComment.js";
import { articleInfo } from "./articleInfo.js";
import { initialize } from "./initialize.js";
import { upvote } from "./upvote.js";
import { upvotes } from "./upvotes.js";

export const routes = [
  initialize,
  upvote,
  upvotes,
  addComment,
  articleInfo
]