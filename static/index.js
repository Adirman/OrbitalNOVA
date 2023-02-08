let inFrame

try {
  inFrame = window !== top
} catch (e) {
  inFrame = true
}

if (!inFrame && !navigator.userAgent.includes("Firefox")) {
  const popup = open("about:blank", "_blank")
  if (!popup || popup.closed) {
    alert("Please go to chrome://settings and allow pop ups from all sites to hide Orbital from your history, as well as Orbital's home from certain  blockers. Please note that if this setting is active, you will not be able to use the Tab Cloaking feature. If you have any questions or concerns, please contact adirman#2751, or do so in the NOVANET-SRV Discord server, found in the credits menu. Thank you!")
  } else {
    const doc = popup.document
    const iframe = doc.createElement("iframe")
    const style = iframe.style
    const link = doc.createElement("link")

    doc.title = "Google Drive"
    link.rel = "icon";
    link.href = "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png";
    iframe.src = location.href
    style.position = "fixed"
    style.top = style.bottom = style.left = style.right = 0
    style.border = style.outline = "none"
    style.width = style.height = "100%"

    doc.body.appendChild(iframe)
    location.replace("https://google.com/")
  }
}

const form = document.querySelector('form');
const input = document.querySelector('.site-input');
const searchBTN = document.querySelector('.search-btn');




searchBTN.addEventListener('click', async event => {
  event.preventDefault();
  window.navigator.serviceWorker.register('./sw.js', {
    scope: __uv$config.prefix
  }).then(() => {
    let url = input.value.trim();
    if (!isUrl(url)) url = 'https://searx.tiekoetter.com/search?q=' + url;
    else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;
    var urle = "https://" + document.domain + __uv$config.prefix + __uv$config.encodeUrl(url);
    if (urle) {
      var win; {
        if (win) { win.focus(); } else {
          win = window.open();
          win.document.body.style.margin = '0';
          win.document.body.style.height = '100vh';
          var iframe = win.document.createElement('iframe');
          iframe.style.border = 'none';
          iframe.style.width = '100%';
          iframe.style.height = '100%';
          iframe.style.margin = '0';
          iframe.src = urle;
          win.document.body.appendChild(iframe)
        }
      }
    }
  });

});




form.addEventListener('submit', async event => {
  event.preventDefault();
  window.navigator.serviceWorker.register('./sw.js', {
    scope: __uv$config.prefix
  }).then(() => {
    let url = input.value.trim();
    if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
    else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;


    window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
  });
});

function isUrl(val = '') {
  if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
  return false;
};
