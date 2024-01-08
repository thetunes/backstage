function logoutBtn() {
    console.log("logoutBtn function called");
    document.cookie = "token_adm=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.replace("http://tunes.herobuxx.me/gate/");
}