/**
 * WordPress dependencies
 */
import { store, getContext } from "@wordpress/interactivity";

const { state } = store("vs-reading-list", {
  state: {
    allBookmarks: [],
  },
  actions: {
    toggle: () => {
      const context = getContext();
      context.isBookmarked = !context.isBookmarked;

      // Get all bookmarks from local storage or an empty array.
      let allBookmarks = localStorage.getItem("vs-reading-list") || "[]";
      allBookmarks = JSON.parse(allBookmarks);

      // Add or remove from our array of bookmarks.
      if (context.isBookmarked && !allBookmarks.includes(context.postId)) {
        allBookmarks.push(context.postId);
      } else if (
        !context.isBookmarked &&
        allBookmarks.includes(context.postId)
      ) {
        const index = allBookmarks.indexOf(context.postId);
        allBookmarks.splice(index, 1);
      }

      // Save the updated array of bookmarks to local storage.
      localStorage.setItem("vs-reading-list", JSON.stringify(allBookmarks));
      state.allBookmarks = allBookmarks;
    },
  },
  callbacks: {
    logIsBookmarked: () => {
      const { isBookmarked, postId, allBookmarks } = getContext();
      // Log the value of `isBookmarked` each time it changes.
      console.log(`${postId} is bookmarked: ${isBookmarked}`);
    },
    init: () => {
      const context = getContext();

      // Get all bookmarks from local storage or an empty array.
      let bookmarks = localStorage.getItem("vs-reading-list") || "[]";
      state.allBookmarks = JSON.parse(bookmarks);

      console.log("init", state.allBookmarks);

      // Check if the post is already bookmarked and toggle.
      if (context.postId && state.allBookmarks.includes(context.postId)) {
        store("vs-reading-list").actions.toggle();
      }
    },
    initReadingList: () => {
      const context = getContext();

      // Get all bookmarks from local storage or an empty array.
      let bookmarks = localStorage.getItem("vs-reading-list") || "[]";
      state.allBookmarks = JSON.parse(bookmarks);

      console.log("init", state.allBookmarks);
    },
  },
});
