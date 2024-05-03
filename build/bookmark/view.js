import * as __WEBPACK_EXTERNAL_MODULE__wordpress_interactivity_8e89b257__ from "@wordpress/interactivity";
/******/ var __webpack_modules__ = ({

/***/ "@wordpress/interactivity":
/*!*******************************************!*\
  !*** external "@wordpress/interactivity" ***!
  \*******************************************/
/***/ ((module) => {

var x = (y) => {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = (x) => (() => (x))
module.exports = __WEBPACK_EXTERNAL_MODULE__wordpress_interactivity_8e89b257__;

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/bookmark/view.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/interactivity */ "@wordpress/interactivity");
/**
 * WordPress dependencies
 */

const {
  state
} = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)("vs-reading-list", {
  state: {
    allBookmarks: []
  },
  actions: {
    // Get all bookmarks from local storage or an empty array.
    setState: () => {
      let bookmarks = localStorage.getItem("vs-reading-list") || "[]";
      state.allBookmarks = JSON.parse(bookmarks);
    },
    // Toggle the bookmarked state.
    toggle: () => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();

      // Get the bookmark object from the context or the context itself.
      let bookmark = context.bookmark ? context.bookmark : context;

      // Get all bookmarks from local storage or an empty array.
      let allBookmarks = state.allBookmarks;

      // Toggle the bookmarked state.
      bookmark = {
        ...bookmark,
        isBookmarked: !bookmark.isBookmarked
      };

      // Add or remove from our array of bookmarks in state.
      if (bookmark.isBookmarked && !allBookmarks.some(bookmarkItem => bookmarkItem.postId === bookmark.postId)) {
        allBookmarks.push(bookmark);
      } else if (!bookmark.isBookmarked && allBookmarks.some(bookmarkItem => bookmarkItem.postId === bookmark.postId)) {
        allBookmarks = allBookmarks.filter(bookmarkItem => bookmarkItem.postId !== bookmark.postId);
      }

      // Save the updated array of bookmarks to local storage.
      localStorage.setItem("vs-reading-list", JSON.stringify(allBookmarks));
      state.allBookmarks = allBookmarks;
    }
  },
  callbacks: {
    // Runs when the reading list block is loaded.
    initReadingList: () => {
      (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)("vs-reading-list").actions.setState();
    },
    // Runs when a bookmark block is loaded.
    initBookmark: () => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)("vs-reading-list").actions.setState();

      // Check if the post is already bookmarked and toggle.
      if (context.postId && state.allBookmarks.some(bookmarkItem => bookmarkItem.postId === context.postId)) {
        context.isBookmarked = true;
      } else {
        context.isBookmarked = false;
      }
    },
    // Runs on individual bookmarks when the state changes.
    watch: () => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();

      // Check if the post is already bookmarked and toggle.
      if (context.postId && state.allBookmarks.some(bookmarkItem => bookmarkItem.postId === context.postId)) {
        context.isBookmarked = true;
      } else {
        context.isBookmarked = false;
      }
    }
  }
});
})();


//# sourceMappingURL=view.js.map