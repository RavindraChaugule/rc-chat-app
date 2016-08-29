$(document).foundation();

$(document).ready(function(){

// function adminInfo(){
// 	var adminName = prompt('Enter your name');
// 	$("#yourName").text(adminName);
// }
// adminInfo();
function groupMembers(){
	$("#addNewMember").click(function(){
		$('#groupMembers').append("<input id='addMember' class='button primary' value='Add Member' type='button'/><input id='memberName' placeholder='Add new member' type='text'/>")
		if($("#addNewMember").length){
			$(this).hide();
		}else{
			$(this).show();
		}
	});
}
groupMembers();

function recepientWindowStorage(){
	// msghistory is a variable to hold entire message section.
	var msghistory = $(".message-window").html();
	// Loacal storage set
	localStorage.setItem('msgHist', msghistory);
}
function recepientWindowStorageGet(){
	// Loacal storage Get
	if (localStorage.getItem("msgHist") !== null) {
		$(".message-window").html(localStorage.getItem('msgHist'));
	// Remove active class, to override local stoarge action.
		$(".mb-txt").removeClass('active');
	}
}
function receipientListStorage(){
	// Member list options local storage set
	var masterList = $("#masterList").html();
	localStorage.setItem('masterlist',masterList);
}
function rpliedMsgStorage(){
	// rplyhistory is a variable to hold entire message section.
	var rplyhistory = $(".message-window").html();
	// Loacal storage to add replied messages in msgHist item.
	localStorage.setItem('msgHist', rplyhistory);
}
	

	// Add new member to the recepient panel.
	// Restrict to add same member.

	$(document).on("click", "#addMember" , function() {
		var memberName = $("#memberName").val();
		var memberNameEncoded = memberName.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();

		if($("#memberName").val().length){
			if($(".mw-box h5").hasClass(memberNameEncoded)){
				alert('Member with this name already joind!\nPlease choose other name.');
			}else{
				$(".members-list").prepend("<div class='mw-box'><h5 class='"+memberNameEncoded+"'>"+memberName+"</h5><div class='mb-txt "+memberNameEncoded+"'><div class='txt-area'></div><a class='reply'>Reply</a></div></div>");
				$("#masterList").append("<option data-value='"+memberNameEncoded+"'>"+memberName+"</option>");
				 $("#memberName").val('');
				receipientListStorage();
				recepientWindowStorage();
				
			}
		}else{
			alert('Add member name');
		}
		optionListVisibility();
	});
	// Member list options local storage get
	if (localStorage.getItem("masterlist") !== null) {
		$("#masterList").html(localStorage.getItem('masterlist'));
	}

	// Send message to selected receipient.
	$(document).on("click", "#submit" , function() {
	
		// Store textarea value.
		var message = $("#sendMsg").val()
		// Check active recepient.
		var activeRecipient = $(".mb-txt.active");
		
		if(activeRecipient.length){
			if(!message){
				alert("Can't send empty message");		
			}else{
				// Append text in in active window.
				$(".mb-txt.active .txt-area").append("<p class='urmsg'><span>Admin says...</span>"+message+"</p>");
				$("#sendMsg").val(''); // Clear textarea after msg sent.
				replyvisibility();

				recepientWindowStorage();
				
			}
				
		}else{
			alert('Choose Recipient');
		}
		
	});
	$(document).on('change', 'select' , function() {
	    $(this).find("option:selected").each(function(){
	    	var valSelected = $(this).attr("data-value");
	    	if($(".mb-txt").hasClass(valSelected)){
	    		$(".mb-txt"+"."+valSelected).addClass('active').parent('.mw-box').siblings().find(".mb-txt").removeClass('active');
	    	}else{
	    		$(".mb-txt").removeClass('active');
	    	}
 			replyvisibility();
	    });

	   	// Reply link visibility
	    $(".rplbox").remove();	// Remove reply text box on recepient change.
	    replyvisibility();
	    count=0;	// Reset count to zero to get 1 on recepient change.
	});
	
	recepientWindowStorageGet();
	
	// Add and visbility of Reply link
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
		var currentMember = $(this).closest(".mw-box").find("h5").html();
		//console.log(currentMember);
		if(!replytxt){
				alert("Can't send empty message");		
			}else{
				// Append text in in active window.
				$(".mb-txt.active .txt-area").append("<p><span>"+currentMember+" says...</span>"+replytxt+"</p>");
				$('.mb-txt.active textarea').val(''); // Clear textarea after msg sent.
				rpliedMsgStorage();
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

	// Hide Recepient option list if no member added.
	function optionListVisibility(){
		var optioncount = $("#masterList option").length;
		console.log(optioncount);
		if(optioncount >1){
			$(".list-wrap").fadeIn();
		}else{
			$(".list-wrap").hide();
		}	
	}
	optionListVisibility();
	replyvisibility();
	// Reset local storage
	$('#reset').click(function(){
		localStorage.clear();
		location.reload();
	})

});

