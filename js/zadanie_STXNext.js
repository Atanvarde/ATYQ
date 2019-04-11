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
        let src;
        if (volumeInfo.imageLinks !== undefined) {
            src = volumeInfo.imageLinks.thumbnail;
        } else {
            src = 'http://placehold.it/128x198';
        }
        return src;
    }

    const extractDescription = (volumeInfo,searchInfo) => {
        let description;
        if (volumeInfo.description !== undefined) {
            description = volumeInfo.description;
        } else if (searchInfo !== undefined) {
            description = searchInfo.textSnippet;
        } else {
            description = "Unfortunately, there's no more information for you";
        }
        return description;
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

                for (let i = 0; i < data.items.length; i++) {

                    const item = data.items[i];
                    const volumeInfo = item.volumeInfo;
                    const searchInfo = item.searchInfo;

                    const imgSrc = extractImage(volumeInfo);
                    const description = extractDescription(volumeInfo,searchInfo);

                    const maxLength = 200;
                    const trimmedDescription = description.substr(0,maxLength);
                    console.log(trimmedDescription);
                    const bookCover = $("<img src=" + imgSrc + "/>");
                    const bookTitle = $("<li>" + (i + 1) + "." + " " + volumeInfo.title + "</li>");
                    const bookDescription = $("<p>" + trimmedDescription.substr(0, Math.min(trimmedDescription.length, trimmedDescription.lastIndexOf(" "))) + "..." + "</p>");
                    const bookListItem = $("<div>" + "</div>");

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
