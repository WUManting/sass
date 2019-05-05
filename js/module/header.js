//定义一个模块时，就需要依赖其他模块
//定义header模块的时候就要依赖tools模块，可以直接传进来.1.将header.html加载进来
define(["tools"], (tools)=>{
    class Header{
        constructor(){
            //规定：header标签加载header模块
            this.container=document.querySelector("header");
            this.load();
            console.log(this.container);
        }
        load (){
            //加载header.html
            tools.ajaxGetPromise("html/module/header.html",null,false).then(data=>{
                console.log(data);
            })
        }
    }
    return new Header();
});