var url = "http://localhost:8080/";
$.ajax({
		type:"post",
		url:url+"/user/findUser",
		dataType:"json",
		async:true,
		data:{
			token:localStorage["token"],
		},success:function(data){
			console.log(data);
			localStorage.setItem("myHead",data.data.head);
			$("#username").html(data.data.userName);
		}
	});
	
function islogin(){
		if(localStorage["userName"] == ""){
		$("#u_name").html("未登录");
	}
}
function is_shopping(){
		if(localStorage["isShopping"] == 1){
		$("#MyShop").css("display","block");
		$("#MyShop_span").css("display","block");
	}else{
		$("#setShop").css("display","block");
		$("#setShop_span").css("display","block");
	}
}

	function logout(){
			localStorage.setItem("token","");
			localStorage.setItem("userName","");
			localStorage.setItem("address","");
			localStorage.setItem("telphone","");
			localStorage.setItem("realName","");
			localStorage.setItem("intrduce","");
			localStorage.setItem("sex","");
			localStorage.setItem(["headImage"],"");
			localStorage.setItem(["isShopping"],"");
			
			window.location.href="login.html";
	}

	function type(pid,el){
		$.ajax({
			type:"post",
			url:url+"/dictionary/find_by_parent_id",
			dataType:"json",
			async:true,
			data:{
				pid:pid
			},success:function(data){
				//console.log(data);
				new Vue({
					el:el,
					data:{
						datas:data.data
					}
				})
			}
		});
	}
	
	function timestampToTime(timestamp) {
	        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	        Y = date.getFullYear() + '-';
	        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	        D = date.getDate() + ' ';
	        h = date.getHours() + ':';
	        m = date.getMinutes() + ':';
	        s = date.getSeconds();
	        return Y+M+D+h+m+s;
	  }
	

	//utf-8 转汉字
		function getCharFromUtf8(str) {  
		    var cstr = "";  
		    var nOffset = 0;  
		    if (str == "")  
		        return "";  
		    str = str.toLowerCase();  
		    nOffset = str.indexOf("%e");  
		    if (nOffset == -1)  
		        return str;  
		    while (nOffset != -1) {  
		        cstr += str.substr(0, nOffset);  
		        str = str.substr(nOffset, str.length - nOffset);  
		        if (str == "" || str.length < 9)  
		            return cstr;  
		        cstr += utf8ToChar(str.substr(0, 9));  
		        str = str.substr(9, str.length - 9);  
		        nOffset = str.indexOf("%e");  
		    }  
		    return cstr + str;  
		}  
		
		function utf8ToChar(str) {  
		    var iCode, iCode1, iCode2;  
		    iCode = parseInt("0x" + str.substr(1, 2));  
		    iCode1 = parseInt("0x" + str.substr(4, 2));  
		    iCode2 = parseInt("0x" + str.substr(7, 2));  
		    return String.fromCharCode(((iCode & 0x0F) << 12) | ((iCode1 & 0x3F) << 6) | (iCode2 & 0x3F));  
		} 