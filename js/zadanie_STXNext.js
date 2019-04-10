$(() => {
    const apiUrl = "https://www.googleapis.com/books/v1/volumes";
    const form = $(".form");
    const input = $(".form-search");
    const bookList = $(".book_list");
    // const submit = form.find("button");

    form.on("submit", (event) => {
        event.preventDefault();
        const searchQuery = input.val();
        loadBookList(searchQuery);
    });

    const loadBookList = (searchQuery) => {
        $.ajax({
            url: apiUrl,
            method: "GET",
            dataType: "json",
            data: {
                q: searchQuery,
            }
        }).done((response) => {
            console.log(response);
            // bookList.empty();
            for (var i = 0; i < response.items.length; i++) {
                // var bookPicture = $("<img src=" + response.items[i].volumeInfo.imageLinks + "/>");
                var bookTitle = $("<li>" + response.items[i].volumeInfo.title + "</li>");
                var bookDescription = $("<p>" + response.items[i].volumeInfo.description + "</p>");

                // console.log(response.items[i].volumeInfo.title);
                console.log(bookTitle);
                // bookList.append(bookPicture);
                bookList.append(bookTitle);
                bookList.append(bookDescription);
            }
        }).fail((error) => {
            console.log(error);
        })
    };

});

// $(function () {
//     var apiUrl = "https://pixabay.com/api/";
//     var apiKey = "11792782-6296e248ec152f11c55ec463e";
//     var form = $(".form");
//     var input = $(".form-search");
//     var gallery = $(".gallery");
//     var submit = form.find("button");
//
//     form.on("submit", function (event) {
//         event.preventDefault();
//         submit.attr("disabled", true);
//         submit.addClass("loading");
//         var searchQuery = input.val();
//         loadImages(searchQuery);
//     });
//
//
//     function loadImages(searchQuery) {
//         $.ajax({
//             url: apiUrl,
//             method: "GET",
//             data: {
//                 q: searchQuery,
//                 key: apiKey //do repozytorium jak wrzuce to usunac klucz i napisac zeby swoj ktos wstawil//
//             }
//         }).done(function (response) {
//             console.log(response);
//             gallery.empty();
//             gallery.addClass("loading");
//             for (var i = 0; i < response.hits.length; i++) {
//                 var link = $("<a href=" + response.hits[i].largeImageURL + "></a>");
//                 link.attr("data-fancybox", "gallery");
//                 var picture = $("<img src=" + response.hits[i].largeImageURL + "/>");
//                 link.append(picture);
//                 picture.css({
//                     "height": "150px",
//                     "width": "150px",
//                     "margin": "3px",
//                 });
//                 gallery.append(link);
//                 submit.attr("disabled", false);
//                 submit.removeClass("loading");
//                 gallery.removeClass("loading");
//             }
//         }).fail(function (error) {
//             console.log(error);
//         })
//     }
// });
