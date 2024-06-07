const healthProgress = document.querySelectorAll(".health")
const moneyDiv = document.querySelector(".money")
const attackBtn = document.querySelector(".attackButton")
const potion = document.querySelector(".centerConsole img")
const monsterImg = document.querySelector(".monsterImg")
const gameStates = document.querySelectorAll(".gameState")
const playerImages = document.querySelector('.playerImages')
const start = document.querySelector('.start')
const playAgain = document.querySelector(".playAgain")
const playerImageItem = document.querySelector('.playerImageItem')
const weapons = document.querySelectorAll(".weapons img")
const gameLog = document.querySelector(".gameLog")

const playerImagesArr = [
    "https://thumbs.dreamstime.com/b/businessman-pixel-art-isolated-white-background-office-man-suitcase-game-style-illustration-worker-vector-design-86620061.jpg",
    "https://images.vexels.com/media/users/3/246493/isolated/preview/a6d3080bcd1c086538b7f756b5638238-business-man-pixel-art.png",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/53757d09-c298-41e6-a97e-ad2da6e8b12b/d8r5sh3-5a055c3c-237f-48de-8004-ef5209806cd2.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzUzNzU3ZDA5LWMyOTgtNDFlNi1hOTdlLWFkMmRhNmU4YjEyYlwvZDhyNXNoMy01YTA1NWMzYy0yMzdmLTQ4ZGUtODAwNC1lZjUyMDk4MDZjZDIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.WwV0A91ULRynDLhrNuAGK9qJVCSpK7Hmgkng6tWxTEc"
]
const monsters = [
    "https://img.freepik.com/premium-vector/cartoon-monster-pixel-design_61878-706.jpg",
    "https://img.freepik.com/premium-vector/cartoon-monster-pixel-design_61878-707.jpg",
    "https://img.freepik.com/premium-vector/cartoon-monster-pixel-design_61878-714.jpg",
    "https://thumbs.dreamstime.com/b/monster-vector-illustration-cartoon-pixel-design-123739813.jpg",
    "https://img.freepik.com/premium-vector/cartoon-monster-pixel-design_61878-709.jpg",
    "https://as1.ftcdn.net/v2/jpg/02/16/78/00/1000_F_216780020_gvByEMK8fkVBBvg3VeXfvoQn5Y9PAy9h.jpg",
    "https://img.freepik.com/premium-vector/cartoon-monster-pixel-design_61878-708.jpg",
]

let playerImage = ""
let weaponSelected = "sword"
let playerHp = 100
let monsterHp = 100
let money = 0

const rnd = (num) => Math.round(Math.random() * num)
const updateHtml = () => {
    healthProgress[0].style.width = playerHp + "%"
    healthProgress[1].style.width = monsterHp + "%"
    moneyDiv.innerHTML = "Money: " + money
}

///// APPEND PLAYER IMAGES - SELECT PLAYER IMAGE /////
for (const imageUrl of playerImagesArr) {
    const img = document.createElement("img")
    img.src = imageUrl

    img.onclick = () => {
        playerImage = imageUrl
        playerImageItem.src = imageUrl

        const allImages = document.querySelectorAll(".playerImages img")
        allImages.forEach(singleImg => singleImg.className = "")

        img.className = "selected"
    }

    playerImages.appendChild(img)
}

////// START GAME /////
start.onclick = () => {
    if (!playerImage) return alert("select image please")

    gameStates[0].classList.remove("d-flex")
    gameStates[0].classList.add("d-none")

    gameStates[1].classList.remove("d-none")
    gameStates[1].classList.add("d-flex")
}

///// GAME OVER LOGIC /////
function gameOver() {
    gameLog.innerHTML = ""
    gameStates[1].classList.remove("d-flex")
    gameStates[1].classList.add("d-none")

    gameStates[2].classList.remove("d-none")
    gameStates[2].classList.add("d-flex")

    playerImage = ""
    playerHp = 100
    monsterHp = 100
    money = 0

    updateHtml()
}

////// PLAY AGAIN /////
playAgain.onclick = () => {
    gameStates[2].classList.remove("d-flex")
    gameStates[2].classList.add("d-none")

    gameStates[0].classList.remove("d-none")
    gameStates[0].classList.add("d-flex")
}

//// GAME LOG LOGIC ////

function logData(info) {
    gameLog.innerHTML += `<div>
        Player damage: ${info.playerDamage} <br>
        Monster Damage: ${info.monsterDamage}  <br>
        Player Hp Left: ${info.playerHpLeft} <br>
        Monster Hp Left: ${info.monsterHpLeft}  <br>
        Player weapon: ${info.playerWeapon}  <br>
        Weapon Effect: ${info.weaponEffect}  <br>
        Money Got: ${info.playerMoneyGot} 
        <div class="border"></div>
    </div>`
}

///// ATTACK //////
attackBtn.onclick = () => {
    const playerDamage = rnd(10)
    const monsterDamage = rnd(8)

    let logInfo = {
        playerDamage: 0,
        monsterDamage: 0,
        playerWeapon: "",
        monsterHpLeft: 0,
        playerHpLeft: "",
        weaponEffect: "",
        playerMoneyGot: 0
    }
    let moneyGol = rnd(5)
    money += moneyGol

    monsterHp -= playerDamage
    playerHp -= monsterDamage

    let chance = rnd(100)

    if (weaponSelected === "sword" && chance <= 25) {
        playerHp += monsterDamage
        logInfo.weaponEffect = "Dodge works"
    }

    if (weaponSelected === "bow" && chance <= 30) {
        monsterHp -= playerDamage
        logInfo.weaponEffect = "Double damage works"

    }

    if (weaponSelected === "wand" && chance <= 40) {
        playerHp += rnd(8)
        logInfo.weaponEffect = "Heal works"
    }


    if (monsterHp <= 0) {
        monsterImg.src = monsters[rnd(monsters.length - 1)]
        monsterHp = 100
    }


    logInfo.playerDamage = playerDamage
    logInfo.monsterDamage = monsterDamage
    logInfo.playerHpLeft = playerHp
    logInfo.monsterHpLeft = monsterHp
    logInfo.playerMoneyGot = moneyGol
    logInfo.playerWeapon = weaponSelected

    logData(logInfo)

    if (playerHp <= 0) {
        return gameOver()
    }
    updateHtml()

}

//// POTION //////
potion.onclick = () => {
    if (money >= 50) {
        money -= 50
        playerHp = 100
        updateHtml()
    }
}


//// WEAPON SELECT /////
weapons[0].onclick = () => {
    weaponSelected = "sword"
    weapons[1].classList.remove("selected")
    weapons[2].classList.remove("selected")

    weapons[0].classList.add("selected")
}
weapons[1].onclick = () => {
    weaponSelected = "bow"
    weapons[0].classList.remove("selected")
    weapons[2].classList.remove("selected")

    weapons[1].classList.add("selected")
}
weapons[2].onclick = () => {
    weaponSelected = "wand"
    weapons[0].classList.remove("selected")
    weapons[1].classList.remove("selected")

    weapons[2].classList.add("selected")
}
