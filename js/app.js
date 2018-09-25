$(document).ready(function(){
    // initial topic array
    var topics = ["ghosts", "zombies", "vampires", "clowns", "david s pumpkins"]
    // creates initial buttons from topic array
    $.each(topics, function(i){
        newButton = $("<button class='userButton' value='" + topics[i] + "'>" + topics[i] + "</button>")
        $("#userButtons").append(newButton)
    })


    // used to query API
    function getGifs(searchTerm){
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=soLp2ZLtbBK95sN1Dn73wF2sAvhFBrxZ&limit=10&q="
        $.ajax({
            url: queryURL += searchTerm,
            method: "GET"
        }).then(function(response) {
            $.each(response.data, function(i){
                var imageCard = $("<div class='imageCard'>")
                imageCard.append($("<img>").attr({"src": response.data[i].images.original.url,
                                                "data-animate": response.data[i].images.original.url,
                                                "data-still": response.data[i].images.original_still.url,
                                                "data-state": "animate"}))
                imageCard.prepend($("<p class='label'>").html("Title: " + response.data[i].title + "<br>" + "Rating: " + response.data[i].rating.toUpperCase()))
                $("#cards").prepend(imageCard)
                $(".imageCard").fadeIn()
            })
        })
    }

    // user buttons
    $(document).on("click", ".userButton", function(event){
        event.preventDefault()
        // gets search term from button value
        var searchTerm = $(this).val()
        // queries API
        getGifs(searchTerm)
    })

    // search button, also adds new user button
    $(document).on("click", ".search", function(event){
        event.preventDefault()
        // grabs input from text field
        var searchTerm = $("#searchTerm").val().trim()
        $("#searchTerm").val("")
        // checks to make sure input isn't blank
        if (searchTerm != "") {
            //checks if topic has already been used, if not, creates a new button
            if (!topics.includes(searchTerm)) {
                topics.push(searchTerm)
                var newButton = $("<button class='userButton' value='" + searchTerm + "'>" + searchTerm + "</button>")
                $("#userButtons").append(newButton)
            }
            //queries API 
            getGifs(searchTerm)  
        }
    })

    $(document).on("click", ".imageCard", function(event){
        event.preventDefault()        
        console.log("clicked an imageCard")
        state = $(this).find("img").attr("data-state")
        // Cycles between still an animated states
        if (state === 'still'){
            $(this).find("img").attr({'src': $(this).find("img").attr('data-animate'), 'data-state': 'animate'})
            $(this).find(".label").fadeOut(300)
        } else {
            $(this).find("img").attr({'src': $(this).find("img").attr('data-still'), 'data-state': 'still'})
            $(this).find(".label").fadeIn(300)
        }
    })

    // Clears image area
    $(document).on("click", ".clearImages", function(event){
        event.preventDefault() 
        $("#cards").html("")
    })    
        
    // Clears topic buttons and array
    $(document).on("click", ".clearTopics", function(event){
        event.preventDefault() 
        topics = []
        $("#userButtons").html("")
    })  
})