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
eval("\n\n$(function () {\n    var apiUrl = \"https://www.googleapis.com/books/v1/volumes\";\n    var form = $(\".form\");\n    var input = $(\".form-search\");\n    var bookList = $(\".book_list\");\n    // const submit = form.find(\"button\");\n\n    form.on(\"submit\", function (event) {\n        event.preventDefault();\n        var searchQuery = input.val();\n        loadBookList(searchQuery);\n    });\n\n    var loadBookList = function loadBookList(searchQuery) {\n        $.ajax({\n            url: apiUrl,\n            method: \"GET\",\n            dataType: \"json\",\n            data: {\n                q: searchQuery\n            }\n        }).done(function (data) {\n            if (data.totalItems > 0) {\n                console.log(data);\n                // bookList.empty();\n\n                for (var i = 0; i < data.items.length; i++) {\n\n                    var imgCheck = data.items[i].volumeInfo.imageLinks;\n                    var descCheck = data.items[i].volumeInfo.description;\n                    var snippetCheck = data.items[i].searchInfo;\n                    var imgSrc, description;\n\n                    if (imgCheck !== undefined) {\n                        imgSrc = data.items[i].volumeInfo.imageLinks.thumbnail;\n                    } else {\n                        imgSrc = 'http://placehold.it/128x198';\n                    }\n\n                    if (descCheck !== undefined) {\n                        description = descCheck;\n                    } else if (snippetCheck !== undefined) {\n                        description = snippetCheck.textSnippet;\n                    } else {\n                        description = 'Unfortunately, there\\'s no more information for you';\n                    }\n\n                    var bookCover = $(\"<img src=\" + imgSrc + \"/>\");\n                    var bookTitle = $(\"<li>\" + (i + 1) + \".\" + \" \" + data.items[i].volumeInfo.title + \"</li>\");\n                    var bookDescription = $(\"<p>\" + description + \"</p>\");\n                    var bookListItem = $(\"<div>\" + \"</div>\");\n\n                    bookCover.addClass(\"bookcover_img\");\n                    bookListItem.addClass(\"bookListItem_ctn\");\n                    bookDescription.addClass(\"book_description\");\n                    bookList.append(bookListItem);\n                    bookListItem.append(bookTitle);\n                    bookListItem.append(bookCover);\n                    bookListItem.append(bookDescription);\n                }\n            }\n        }).fail(function (error) {\n            console.log(error);\n        });\n    };\n});\n\n// $(function () {\n//     var apiUrl = \"https://pixabay.com/api/\";\n//     var apiKey = \"11792782-6296e248ec152f11c55ec463e\";\n//     var form = $(\".form\");\n//     var input = $(\".form-search\");\n//     var gallery = $(\".gallery\");\n//     var submit = form.find(\"button\");\n//\n//     form.on(\"submit\", function (event) {\n//         event.preventDefault();\n//         submit.attr(\"disabled\", true);\n//         submit.addClass(\"loading\");\n//         var searchQuery = input.val();\n//         loadImages(searchQuery);\n//     });\n//\n//\n//     function loadImages(searchQuery) {\n//         $.ajax({\n//             url: apiUrl,\n//             method: \"GET\",\n//             data: {\n//                 q: searchQuery,\n//                 key: apiKey //do repozytorium jak wrzuce to usunac klucz i napisac zeby swoj ktos wstawil//\n//             }\n//         }).done(function (response) {\n//             console.log(response);\n//             gallery.empty();\n//             gallery.addClass(\"loading\");\n//             for (var i = 0; i < response.hits.length; i++) {\n//                 var link = $(\"<a href=\" + response.hits[i].largeImageURL + \"></a>\");\n//                 link.attr(\"data-fancybox\", \"gallery\");\n//                 var picture = $(\"<img src=\" + response.hits[i].largeImageURL + \"/>\");\n//                 link.append(picture);\n//                 picture.css({\n//                     \"height\": \"150px\",\n//                     \"width\": \"150px\",\n//                     \"margin\": \"3px\",\n//                 });\n//                 gallery.append(link);\n//                 submit.attr(\"disabled\", false);\n//                 submit.removeClass(\"loading\");\n//                 gallery.removeClass(\"loading\");\n//             }\n//         }).fail(function (error) {\n//             console.log(error);\n//         })\n//     }\n// });\n\n//# sourceURL=webpack:///./js/zadanie_STXNext.js?");

/***/ })

/******/ });