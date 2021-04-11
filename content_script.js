
console.log('listening')
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  const messages = Array.from(document.querySelectorAll('li.message')).map( li => {
      const date =   li.querySelector('.date').textContent.trim()
      const type = li.querySelector('.type').textContent.trim()
      const title = li.querySelector('.title').textContent.trim()
      const link = li.querySelector('.buttonPDF1 a').href
      return {date, type, title, link}
  })
  sendResponse({messages})
})


