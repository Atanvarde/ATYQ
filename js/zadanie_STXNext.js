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
        }).done((data) => {
            if (data.totalItems > 0) {
                console.log(data);
                bookList.empty();

                for (var i = 0; i < data.items.length; i++) {

                    var imgCheck = data.items[i].volumeInfo.imageLinks;
                    var descCheck = data.items[i].volumeInfo.description;
                    var snippetCheck = data.items[i].searchInfo;
                    var imgSrc, description;

                    if (imgCheck !== undefined) {
                        imgSrc = data.items[i].volumeInfo.imageLinks.thumbnail;
                    } else {
                        imgSrc = 'http://placehold.it/128x198';
                    }

                    if (descCheck !== undefined) {
                        description = descCheck;
                    } else if (snippetCheck !== undefined) {
                        description = snippetCheck.textSnippet;
                    } else {
                        description = 'Unfortunately, there\'s no more information for you';
                    }

                    var bookCover = $("<img src=" + imgSrc + "/>");
                    var bookTitle = $("<li>" + (i + 1) + "." + " " + data.items[i].volumeInfo.title + "</li>");
                    var bookDescription = $("<p>" + description + "</p>");
                    var bookListItem = $("<div>" + "</div>");

                    bookCover.addClass("bookcover_img");
                    bookListItem.addClass("bookListItem_ctn");
                    bookDescription.addClass("book_description");
                    bookList.append(bookListItem);
                    bookListItem.append(bookTitle);
                    bookListItem.append(bookCover);
                    bookListItem.append(bookDescription);
                }
            }
        }).fail((error) => {
            console.log(error);
        })
    };

});
