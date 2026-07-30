var curPage = 1;

document.getElementById("button1").onclick = function() { changePage(1); };
document.getElementById("button2").onclick = function() { changePage(2); };
document.getElementById("button3").onclick = function() { changePage(3); };

document.getElementById("button" + curPage).style.backgroundColor="#777777";
document.getElementById("main" + curPage).style.display="flex";

function changePage(nextPage) {
    if (nextPage == curPage) {
        return;
    }
    document.getElementById("main" + curPage).style.display="none";
    document.getElementById("button" + curPage).style.backgroundColor="#FFFFFF";
    document.getElementById("main" + nextPage).style.display="flex";
    document.getElementById("button" + nextPage).style.backgroundColor="#777777";
    curPage = nextPage;
}