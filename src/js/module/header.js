//定义一个模块时，就需要依赖其他模块
//定义header模块的时候就要依赖tools模块，可以直接传进来.1.将header.html加载进来
define(["tools"], (tools)=>{
    class Header{
        constructor(){
            //规定：header标签加载header模块
            this.container=document.querySelector("header");
            this.load();
        }
        load (){
            //加载header.html
            tools.ajaxGetPromise("html/module/header.html",null,false).then(html=>{
                this.container.innerHTML =html;
                //数据返回，header.html加载结束后才能运行交互
                this.nav();
                console.log(1111)                
            })
        }
        nav(){
            this.container.querySelector("h1").onclick=function(){
                alert(this.innerHTML);
            }
        }
    }
    return new Header();
});