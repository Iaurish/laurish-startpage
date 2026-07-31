var image = document.getElementById("waifupic");
image.onclick = function() { changeWaifu() };

var Waifus = {
    name:[
        "sakuya izayoi",
        "monika",      
        "aubrey",
        "remilia and flandre scarlet",
        "jill stingray",
        "asuka langley soryu",
        "patchouli knowledge",
        "hatsune miku",
        "megumin and kazuma",
        "ruka sarashina"
    ],
    file:[
        "1.jpeg",
        "2.jpeg",
        "3.jpeg",
        "4.jpeg",
        "5.jpeg",
        "6.jpeg",
        "7.jpeg",
        "8.jpeg",
        "9.jpeg",
        "10.jpeg"
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