$(document).foundation();

$(document).ready(function(){
	// Send message to selected receipient.
	$("#submit").on("click",function(event){
		// Store textarea value.
		var message = $("#sendMsg").val()
		// Check active recepient.
		var activeRecipient = $(".mb-txt.active");
		if(activeRecipient.length){
			if(!message){
				alert("Can't send empty message");		
			}else{
				// Append text in in active window.
				$(".mb-txt.active .txt-area").append("<p>"+message+"</p>");

				// msghistory is a variable to hold entire message section.
				var msghistory = $(".message-window").html();
				// Loacal storage set
				localStorage.setItem('msgHist', msghistory);
			}
				
		}else{
			alert('Choose Recipient');
		}
		
	});

	$("select").change(function(){
	    $(this).find("option:selected").each(function(){
	    	var valSelected = $(this).attr("data-value");
	    	if($(".mb-txt").hasClass(valSelected)){
	    		$(".mb-txt"+"."+valSelected).addClass('active').parent('.mw-box').siblings().find(".mb-txt").removeClass('active');
	    	}else{
	    		$(".mb-txt").removeClass('active');
	    	}
	    });
	});
	// Loacal storage get
	if (localStorage.getItem("msgHist") !== null) {
		$(".message-window").html(localStorage.getItem('msgHist'));
	// Remove active class, to override local stoarge action.
		$(".mb-txt").removeClass('active');
	}

	// Reset local storage
	$('#reset').click(function(){
		localStorage.clear();
		location.reload();
	})

});

