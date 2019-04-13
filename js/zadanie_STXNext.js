$(() => {
    const apiUrl = "https://www.googleapis.com/books/v1/volumes";
    const form = $(".form");
    const input = $(".form-search");
    const bookList = $(".book_list");
    let currentIndex = 0;
    const maxBookResults = 5;

    form.on("submit", (event) => {
        event.preventDefault();
        const searchQuery = input.val();
        bookList.empty();
        currentIndex = 0;
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

    const extractDescription = (volumeInfo, searchInfo) => {
        let description;
        if (volumeInfo.description !== undefined) {
            description = volumeInfo.description;
        } else if (searchInfo !== undefined) {
            description = searchInfo.textSnippet.replace("<br>", "");
        } else {
            description = "Niestety, nie ma informacji na ten temat.";
        }
        return description;
    }

    const trimDescription = (description) => {
        const maxLength = 200;
        if (description.length > maxLength) {
            const trimmedDescription = description.substr(0, maxLength);
            description = trimmedDescription.substr(0, trimmedDescription.lastIndexOf(" ")) + "...";
        }
        return description;
    }


    const loadBookList = (searchQuery) => {
        $.ajax({
            url: apiUrl,
            method: "GET",
            dataType: "json",
            data: {
                q: "intitle:" + searchQuery,
                startIndex: currentIndex,
                maxResults: maxBookResults
            }
        }).done((data) => {
            console.log(data);

            if (data.totalItems > 0) {

                for (let i = 0; i < data.items.length; i++) {

                    const item = data.items[i];
                    const volumeInfo = item.volumeInfo;
                    const searchInfo = item.searchInfo;

                    const imgSrc = extractImage(volumeInfo);
                    const description = extractDescription(volumeInfo, searchInfo);
                    const shortDescription = trimDescription(description);

                    const bookListItem = $("<div>" + "</div>");
                    const bookCover = $("<img src=" + imgSrc + "/>");
                    const bookTitle = $("<li>" + (i + currentIndex + 1) + "." + " " + volumeInfo.title + "</li>"); // dlaczego  i= 1 ?
                    const bookDescription = $("<p>" + shortDescription + "</p>");

                    bookCover.addClass("bookcover_img");
                    bookListItem.addClass("bookListItem_ctn");
                    bookDescription.addClass("book_description");
                    bookList.append(bookListItem);
                    bookListItem.append(bookTitle);
                    bookListItem.append(bookCover);
                    bookListItem.append(bookDescription);
                }
            } else {
                const informationCtn = $("<div class='icon_ctn'>" + "</div>");
                const information = $("<p class='no_results_info'>" + "NIESTETY, NIE ZNALEZIONO TAKIEJ KSIĄŻKI." + "</p>");
                const icon = $("<i class='fas fa-search'>" + "</i>");
                bookList.append(informationCtn);
                informationCtn.append(information);
                informationCtn.append(icon);
            }
        }).fail((error) => {
            console.log(error);
        })
    };

    $(window).scroll(function () {
        if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
            const searchQuery = input.val();
            currentIndex = currentIndex + maxBookResults;
            loadBookList(searchQuery);
        }
    });

});
