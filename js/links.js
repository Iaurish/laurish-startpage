// if the user doesn't want these they can just delete them
const defaultLinks = [
    { name: "youtube", url: "https://www.youtube.com", col: 1 },
    { name: "chatgpt", url: "https://chatgpt.com/", col: 1 },
    { name: "gmail", url: "https://mail.google.com/mail/u/0/#inbox", col: 1 },
    
    { name: "pixiv", url: "https://www.pixiv.net/en/", col: 2 },
    { name: "chess", url: "https://lichess.org/", col: 2 },
    
    { name: "github", url: "https://github.com/", col: 3 },
    { name: "cloudflare", url: "https://dash.cloudflare.com/", col: 3 }
];

let userLinks = JSON.parse(localStorage.getItem('custom_links')) || defaultLinks;

function renderLinks() {
    document.getElementById('link-col-1').innerHTML = '';
    document.getElementById('link-col-2').innerHTML = '';
    document.getElementById('link-col-3').innerHTML = '';
    document.getElementById('link-col-4').innerHTML = '';

    userLinks.forEach((link, index) => {
        const a = document.createElement('a');
        a.href = link.url;
        a.innerText = link.name;
        
        a.oncontextmenu = function(e) {
            e.preventDefault(); 
            if(confirm(`Delete link: ${link.name}?`)) {
                userLinks.splice(index, 1); 
                localStorage.setItem('custom_links', JSON.stringify(userLinks)); 
                renderLinks(); 
            }
        };
        
        const colEl = document.getElementById(`link-col-${link.col}`);
        if (colEl) colEl.appendChild(a);
    });
}

function toggleLinkMenu() {
    const menu = document.getElementById('link-menu');
    if (menu.style.display === 'none') {
        menu.style.display = 'flex';
        document.getElementById('new-link-name').focus();
    } else {
        menu.style.display = 'none';
        document.getElementById('new-link-name').value = '';
        document.getElementById('new-link-url').value = '';
    }
}

function saveNewLink() {
    const name = document.getElementById('new-link-name').value.trim();
    let url = document.getElementById('new-link-url').value.trim();
    const col = document.getElementById('new-link-col').value;

    if (name && url) {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        
        userLinks.push({ name, url, col: parseInt(col) });
        localStorage.setItem('custom_links', JSON.stringify(userLinks));
        
        renderLinks();
        toggleLinkMenu();
    } else {
        alert("please enter a name and url.");
    }
}

renderLinks();

function toggleChangelog() {
    const linkMenu = document.getElementById('link-menu');
    const changelogMenu = document.getElementById('changelog-menu');
    
    if (changelogMenu.style.display === 'none') {
        linkMenu.style.display = 'none';
        changelogMenu.style.display = 'flex';
    } else {
        changelogMenu.style.display = 'none';
        linkMenu.style.display = 'flex';
    }
}