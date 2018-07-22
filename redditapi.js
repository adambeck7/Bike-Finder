// reddit api:
// https://www.reddit.com/dev/api#GET_search
// Using .click(), .append(), and .ajax()
// Attach a button listener to the button

$(document).ready(function () {
    $('#test').click(function () {
        /*  alert('Hello!');*/
        console.log("working")
        // On click on the button, make an AJAX request to reddit for results of cute puppies
        $.ajax({
            type: "GET",
            data: {
                q: "bike found",
                restrict_sr: "true"
            },
            // http://api.meetup.com/2/cities
            // http://www.reddit.com/r/aww/search.json?q=puppy&restrict_sr=true
            url: "https://www.reddit.com/r/denver/search.json",
            // data.children[i].data.thumbnail.children
            success: function (response) {
                console.log(response.data)
                $('#text').html('');
                // var children = JSON.stringify(response.data.children);
                var children = response.data.children;
                /*$('.text').text(children);*/
                for (var i = 0; i < 4; i++) {
                    // parse title, url and photo.
                    var dataTitle = children[i].data.title
                    var dataURL = children[i].data.url

                    if (children[i].data.thumbnail !== "self" && children[i].data.thumbnail !== "default") {
                        var dataPhoto = children[i].data.thumbnail
                        var photoAppend = '<img class = "card-img-top" src="' + dataPhoto + '" />'
                        // $(photoAppend).addClass("card-img-top")
                        var dataHeight = children[i].data.thumbnail_height
                        var dataWidth = children[i].data.thumbnail_Width
                        $(photoAppend).height(dataHeight)
                        $(photoAppend).width(dataWidth)

                    } else {
                        var photoAppend = "";
                    }
                    console.log(photoAppend, dataURL, dataTitle)

                    var targetDiv = $("#text")
                    var newCard = $("<div>")
                    $(newCard).addClass("card")
                    var newCardP = '<a href=' + dataURL + '>' + dataURL + '</a>'
                    var newTitle = $("<h5>")
                    // newCardP.text(dataURL)
                    newTitle.text(dataTitle)
                    $(newCard).append(photoAppend, newTitle, newCardP)
                    $(targetDiv).append(newCard)


                    // var newThread = $("<tr>")
                    // var newtd1 = $("<td>")
                    // var newtd2 = $("<td>")
                    // var newtd3 = $("<td>")
                    // $(newtd1).text(dataTitle)
                    // $(newtd2).text(dataURL)
                    // $(newtd3).append(photoAppend)
                    // $(newThread).append(newtd1, newtd2, newtd3)

                    // $(targetDiv).append(newThread)


                    // create a place in the table for the parsed data.
                    // push parsed data to table elements
                    // out table elements in the exisitng html



                    /*$('.text').append('<img src="' + children[i].data.thumbnail + '" />');*/
                    // if (children[i].data.thumbnail !== "self" && children[i].data.thumbnail !== "default") {
                    //     $('#text').append('<img src="' + children[i].data.thumbnail + '" />');
                    // }
                }
            },
            /*    dataType: 'jsonp'*/
        });

    });
    $('#test1').click(function () {
        /*  alert('Hello!');*/
        console.log("working")
        // On click on the button, make an AJAX request to reddit for results of cute puppies
        $.ajax({
            type: "GET",
            data: {
                q: "bike found",
                restrict_sr: "true"
            },
            // http://api.meetup.com/2/cities
            // http://www.reddit.com/r/aww/search.json?q=puppy&restrict_sr=true
            url: "https://www.reddit.com/r/boulder/search.json",
            // data.children[i].data.thumbnail.children
            success: function (response) {
                console.log(response.data)
                $('#text').html('');
                // var children = JSON.stringify(response.data.children);
                var children = response.data.children;
                /*$('.text').text(children);*/
                for (var i = 0; i < 4; i++) {
                    // parse title, url and photo.
                    var dataTitle = children[i].data.title
                    var dataURL = children[i].data.url

                    if (children[i].data.thumbnail !== "self" && children[i].data.thumbnail !== "default") {
                        var dataPhoto = children[i].data.thumbnail
                        var photoAppend = '<img class = "card-img-top" src="' + dataPhoto + '" />'
                        // $(photoAppend).addClass("card-img-top")
                        var dataHeight = children[i].data.thumbnail_height
                        var dataWidth = children[i].data.thumbnail_Width
                        $(photoAppend).height(dataHeight)
                        $(photoAppend).width(dataWidth)

                    } else {
                        var photoAppend = "";
                    }
                    console.log(photoAppend, dataURL, dataTitle)

                    var targetDiv = $("#text1")
                    var newCard = $("<div>")
                    $(newCard).addClass("card")
                    var newCardP = '<a href=' + dataURL + '>' + dataURL + '</a>'
                    var newTitle = $("<h5>")
                    // newCardP.text(dataURL)
                    newTitle.text(dataTitle)
                    $(newCard).append(photoAppend, newTitle, newCardP)
                    $(targetDiv).append(newCard)


                    // var newThread = $("<tr>")
                    // var newtd1 = $("<td>")
                    // var newtd2 = $("<td>")
                    // var newtd3 = $("<td>")
                    // $(newtd1).text(dataTitle)
                    // $(newtd2).text(dataURL)
                    // $(newtd3).append(photoAppend)
                    // $(newThread).append(newtd1, newtd2, newtd3)

                    // $(targetDiv).append(newThread)


                    // create a place in the table for the parsed data.
                    // push parsed data to table elements
                    // out table elements in the exisitng html



                    /*$('.text').append('<img src="' + children[i].data.thumbnail + '" />');*/
                    // if (children[i].data.thumbnail !== "self" && children[i].data.thumbnail !== "default") {
                    //     $('#text').append('<img src="' + children[i].data.thumbnail + '" />');
                    // }
                }
            },
            /*    dataType: 'jsonp'*/
        });

    });
})