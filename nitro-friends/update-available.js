const ours = document.getElementById("ours");
const theirs = document.getElementById("theirs");
const download = document.getElementById("download");
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const changelog = document.getElementById("changelogs");
const changelogText = changelog.getElementsByTagName("p")[0];

var data;
var store;
var changelogData = "";

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
            store = "apple";
        }
    } else if (!!params["chrome-web-store"]) {
        if (params["chrome-web-store"] == 1 || params["chrome-web-store"] == "true") {
            download.href = "https://josephyapyeeeeeeeeeeeeeeeeeeeeeeeeeeeet.github.io/nitro-friends/not-live";
            ours.innerHTML = data.version_check_google[data.version_check_google.length - 1];
            store = "chrome";
        }
    }
        if (!(store == "apple") && !(store == "chrome")) {
        ours.innerHTML = data.version_check[data.version_check.length - 1];
        download.href = "https://github.com/JosephYapYEEEEEEEEEEEEEEEEEEEEEEEEEEEET/nitroFriends/releases/tag/" + data.version_check[data.version_check.length - 1];
    }
    download.hidden = false;
    displayChangelogs(store, false);
}


async function displayChangelogs(store, force) {
    var foundVersion = false;
    if (force) {
        if (!(store == "apple") && !(store == "chrome")) {
            for (let i = 0; i < data.version_check.length; i++) {
                changelogData = `${changelogData}${data.changelogs[data.version_check[i]]}</br>`;
                foundVersion = true;
            }
        } else if (store == "apple") {
            for (let i = 0; i < data.version_check_apple.length; i++) {
                changelogData = `${changelogData}${data.changelogs_apple[data.version_check_apple[i]]}</br>`;
                foundVersion = true;
            }
        } else {
            for (let i = 0; i < data.version_check_google.length; i++) {
                changelogData = `${changelogData}${data.changelogs_google[data.version_check_google[i]]}</br>`;
                foundVersion = true;
            }
        }
    } else {
        if (!(store == "apple") && !(store == "chrome")) {
            for (let i = 0; i < data.version_check.length; i++) {
                if (foundVersion) {
                    changelogData = `${changelogData}${data.changelogs[data.version_check[i]]}</br>`;
                }
                if (data.version_check[i] == params.version) {
                    foundVersion = true;
                }
            }
        } else if (store == "apple"){
            for (let i = 0; i < data.version_check_apple.length; i++) {
                if (foundVersion) {
                    changelogData = `${changelogData}${data.changelogs_apple[data.version_check_apple[i]]}</br>`;
                }
                if (data.version_check_apple[i] == params.version) {
                    foundVersion = true;
                }
            }
        } else {
            for (let i = 0; i < data.version_check_google.length; i++) {
                if (foundVersion) {
                    changelogData = `${changelogData}${data.changelogs_google[data.version_check_google[i]]}</br>`;
                }
                if (data.version_check_google[i] == params.version) {
                    foundVersion = true;
                }
            }
        }
    }
    if (!foundVersion) { displayChangelogs(store, true); }
    changelogText.innerHTML = changelogData;
    changelog.hidden = false;
}




getVersions();
