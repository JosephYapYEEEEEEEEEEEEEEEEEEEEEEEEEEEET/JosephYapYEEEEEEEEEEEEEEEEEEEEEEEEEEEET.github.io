const ours = document.getElementById("ours");
const theirs = document.getElementById("theirs");
const download = document.getElementById("download");
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
var data;
var apple_app_store;

async function getVersions() {
    const apiUrl = 'https://josephyapyeeeeeeeeeeeeeeeeeeeeeeeeeeeet.github.io/nitroFriendsAPI.json';
    try {
        const response = await fetch(apiUrl);
        data = await response.json();
        displayData();
    } catch (error) {

    }
}

async function displayData() {
    if (!!params.version) {
        theirs.innerHTML = params.version;
    }
    if (!!params["apple-app-store"]) {
        if (params["apple-app-store"] == 1 || params["apple-app-store"] == "true") {
            download.href = "https://apps.apple.com/app/id1573370632";
            ours.innerHTML = data.version_check_apple[data.version_check_apple.length - 1];
            apple_app_store = true;
        }
    }
        if (!apple_app_store) {
        ours.innerHTML = data.version_check[data.version_check.length - 1];
        download.href = "https://github.com/JosephYapYEEEEEEEEEEEEEEEEEEEEEEEEEEEET/nitroFriends/releases/tag/" + data.version_check[data.version_check.length - 1];
    }
    download.hidden = false;
}

getVersions();
