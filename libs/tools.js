var tools={
    
	
	/*ajaxPostPromise:jsonp请求
			 *@param	url			<string> 请求的地址
			 *@param	query		<object> 请求携带的参数
			 *@return	isJson		<boolean> 是否是json格式的数据
	
	*/
	ajaxGetPromise:function(url,query,isJson){
		//isJson没有传递，则默认为true
		isJson=isJson===undefined ? true : isJson;
		if (query){
			url +="?";
			for(var key in query){
				url+=key+"="+query[key]+"&";
			}
			/*删除最后一个*/
			url=url.slice(0,-1);
		}
		
		return new Promise((resolve,reject)=>{
			let ajax = new XMLHttpRequest();
			ajax.open("GET",url,true);//true代表异步
			ajax.send(null);
			ajax.onreadystatechange = function(){
				if(ajax.readyState===4){
					if(ajax.status===200){
						/*数据返回成功*/
						resolve(isJson ? JSON.parse(ajax.responseText) : ajax.responseText);
					}else {
						reject();
					}
				}
			}
		})	
	}
	

}
define(() => {
	
	return tools;
	
});
