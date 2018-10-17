(function() {
    var mockSearchResponse = [
        {
            "authors":[
                "Li Haoyu","Li Haoyu","Li Haoyu"
            ],
            "link":"https://s1.ticketm.net/dam/a/1dd/d5e86d93-5e1a-49d9-b530-70fefc0f21dd_711081_ARTIST_PAGE_3_2.jpg",
            "pages":"525",
            "conference":"2013 IEEE",
            "time":"2014",
            "title":"aaa",
        },
        {
            "authors":[
                "Li Haoyu","Li Haoyu","Li Haoyu"
            ],
            "link":"https://s1.ticketm.net/dam/a/1dd/d5e86d93-5e1a-49d9-b530-70fefc0f21dd_711081_ARTIST_PAGE_3_2.jpg",
            "pages":"525",
            "conference":"G5vYZ4aioMDSp",
            "time":"2018",
            "title":"bbb",
        },
        {
            "authors":[
                "Li Haoyu","Li Haoyu","Li Haoyu"
            ],
            "link":"https://s1.ticketm.net/dam/a/1dd/d5e86d93-5e1a-49d9-b530-70fefc0f21dd_711081_ARTIST_PAGE_3_2.jpg",
            "pages":"525",
            "conference":"G5vYZ4aioMDSp",
            "time":"2018",
            "title":"ccc",
        },
        {
            "authors":[
                "Li Haoyu","Li Haoyu","Li Haoyu"
            ],
            "link":"https://s1.ticketm.net/dam/a/1dd/d5e86d93-5e1a-49d9-b530-70fefc0f21dd_711081_ARTIST_PAGE_3_2.jpg",
            "pages":"525",
            "conference":"G5vYZ4aioMDSp",
            "time":"2018",
            "title":"ddd",
        },
        {
            "authors":[
                "Li Haoyu","Li Haoyu","Li Haoyu"
            ],
            "link":"https://s1.ticketm.net/dam/a/1dd/d5e86d93-5e1a-49d9-b530-70fefc0f21dd_711081_ARTIST_PAGE_3_2.jpg",
            "pages":"525",
            "conference":"G5vYZ4aioMDSp",
            "time":"2018",
            "title":"eee",
        }
    ];


    /**
     * Initialize
     */
    function init() {
        // Register event listeners
        $('search-btn').addEventListener('click', searchbyItems);
//         searchbyItems();
    }

    function searchbyItems() {
        activeBtn('search-btn');
        var pdfItems = mockSearchResponse;
        listItems(pdfItems);
    }



    function activeBtn(btnId) {
        var btn = $(btnId);
        btn.className += ' active';
    }



    function $(tag, options) {
        if (!options) {
            return document.getElementById(tag);
        }

        var element = document.createElement(tag);

        for (var option in options) {
            if (options.hasOwnProperty(option)) {
                element[option] = options[option];
            }
        }

        return element;
    }

//     function hideElement(element) {
//         element.style.display = 'none';
//     }

//     function showElement(element, style) {
//         var displayStyle = style ? style : 'block';
//         element.style.display = displayStyle;
//     }

    // -------------------------------------
    // Create item list
    // -------------------------------------

    /**
     * List items
     *
     * @param items -
     *            An array of item JSON objects
     */
    function listItems(items) {
        // Clear the current results
        var itemList = $('item-list');
        itemList.innerHTML = '';

        for (var i = 0; i < items.length; i++) {
            addItem(itemList, items[i]);
        }
    }

    /**
     * Add item to the list
     *
     * @param itemList -
     *            The
     *            <ul id="item-list">
     *            tag
     * @param item -
     *            The item data (JSON object)
     */
    function addItem(itemList, item) {
//         var item_id = item.item_id;
        if (confirm(item) === true){
            // create the <li> tag and specify the id and class attributes
            var li = $('li', {
//             id: 'item-' + item_id,
                className: 'item'
            });

            var div = $('div', {
                className: 'item-div'
            });


            var title = $('a', {
                href: item.link,
                target: '_blank',
                className: 'item-name'
            });
            title.innerHTML ='Title: ' + item.title;
            div.appendChild(title);

            var authors = $('p', {
                className: 'item-authors'
            });
            authors.innerHTML = 'Authors: ' + item.authors.join(', ');
            div.appendChild(authors);

            var pages = $('p', {
                className: 'item-pages'
            });

            pages.innerHTML = 'Pages: ' + item.pages;
            div.appendChild(pages);

            var conference = $('p', {
                className: 'item-conference'
            });

            conference.innerHTML ='Conference: ' + item.conference;
            div.appendChild(conference);

            var time = $('p', {
                className: 'item-time'
            });

            time.innerHTML ='Time: '  + item.time;
            div.appendChild(time);

            li.appendChild(div);


            itemList.appendChild(li);
        }
    }

    function confirm(item) {
        // Clear the current results
        var searchcontent = $('searchtext');
//         console.log(searchcontent.value);
//         console.log(item.title);
        if(searchcontent.value == item.title)
        {
            return true;
        }
        return false;
    }


    init();

})();





