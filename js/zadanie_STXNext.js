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

    const extractImage = (volumeInfo) => {
        var src;
        if (volumeInfo.imageLinks !== undefined) {
            src = volumeInfo.imageLinks.thumbnail;
        } else {
            src = 'http://placehold.it/128x198';
        }
        return src;
    }

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

                    let volumeInfo = data.items[i].volumeInfo;

                    var descCheck = volumeInfo.description;
                    var snippetCheck = data.items[i].searchInfo;
                    var description;

                    var imgSrc = extractImage(volumeInfo);

                    if (descCheck !== undefined) {
                        description = descCheck;
                    } else if (snippetCheck !== undefined) {
                        description = snippetCheck.textSnippet;
                    } else {
                        description = "Unfortunately, there's no more information for you";
                    }

                    var maxLength = 200;
                    var trimmedDescription = description.substr(0,maxLength);
                    console.log(trimmedDescription);
                    var bookCover = $("<img src=" + imgSrc + "/>");
                    var bookTitle = $("<li>" + (i + 1) + "." + " " + volumeInfo.title + "</li>");
                    var bookDescription = $("<p>" + trimmedDescription.substr(0, Math.min(trimmedDescription.length, trimmedDescription.lastIndexOf(" "))) + "..." + "</p>");
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
