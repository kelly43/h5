function choiceCard(cardID){
	if(!cardID){
		malert("bind the card Input is error");
		return;
	}else{
		var temp = new Object();
		temp["CardID"] = cardID;
		$.ajax({
			type: "POST",
			url: "/Index/BindCard",
			dataType: "json",
			data:temp,
			success: function(data){
				if(data.statue == true){
					window.location.href="/Index/GameIndex";
					return;
				}else{
					//bind error
					if(data.statueCode == 1002){
						//Binded
						window.location.href="/Index/GameIndex";
					}else{
						//error
						window.location.href="/Index/index";
					}
					
				}
			}
		});
	}
}


function drawCard(pace){
	if(!pace){
		malert("bind the card Input is error");
		return;
	}else{
		var temp = new Object();
		temp["pace"] = pace;
		$.ajax({
			type: "POST",
			url: "/Index/Draw",
			dataType: "json",
			data:temp,
			success: function(data){
				if(data.statue == true){
					//回调成功
					drawCardReback(data.data);
					return;
				}else{
					//有误
					malert("系统错误");
					return;
				}
			}
		});
	}
}