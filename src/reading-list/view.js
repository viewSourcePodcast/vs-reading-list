/**
 * WordPress dependencies
 */
import { store, getContext } from "@wordpress/interactivity";

const { state } = store("vs-reading-list", {
  state: {
    allBookmarks: [],
  },
  callbacks: {
    initReadingList: () => {
      // Get all bookmarks from local storage or an empty array.
      let bookmarks = localStorage.getItem("vs-reading-list") || "[]";
      state.allBookmarks = JSON.parse(bookmarks);

      console.log("initReadingList", state.allBookmarks);
    },
  },
});
