/**
 * WordPress dependencies
 */
import { store, getContext } from "@wordpress/interactivity";

const { state } = store("vs-reading-list", {
  state: {
    allBookmarks: [],
  },
  actions: {
    // Get all bookmarks from local storage or an empty array.
    setState: () => {
      let bookmarks = localStorage.getItem("vs-reading-list") || "[]";
      state.allBookmarks = JSON.parse(bookmarks);
    },

    // Toggle the bookmarked state.
    toggle: () => {
      const context = getContext();

      // Get the bookmark object from the context or the context itself.
      let bookmark = context.bookmark ? context.bookmark : context;

      // Get all bookmarks from local storage or an empty array.
      let allBookmarks = state.allBookmarks;

      // Toggle the bookmarked state.
      bookmark = {
        ...bookmark,
        isBookmarked: !bookmark.isBookmarked,
      };

      // Add or remove from our array of bookmarks in state.
      if (
        bookmark.isBookmarked &&
        !allBookmarks.some(
          (bookmarkItem) => bookmarkItem.postId === bookmark.postId
        )
      ) {
        allBookmarks.push(bookmark);
      } else if (
        !bookmark.isBookmarked &&
        allBookmarks.some(
          (bookmarkItem) => bookmarkItem.postId === bookmark.postId
        )
      ) {
        allBookmarks = allBookmarks.filter(
          (bookmarkItem) => bookmarkItem.postId !== bookmark.postId
        );
      }

      // Save the updated array of bookmarks to local storage.
      localStorage.setItem("vs-reading-list", JSON.stringify(allBookmarks));
      state.allBookmarks = allBookmarks;
    },
  },
  callbacks: {
    // Runs when the reading list block is loaded.
    initReadingList: () => {
      store("vs-reading-list").actions.setState();
    },

    // Runs when a bookmark block is loaded.
    initBookmark: () => {
      const context = getContext();

      store("vs-reading-list").actions.setState();

      // Check if the post is already bookmarked and toggle.
      if (
        context.postId &&
        state.allBookmarks.some(
          (bookmarkItem) => bookmarkItem.postId === context.postId
        )
      ) {
        context.isBookmarked = true;
      } else {
        context.isBookmarked = false;
      }
    },

    // Runs on individual bookmarks when the state changes.
    watch: () => {
      const context = getContext();

      // Check if the post is already bookmarked and toggle.
      if (
        context.postId &&
        state.allBookmarks.some(
          (bookmarkItem) => bookmarkItem.postId === context.postId
        )
      ) {
        context.isBookmarked = true;
      } else {
        context.isBookmarked = false;
      }
    },
  },
});
