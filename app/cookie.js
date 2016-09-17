function setCookie(name){
  let date = new Date(new Date().getTime() + 60 * 60 * 24 * 1000);
  let str = 'nameInChatByKot=' + name + '; expires=' + date.toUTCString();
  document.cookie = str;
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

module.exports = { setCookie, getCookie };
