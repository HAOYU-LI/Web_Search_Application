(function() {
  // var mockSearchResponse = [
	//        {
  //             "authors":[
	// 	         "Li Haoyu","Li Haoyu","Li Haoyu"
	// 	      ],
  //             "link":"https://s1.ticketm.net/dam/a/1dd/d5e86d93-5e1a-49d9-b530-70fefc0f21dd_711081_ARTIST_PAGE_3_2.jpg",
	// 	      "pages":"525",
	// 	      "conference":"2013 IEEE",
	// 	      "time":"2014",
	// 	      "title":"aaa",
	// 	   },
	// 	   {
	// 	     "authors":[
	// 	         "Li Haoyu","Li Haoyu","Li Haoyu"
	// 	      ],
  //             "link":"https://s1.ticketm.net/dam/a/1dd/d5e86d93-5e1a-49d9-b530-70fefc0f21dd_711081_ARTIST_PAGE_3_2.jpg",
	// 	      "pages":"525",
	// 	      "conference":"G5vYZ4aioMDSp",
	// 	      "time":"2018",
	// 	      "title":"bbb",
	// 	   },
	// 	   {
	// 	      "authors":[
	// 	         "Li Haoyu","Li Haoyu","Li Haoyu"
	// 	      ],
  //             "link":"https://s1.ticketm.net/dam/a/1dd/d5e86d93-5e1a-49d9-b530-70fefc0f21dd_711081_ARTIST_PAGE_3_2.jpg",
	// 	      "pages":"525",
	// 	      "conference":"G5vYZ4aioMDSp",
	// 	      "time":"2018",
	// 	      "title":"ccc",
	// 	   },
	// 	   {
	// 	     "authors":[
	// 	         "Li Haoyu","Li Haoyu","Li Haoyu"
	// 	      ],
  //             "link":"https://s1.ticketm.net/dam/a/1dd/d5e86d93-5e1a-49d9-b530-70fefc0f21dd_711081_ARTIST_PAGE_3_2.jpg",
	// 	      "pages":"525",
	// 	      "conference":"G5vYZ4aioMDSp",
	// 	      "time":"2018",
	// 	      "title":"ddd",
	// 	   },
	// 	   {
	// 	      "authors":[
	// 	         "Li Haoyu","Li Haoyu","Li Haoyu"
	// 	      ],
  //             "link":"https://s1.ticketm.net/dam/a/1dd/d5e86d93-5e1a-49d9-b530-70fefc0f21dd_711081_ARTIST_PAGE_3_2.jpg",
	// 	      "pages":"525",
	// 	      "conference":"G5vYZ4aioMDSp",
	// 	      "time":"2018",
	// 	      "title":"eee",
	// 	   }
	// 	];


  var index;

    /**
     * Initialize
     */
    function init() {
        // Register event listeners
        $('search-btn').addEventListener('click', searchbyItems);
        getIndex();


   //     searchbyItems();
    }
    
    function searchbyItems() {
    	activeBtn('search-btn');
//        item-ids = getidfromindex();
    //    SearchResponse  = getjsonfromid(item-ids);
    	//var pdfItems = mockSearchResponse;

    	//listItems(pdfItems);
        var itemList = $('item-list');
        itemList.innerHTML = '';
        searchIDByIndex();
    }
    


    function activeBtn(btnId) {
        var btn = $(btnId);
        btn.className += ' active';
    }

//     function showLoadingMessage(msg) {
//         var itemList = $('item-list');
//         itemList.innerHTML = '<p class="notice"><i class="fa fa-spinner fa-spin"></i> ' +
//             msg + '</p>';
//     }

//     function showWarningMessage(msg) {
//         var itemList = $('item-list');
//         itemList.innerHTML = '<p class="notice"><i class="fa fa-exclamation-triangle"></i> ' +
//             msg + '</p>';
//     }

//     function showErrorMessage(msg) {
//         var itemList = $('item-list');
//         itemList.innerHTML = '<p class="notice"><i class="fa fa-exclamation-circle"></i> ' +
//             msg + '</p>';
//     }


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
        // create the <li> tag and specify the id and class attributes
        var li = $('li', {
//             id: 'item-' + item_id,
            className: 'item'
        });
      
        var div = $('div', {
            className: 'item-div'
        });
      
      
        var title = $('a', {
            href: item.links,
            target: '_blank',
            className: 'item-name'
        });
        title.innerHTML ='Title: ' + item.title;
        div.appendChild(title);
      
        var authors = $('p', {
            className: 'item-authors'
        });
        authors.innerHTML = 'Authors: ' + item.author;
        div.appendChild(authors);

        var pages = $('p', {
            className: 'item-pages'
        });
        pages.innerHTML = 'Pages: ' + item.pages;
        div.appendChild(pages);
      
        var conference = $('p', {
            className: 'item-conference'
        });
        conference.innerHTML ='Conference: ' + item.subject;
        div.appendChild(conference);
      
        var time = $('p', {
            className: 'item-time'
        });
        time.innerHTML ='Time: '  + item.year;
        div.appendChild(time);
      
        li.appendChild(div);


        itemList.appendChild(li);
      //  }
    }
  


    function ajax(method, url, data, callback, errorHandler) {
        var xhr = new XMLHttpRequest();

        xhr.open(method, url, true);

        xhr.onload = function() {
            if (xhr.status === 200) {
                callback(xhr.responseText);
            }
            else {
                errorHandler();
            }

        };

        xhr.onerror = function() {
            console.error("The request couldn't be completed.");
            errorHandler();
        };

        if (data === null) {
            xhr.send();
        } else {
            xhr.setRequestHeader("Content-Type",
                "application/json;charset=utf-8");
            xhr.send(data);
        }
    }





    function getIndex(){

        var url = 'https://inf551-project-aa3f8.firebaseio.com/';
        var params = 'root/invertedIndexes.json';
        var req = JSON.stringify({});



        // make AJAX call
        ajax('GET', url + params, req,
            // successful callback
            function(res) {
                var items = JSON.parse(res);
                if (!items || items.length === 0) {
                    console.log("null");
                } else {
             //       console.log(items);
                    saveIndex(items);
                }
            },
            // failed callback
            function() {
                console.log("error");
            });
    }

    function saveIndex(items) {
        // console.log(items);
        index = items;
    }

    function searchIDByIndex(){
        var searchcontent = $('searchtext');
        var ids = new Set();
        Object.keys(index).forEach(
            function(key){
                if (key.includes(searchcontent.value)){
                 for(var id in index[key]){
                     ids.add(index[key][id]);
                  };

                }

        });
        SearchById(ids);
    }


    function SearchById(ids){
        //return item-json
        var url = 'https://inf551-project-aa3f8.firebaseio.com/';
        var params = 'root/cvpr/';
        var req = JSON.stringify({});

        ids.forEach(function(id){
            ajax('GET', url + params + id.toString() + '.json', req,
                // successful callback
                function(res) {
                    var item = JSON.parse(res);
                    if (!item || item.length === 0) {

                        console.log("null");
                    } else {
                        var itemList = $('item-list');
                        //itemList.innerHTML = '';
                        addItem(itemList,item);
                    }
                },
                // failed callback
                function() {
                    console.log("error");
                });
        });




        // make AJAX call

    }

    
    init();
    
})();





