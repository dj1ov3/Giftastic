$(document).ready(function(){
    console.log("wassup");

    var topics = ["Music Production","Stage","Forest Mountain", "Skateboarding","Ocean","Meditation"]; 


    function renderButtons() {

       
        $("#buttonsBox").empty();

        
        for (var i = 0; i < topics.length; i++) {

       
        var btn = $("<button>");
        btn.addClass("gifbtn");
        btn.attr("data-name", topics[i]);
        btn.text(topics[i]);
        $("#buttonsBox").append(btn);
        }
    }

    $("#searchBtn").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var gif = $("#gif-search").val().trim();
        // The movie from the textbox is then added to our array
        topics.push(gif);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

    
    renderButtons();


    $("body").on("click", ".gifbtn", function() {
        var userSearch = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          userSearch + "&api_key=pSpxBgMEkaQLNW2jwVCwkymhCaOGMvtc&limit=10";
          

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            $("#gifpanel").empty();
            console.log(response);
            var results = response.data
            
     
            for (var i = 0; i < results.length; i++) {
                var searchDiv = $("<div>");
                searchDiv.attr("id", "theGif")
                var p = $("<p>");
                    p.text("Rating: " + results[i].rating);
                    var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                searchDiv.append(p);
                searchDiv.append(gifImage);
                $("#gifpanel").append(searchDiv);

                var state = $(gifImage).attr("data-state");
                state = "still";
                
                // ____________________________________________________________________________
                
                //when the image is clicked switch to animated, unless its already then switch to still
                $("body").on("click", gifImage, function() {
                    
            
                    if (state === "still") {
                        $(this).attr("src", results[i].images.fixed_height.url);
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).images.fixed_height_still.url);
                        $(this).attr("data-state", "still");
                    }
                
            });
           
           
            }  
             
            
                $("body").on("click", gifImage, function() {
                    
            
                        if (state === "still") {
                            $(this).attr("src", results[this].images.fixed_height.url);
                            $(this).attr("data-state", "animate");
                        } else {
                            $(this).attr("src", $(this).images.fixed_height_still.url);
                            $(this).attr("data-state", "still");
                        }
                    
                });
               
  
        });
    });
    
    

      
});