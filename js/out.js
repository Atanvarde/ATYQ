/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/zadanie_STXNext.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/zadanie_STXNext.js":
/*!*******************************!*\
  !*** ./js/zadanie_STXNext.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n$(function () {\n    var apiUrl = \"https://www.googleapis.com/books/v1/volumes\";\n    var form = $(\".form\");\n    var input = $(\".form-search\");\n    var bookList = $(\".book_list\");\n    var currentIndex = 0;\n    var maxBookResults = 5;\n\n    form.on(\"submit\", function (event) {\n        event.preventDefault();\n        var searchQuery = input.val();\n        bookList.empty();\n        currentIndex = 0;\n        loadBookList(searchQuery);\n    });\n\n    var extractImage = function extractImage(volumeInfo) {\n        var src = void 0;\n        if (volumeInfo.imageLinks !== undefined) {\n            src = volumeInfo.imageLinks.thumbnail;\n        } else {\n            src = 'http://placehold.it/128x198';\n        }\n        return src;\n    };\n\n    var extractDescription = function extractDescription(volumeInfo, searchInfo) {\n        var description = void 0;\n        if (volumeInfo.description !== undefined) {\n            description = volumeInfo.description;\n        } else if (searchInfo !== undefined) {\n            description = searchInfo.textSnippet.replace(\"<br>\", \"\");\n        } else {\n            description = \"Niestety, nie ma informacji na ten temat.\";\n        }\n        return description;\n    };\n\n    var trimDescription = function trimDescription(description) {\n        var maxLength = 200;\n        if (description.length > maxLength) {\n            var trimmedDescription = description.substr(0, maxLength);\n            description = trimmedDescription.substr(0, trimmedDescription.lastIndexOf(\" \")) + \"...\";\n        }\n        return description;\n    };\n\n    var loadBookList = function loadBookList(searchQuery) {\n        $.ajax({\n            url: apiUrl,\n            method: \"GET\",\n            dataType: \"json\",\n            data: {\n                q: \"intitle:\" + searchQuery,\n                startIndex: currentIndex,\n                maxResults: maxBookResults\n            }\n        }).done(function (data) {\n            console.log(data);\n\n            if (data.totalItems > 0) {\n\n                for (var i = 0; i < data.items.length; i++) {\n\n                    var item = data.items[i];\n                    var volumeInfo = item.volumeInfo;\n                    var searchInfo = item.searchInfo;\n\n                    var imgSrc = extractImage(volumeInfo);\n                    var description = extractDescription(volumeInfo, searchInfo);\n                    var shortDescription = trimDescription(description);\n\n                    var bookListItem = $(\"<div>\" + \"</div>\");\n                    var bookCover = $(\"<img src=\" + imgSrc + \"/>\");\n                    var bookTitle = $(\"<li>\" + (i + currentIndex + 1) + \".\" + \" \" + volumeInfo.title + \"</li>\"); // dlaczego  i= 1 ?\n                    var bookDescription = $(\"<p>\" + shortDescription + \"</p>\");\n\n                    bookCover.addClass(\"bookcover_img\");\n                    bookListItem.addClass(\"bookListItem_ctn\");\n                    bookDescription.addClass(\"book_description\");\n                    bookList.append(bookListItem);\n                    bookListItem.append(bookTitle);\n                    bookListItem.append(bookCover);\n                    bookListItem.append(bookDescription);\n                }\n            } else {\n                var informationCtn = $(\"<div class='icon_ctn'>\" + \"</div>\");\n                var information = $(\"<p class='no_results_info'>\" + \"NIESTETY, NIE ZNALEZIONO TAKIEJ KSIĄŻKI.\" + \"</p>\");\n                var icon = $(\"<i class='fas fa-search'>\" + \"</i>\");\n                bookList.append(informationCtn);\n                informationCtn.append(information);\n                informationCtn.append(icon);\n            }\n        }).fail(function (error) {\n            console.log(error);\n        });\n    };\n\n    $(window).scroll(function () {\n        if ($(window).scrollTop() >= $(document).height() - $(window).height()) {\n            var searchQuery = input.val();\n            currentIndex = currentIndex + maxBookResults;\n            loadBookList(searchQuery);\n        }\n    });\n});\n\n//# sourceURL=webpack:///./js/zadanie_STXNext.js?");

/***/ })

/******/ });