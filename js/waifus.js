var image = document.getElementById("waifupic");
image.onclick = function() { changeWaifu() };

var Waifus = {
    name:[
        "sakuya izayoi",
        "monika",      
        "aubrey",
        "remilia and flandre",
        "jill stingray"
    ],
    file:[
        "1.png",
        "2.png",
        "3.jpg",
        "4.png",
        "5.jpg"
    ],
    numWaifus:undefined,
    curWaifu:undefined,
};

try{ 
    if(Waifus.file.length != Waifus.name.length) {
        throw WaifuMismatchError;
    } else {
        Waifus.numWaifus = Waifus.name.length;
    }
}
catch(WaifuMismatchError) {
    window.alert("Error in waifus.js! Amount of listed names and files do not agree.") 
}

function changeWaifu() {
    Waifus.curWaifu++;
    if(Waifus.curWaifu >= Waifus.numWaifus) {
        Waifus.curWaifu = 0;
    }
    document.getElementById("waifuname").innerHTML = Waifus.name[Waifus.curWaifu];
    image.style.backgroundImage = "url(img/" + Waifus.file[Waifus.curWaifu] + ")";  
    image.setAttribute("title", Waifus.name[Waifus.curWaifu])
}

Waifus.curWaifu = Math.floor(Math.random() * Waifus.numWaifus);
changeWaifu();