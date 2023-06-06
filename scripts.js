/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "ecosia"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"b3vqXFa0yac26waW","label":"Reddit","bookmarks":[{"id":"2B3wRLVAQBdwmasu","label":"r/voidlinux","url":"https://www.reddit.com/r/voidlinux/"},{"id":"AyesxBmzV8ZXZuRR","label":"r/unixporn","url":"https://www.reddit.com/r/unixporn/"},{"id":"5dmwxQmST5lqBjwl","label":"r/battlestations","url":"https://www.reddit.com/r/battlestations/"},{"id":"ML1ZWeUI2uJWiqRA","label":"r/ErgoMechKeys","url":"https://www.reddit.com/r/ErgoMechKeyboards/"}]},{"id":"tKBK3mTIqfdHFM9e","label":"Social","bookmarks":[{"id":"SPY4GvQneBMGpYYJ","label":"artfol","url":"https://www.artfol.co/home"},{"id":"LIr4gS3DQLjF4VOK","label":"youtube","url":"https://www.youtube.com/"},{"id":"xAI3D0w4TNWraUpU","label":"instagram","url":"https://www.instagram.com/"},{"id":"m4wCgIiqdIDNMper","label":"pinterest","url":"https://www.pinterest.com/"}]},{"id":"khtnyFww5z35woZk","label":"Blender","bookmarks":[{"id":"eoJJnALtg2a4dPnY","label":"blend_artists","url":"https://blenderartists.org/"},{"id":"OkqnOa5LpQWdcVpd","label":"blend_nation","url":"https://www.blendernation.com/"},{"id":"7A8Vfq5tsAkrpROd","label":"blend_reddit","url":"https://www.reddit.com/r/blender/"},{"id":"p9ksrHW3rfe3f5rI","label":"blend_market","url":"https://blendermarket.com/"}]},{"id":"S156GnY7lFSdtxwZ","label":"Tech","bookmarks":[{"id":"hva3UxNifEfogFNx","label":"builds.gg","url":"https://builds.gg/"},{"id":"Qn8r51XLcykU67aL","label":"ltt_media","url":"https://www.youtube.com/@LinusTechTips"},{"id":"v27fKwCsjSw69WDU","label":"newegg","url":"https://www.newegg.com/"},{"id":"sh8gZBKnoSVAk1nC","label":"amazon","url":"https://www.amazon.com/"}]},{"id":"WSvmht7Yx0qYuqNz","label":"Misc","bookmarks":[{"id":"YEYimXyUwyo1AS4U","label":"proton_mail","url":"https://mail.proton.me/u/0/inbox"},{"id":"Opf0JvgpcXO1EV09","label":"simple_login","url":"https://app.simplelogin.io/dashboard/"},{"id":"yArJEMyV16baDaqf","label":"bedrocklinux","url":"https://bedrocklinux.org/"},{"id":"YsJHzGpjQeMtvRKO","label":"archlinux","url":"https://wiki.archlinux.org/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
