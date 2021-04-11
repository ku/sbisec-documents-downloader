
chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    "title": "書面をダウンロード",
    "id": "sbidid",
    "contexts": ["all"],
    'documentUrlPatterns': [
      'https://sbisec.postub.mypot.jp/web/*'
    ]
  });

  chrome.contextMenus.onClicked.addListener( function (clickInfo, tab) {
    console.log(clickInfo, tab)

    chrome.tabs.sendMessage(tab.id, {}, (response) => {
      const origin = "https://sbisec.postub.mypot.jp"

      response.messages.forEach( message => {

        const components = message.link.split("'")

        const path = components[1]
        const id = components[3]

        const url = `${origin}${path}?message_no=${id}`
        const option = (Object.assign(message, {url}))

        const date = message.date.replace(/\//g, '')
        const filename = `${message.type}/${date}-${message.title}.pdf`

        chrome.downloads.download({
          filename,
          url
        })
      })
    })
  })
});

