var image = document.getElementById("waifupic");
image.onclick = function() { changeWaifu() };

var Waifus = THEMES[ACTIVE_THEME].waifus;
Waifus.numWaifus = Waifus.name.length;
Waifus.curWaifu = undefined;

function changeWaifu() {
    Waifus.curWaifu++;
    if(Waifus.curWaifu >= Waifus.numWaifus || isNaN(Waifus.curWaifu)) {
        Waifus.curWaifu = 0;
    }
    document.getElementById("waifuname").innerHTML = Waifus.name[Waifus.curWaifu];
    
    image.style.backgroundImage = "url(" + Waifus.folder + Waifus.file[Waifus.curWaifu] + ")";  
    image.setAttribute("title", Waifus.name[Waifus.curWaifu]);
}

Waifus.curWaifu = Math.floor(Math.random() * Waifus.numWaifus);
changeWaifu();