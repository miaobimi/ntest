Login = {

	init : function(){

	},

	bindLoginEvent : function(){

	},

	ajaxReturn : function(url,data,before,callback){
		$.ajax({
			url : url,
			data : data,
			dataType :'Json',
			type : 'POST',
			cache : false,
			beforeSend : function(){
				if(typeof before === 'function'){
					before();
				}
			},
			success : function(res){
				if(typeof callback === 'function'){
					callback(res);
				}
			}
		})
	}
}

$(function(){
	Login.init();
})