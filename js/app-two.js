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
				$(".mb-txt.active .txt-area").append("<p class='urmsg'><span>You says...</span>"+message+"</p>");
				$("#sendMsg").val(''); // Clear textarea after msg sent.
				// msghistory is a variable to hold entire message section.
				replyvisibility();
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

	    replyvisibility();	// Reply link visibility
	    $(".rplbox").remove();	// Remove reply text box on recepient change.
	    count=0;	// Reset count to zero to get one on recepient change.
	});
	// Loacal storage get
	if (localStorage.getItem("msgHist") !== null) {
		$(".message-window").html(localStorage.getItem('msgHist'));
	// Remove active class, to override local stoarge action.
		$(".mb-txt").removeClass('active');
	}



	// Reply
	var count=0;

	$(document).on('click', '.reply' , function() {
		count++
		if(count==1){
			$('.mb-txt.active').append("<div class='rplbox'><textarea></textarea><button class='sendreply button small primary'>Send</button></div>");
			$('.mb-txt.active .reply').hide();
		}
	});

	$(document).on('click', '.sendreply' , function() {
		var replytxt = $('.mb-txt.active textarea').val();
		if(!replytxt){
				alert("Can't send empty message");		
			}else{
				// Append text in in active window.
				$(".mb-txt.active .txt-area").append("<p><span>They says...</span>"+replytxt+"</p>");
				$('.mb-txt.active textarea').val(''); // Clear textarea after msg sent.
				// rplyhistory is a variable to hold entire message section.
				var rplyhistory = $(".message-window").html();
				// Loacal storage set
				localStorage.setItem('msgHist', rplyhistory);
			}
	});

	function replyvisibility(){
		var msgLength = $('.mb-txt.active .txt-area p').length;
		var replybox = $('.mb-txt.active .rplbox').length;
		if(msgLength!=0 && replybox==0){
			$('.mb-txt.active .reply').show();
		}else{
			$('.mb-txt.active .reply').hide();
		}
	}


				

	// Reset local storage
	$('#reset').click(function(){
		localStorage.clear();
		location.reload();
	})

});

