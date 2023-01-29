const downArrow = '<i class="fa-solid fa-arrow-down-a-z"></i>'
const upArrow = '<i class="fa-solid fa-arrow-up-a-z"></i>'

const cardTemlate = document.querySelector("[data-card-temlate]")
const cardContainer = document.querySelector(".DivCountries")
const countriesOrderedAZ = getCountriesDown()
const countriesOrderedZA = getOrderedUp()

DisplayOrderByAZ()

const pInfo = document.querySelector(".totalN")
const btnStartW = document.querySelector(".btnStartW")
const btnContains = document.querySelector(".btnContains")
const btnOrder = document.querySelector(".btnOrderBy")
const inputText = document.querySelector(".inputS")

pInfo.textContent += " " + countries.length
//---------------------------------
btnOrder.addEventListener("click", () => {
  if (btnOrder.dataset.direction == "AZ") {
    btnOrder.style.backgroundColor = "rgb(49, 0, 133)"
    btnOrder.innerHTML = upArrow
    btnOrder.dataset.direction = "ZA"
    DisplayOrderByZA()
  } else {
    btnOrder.dataset.direction = "AZ"
    btnOrder.style.backgroundColor = "rgb(95, 28, 211)"
    btnOrder.innerHTML = downArrow
    DisplayOrderByAZ()
  }
})
//---------------------------------
btnStartW.addEventListener("click", onStartW)
btnContains.addEventListener("click", onContains)
//---------------------------------
inputText.addEventListener("input", (e) => {
  const allCards = cardContainer.querySelectorAll(".card")
  const feed = document.querySelector(".feed")
  if (inputText.dataset.search == "starts") {
    const inPut = e.target.value.toLowerCase()
    let numberOf = 0
    for (const card of allCards) {
      const textInCard = card
        .querySelector(".headerC")
        .textContent.toLowerCase()

      const startOftext = textInCard.slice(0, inPut.length)
      const isInvisible = inPut != startOftext
      card.classList.toggle("hide", isInvisible)
      if (!isInvisible) {
        numberOf++
      }

      if (inPut != "") {
        const spanContain = document.createElement("span")
        spanContain.textContent = e.target.value
        const spanNumber = document.createElement("span")
        spanNumber.textContent = numberOf.toString()
        spanContain.style.fontStyle = "italic"
        spanContain.style.color = "orange"

        spanNumber.style.fontStyle = "italic"
        spanNumber.style.color = "green"

        feed.textContent = `Countries starting with `
        feed.append(spanContain)
        feed.innerHTML = feed.innerHTML + " are "
        feed.append(spanNumber)
      } else {
        feed.innerHTML = ""
      }
    }
  } else if (inputText.dataset.search == "contains") {
    const inPut = e.target.value
    let numberOf = 0
    for (const card of allCards) {
      const textInCard = card
        .querySelector(".headerC")
        .textContent.toLowerCase()
      const isInvisible = !textInCard.includes(inPut)
      card.classList.toggle("hide", isInvisible)
      if (!isInvisible) {
        numberOf++
      }
    }
    if (inPut != "") {
      const spanContain = document.createElement("span")
      spanContain.textContent = e.target.value
      const spanNumber = document.createElement("span")
      spanNumber.textContent = numberOf.toString()
      spanContain.style.fontStyle = "italic"
      spanContain.style.color = "orange"

      spanNumber.style.fontStyle = "italic"
      spanNumber.style.color = "green"

      feed.textContent = `Countries containing `
      feed.append(spanContain)
      feed.innerHTML = feed.innerHTML + " are "
      feed.append(spanNumber)
    } else {
      feed.innerHTML = ""
    }
  }
})
//---------------------------------
function onStartW() {
  if (btnStartW.dataset.active == "false") {
    btnStartW.dataset.active = "true"
    btnContains.dataset.active = "false"
    btnContains.style.backgroundColor = "rgb(95, 28, 211)"
    btnStartW.style.backgroundColor = "rgb(49, 0, 133)"
    inputText.dataset.search = "starts"
  }
}
//---------------------------------
function onContains() {
  if (btnContains.dataset.active == "false") {
    btnContains.dataset.active = "true"
    btnStartW.dataset.active = "false"
    btnStartW.style.backgroundColor = "rgb(95, 28, 211)"
    btnContains.style.backgroundColor = "rgb(49, 0, 133)"
    inputText.dataset.search = "contains"
  }
}
//---------------------------------
function getCountriesDown() {
  const example = countries.slice()
  const orderedCountries = example.sort((a, b) => {
    if (a > b) {
      return 1
    }
    if (b > a) {
      return -1
    }
    return 0
  })
  return orderedCountries
}
//---------------------------------
function DisplayOrderByAZ() {
  cardContainer.innerHTML = ""
  for (const country of countriesOrderedAZ) {
    const card = cardTemlate.content.cloneNode(true).children[0]
    const cardHeader = card.querySelector(".headerC")
    cardHeader.textContent = country
    cardContainer.appendChild(card)
  }
}
//---------------------------------
function DisplayOrderByZA() {
  cardContainer.innerHTML = ""
  for (const country of countriesOrderedZA) {
    const card = cardTemlate.content.cloneNode(true).children[0]
    const cardHeader = card.querySelector(".headerC")
    cardHeader.textContent = country
    cardContainer.appendChild(card)
  }
}
//---------------------------------
function getOrderedUp() {
  const exampleCountries = countries.slice()
  const orderedCountries = exampleCountries.sort((a, b) => {
    if (a > b) {
      return -1
    }
    if (b > a) {
      return 1
    }
    return 0
  })

  return orderedCountries
}
