[...document.querySelectorAll(".parallax")].map(p=>{
    let cn = [...p.childNodes];
    p.innerHTML = "";
    let div = document.createElement("div")
    p.appendChild(div);
    for(let i = 0; i < cn.length; i++){
        div.appendChild(cn[i]);
    }
});

(()=>{
    let nav = document.querySelector("#topnav");
    let paren = nav.parentNode;
    paren.removeChild(nav);
    paren = new ELEM(paren);
    let burger = paren.add("div","class:burger");
    burger.add("div");
    paren.add(nav);
    burger.on("click",(e)=>{
        e.preventDefault();
        e.stopPropagation();
        paren.e.classList.toggle("expanded");
    });
    paren.on("click",()=>{
        paren.e.classList.remove("expanded");
    });
    (new ELEM(nav)).on("click",()=>{
        paren.e.classList.remove("expanded");
    });
})();


//popup
let popup = (()=>{
    let cache = {};
    return async function(path){
        if(path in cache){
            cache[path]();
            return;
        }
        let ff = await fetch(path);
        let str = await ff.text();
        let body = new ELEM(document.body);
        let wrapper = body.add("div","class:popup-wrapper");
        let pbodyWrapper = wrapper.add("div");
        let pbody = pbodyWrapper.add("div",0,str);
        let closebtn = pbodyWrapper.add("div","class:close-btn","×");
        let okbtn = pbody.add("div","class:ok-btn","OK");
        
        let show = function(){
            wrapper.e.classList.add("visible");
            wrapper.e.style.visibility="visible";
            /*wrapper.e.style.display="flex";
            setTimeout(()=>{
            },1);*/
        };
        
        let hide = function(){
            wrapper.e.classList.remove("visible");
            setTimeout(()=>{
                wrapper.e.style.visibility="hidden";
            },200);
        };
        
        closebtn.on("click",()=>{
            hide();
        });
        pbodyWrapper.on("click",(e)=>{
            e.stopPropagation();
        });
        wrapper.on("click",()=>{
            hide();
        });
        okbtn.on("click",()=>{
            hide();
        });
        setTimeout(()=>{
            show();
        },10);
        cache[path] = show;
    };
})();

console.log(popup);



