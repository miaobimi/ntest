CHAT = {
	msgObj:$("#message"),
	screenheight : $(window).height(),
	username:null,
	userid:null,
	socket:null,
	users : ['aa'],
	//让浏览器滚动条保持在最低部
	scrollToBottom:function(){
		var content = document.getElementById('message');
		content.scrollTop = content.scrollHeight;
	},
	//退出，本例只是一个简单的刷新
	logout:function(){
		//this.socket.disconnect();
		location.reload();
	},
	//提交聊天消息内容
	submit:function(){
		var content = $('#content').val();
		if(content != ''){
			var obj = {
				userid: this.userid,
				username: this.username,
				content: content
			};
			this.socket.emit('message',this.users, obj);
			$("#content").val('');
		}
		return false;
	},
	genUid:function(){
		return new Date().getTime()+""+Math.floor(Math.random()*899+100);
	},
	//更新系统消息，本例中在用户加入、退出的时候调用
	updateSysMsg:function(o, action){
		//当前在线用户列表
		var onlineUsers = o.onlineUsers;
		//当前在线人数
		var onlineCount = o.onlineCount;
		//新加入用户的信息
		var user = o.user;
			
		//更新在线人数
		var userhtml = '';
		var separator = '';
		for(key in onlineUsers) {
	        if(onlineUsers.hasOwnProperty(key)){

	        	userhtml += '<li>'+
							'<img src="http://staff.chntz.cn/Public/Staff/Images/miao.jpg" alt="">'+
							'<span>'+onlineUsers[key]+'</span>'+
						'</li>';
			}
	    }
		$("#onlineUser").empty().html(userhtml);
		
		//添加系统消息
		// var html = '';
		// html += '<div class="msg-system">';
		// html += user.username;
		// html += (action == 'login') ? ' 加入了聊天室' : ' 退出了聊天室';
		// html += '</div>';
		// var section = d.createElement('section');
		// section.className = 'system J-mjrlinkWrap J-cutMsg';
		// section.innerHTML = html;
		// this.msgObj.appendChild(section);	
		// this.scrollToBottom();
	},
	//第一个界面用户提交用户名
	usernameSubmit:function(username){
		if(username != ""){
			this.init(username);
		}
		return false;
	},
	init:function(username){
		/*
		客户端根据时间和随机数生成uid,这样使得聊天室用户名称可以重复。
		实际项目中，如果是需要用户登录，那么直接采用用户的uid来做标识就可以
		*/
		this.userid = this.genUid();
		this.username = username;
		
		//d.getElementById("showusername").innerHTML = this.username;
		// this.msgObj.style.minHeight = (this.screenheight - document.body.clientHeight + this.msgObj.clientHeight) + "px";
		// this.scrollToBottom();
		
		//连接websocket后端服务器
		this.socket = io.connect('ws://127.0.0.1:3001');
		
		//告诉服务器端有用户登录
		this.socket.emit('login', {userid:this.userid, username:this.username});
		
		//监听新用户登录
		this.socket.on('login', function(o){

			CHAT.updateSysMsg(o, 'login');	
		});
		
		
		//监听用户退出
		this.socket.on('logout', function(o){
			CHAT.updateSysMsg(o, 'logout');
		});
		
		//监听消息发送
		this.socket.on('message', function(obj){
			CHAT.pushContent(obj)
		});

		$('#user-list dl dd').each(function(k,v){
			var user = $.trim($(v).find('a').text());
			CHAT.socket.on(user+'message', function(obj){
				CHAT.pushContent(obj)
			});
		})

	},

	pushContent : function(obj){
		var isme = (obj.userid == CHAT.userid) ? true : false;
		var contentDiv = '<div>'+obj.content+'</div>';
		var usernameDiv = '<span>'+obj.username+'</span>';
		
		var $section = $('<section></section>');
		if(isme){
			$section.attr('class','user');
			$section.append(contentDiv + usernameDiv);
		} else {
			$section.attr('class','service');
			$section.append(usernameDiv + contentDiv);
		}
		// console.log($section);return
		$section.appendTo($('#message'));
		CHAT.scrollToBottom();	
	}
};

//通过“回车”提交用户名
// d.getElementById("username").onkeydown = function(e) {
// 	e = e || event;
// 	if (e.keyCode === 13) {
// 		CHAT.usernameSubmit();
// 	}
// };
$(function(){
	var uid = CHAT.genUid();
	CHAT.usernameSubmit(uid);

	$("#subBtn").bind('click',function(){
		CHAT.submit();
	})
})
