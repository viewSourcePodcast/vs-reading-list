/**
 * WordPress dependencies
 */
import { store, getContext } from "@wordpress/interactivity";

store("vs-reading-list", {
  actions: {
    toggle: () => {
      const context = getContext();
      context.isBookmarked = !context.isBookmarked;

      // Get all bookmarks from local storage or an empty array.
      let allBookmarks = localStorage.getItem("vs-reading-list") || "[]";
      allBookmarks = JSON.parse(allBookmarks);

      // Add or remove from our array of bookmarks.
      if (context.isBookmarked) {
        allBookmarks.push(context.postId);
      } else {
        const index = allBookmarks.indexOf(context.postId);
        allBookmarks.splice(index, 1);
      }

      // Save the updated array of bookmarks to local storage.
      localStorage.setItem("vs-reading-list", JSON.stringify(allBookmarks));
    },
  },
  callbacks: {
    logIsBookmarked: () => {
      const { isBookmarked, postId } = getContext();
      // Log the value of `isBookmarked` each time it changes.
      console.log(`${postId} is bookmarked: ${isBookmarked}`);
    },
    init: () => {
      const { postId } = getContext();

      // Get all bookmarks from local storage or an empty array.
      let allBookmarks = localStorage.getItem("vs-reading-list") || "[]";
      allBookmarks = JSON.parse(allBookmarks);

      // Check if the post is already bookmarked and toggle.
      if (allBookmarks.includes(postId)) {
        store("vs-reading-list").actions.toggle();
      }
    },
  },
});
