(()=>{
    let parseTable = async function(res){
        let txt = await res.text();
        return txt.replace(/\#.*\n/,"").split("----").map(col=>{
            col = col.trim().split("\n\n");
            let name = col[0].trim();
            let price = col[1].trim();
            //splitting the features to ok and no
            let [ok=[],no=[]] = col[col.length-1].split("~~~").map(
                features=>{
                    return features.trim().split("\n").map(t=>t.trim());
                }
            );
            return [name,price,ok,no];
        });
    };
    [...document.querySelectorAll(".pricing")].map(
        async (e)=>{
            let table = await parseTable(await fetch(e.getAttribute("href")));
            let wrapper = new ELEM(e);
            
            table.map(([name,price,ok,no])=>{
                let colE = wrapper.add("div");
                colE.add("h3",0,name);
                colE.add("div",0,price);
                let featsE = colE.add("div","class:features");
                
                ok.map(r=>{
                    featsE.add("div","class:ok",r);
                });
                no.map(r=>{
                    featsE.add("div","class:no",r);
                });
            });
        }
    );
})();
