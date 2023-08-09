//The added elements weren't listed bonuses, but I: 
//added a YouTube video that begins at a certain time, and ends and fades out at a certain timestamp
//and I added an SVG/bent text using a URL reference in the HTML and styled it using CSS. I did have to get "generic SVG" code for this since I was too lazy to make one myself on my home PC in Photoshop, then transfer it to the Mac, etc. Luckily W3Schools has a hosted SVG that works.
//And if you look really hard, a few memes

//I'm still getting a handle on "what elements should be styled in js vs css", but I think I did pretty well here if I do say so myself. I did add a "Play Again" button though, I know that was in the bonus objectives. 

//I am aware of the lack of loops, but honestly I couldn't even tell you what I would need a loop for here. Unless you wanted the player and alien constantly firing back and forth until one was dead, and then pressing the button again to start another loop? But I felt like no loops were needed here since it feels better to give the player more control over attacking in general in my opinion.

//Sometimes the YouTube video flickers in and then out and nothing happens, I attempted to troubleshoot it for a couple days on and off but I couldn't get it working quite right. However it's kind of an edge case since I would expect the player to watch the video each time versus just spamming the button, and it only happens on running quickly through the prompts and pushing the button.

//I tested functionality of everything I could think of to the best of my ability, but I still need to learn where errors can happen in general and error handling, but it should run just fine and meet the assignment requirements.

console.log('App is connected');

//selectors and variable assignments for use later

const body = document.querySelector("body")

body.style.backgroundImage = "url(spacebackground.jpeg)"

document.querySelector(".retreat").style.display = "none"

document.querySelector("#neon-button").style.display = "none"

// document.getElementById("disabling-div").style.display="none"; //leaving this here for posterity

document.getElementById("player").style.display = "none"

const attackButton = document.getElementById("fire")

const retreatButton = document.querySelector(".retreat")

const playAgain = document.querySelector("#neon-button")

//custom iframe from youtube's API docs and some googling for setting custom timestamps
let player;

function onYouTubeIframeAPIReady() {
    console.log("YOUTUBE API READY")
  player = new YT.Player('player', {
    height: '250',
    width: '550',
    videoId: '_wOWQb3hAFE',
    events: {
        'onReady': onPlayerReady,
        "resetVideoToTime": resetVideoToTime
    },
    playerVars: {
        enablejsapi: 1,
        autoplay: 1,
        loop: 0,
        controls: 1,
        showinfo: 0,
        autohide: 1,
        modestbranding: 1
    }
    
    
  });
  }  

function onPlayerReady(event) {
    event.target.playVideo()
    player.mute()
  }
function resetVideoToTime() {
    player.seekTo(937, true)
}

//bouncing image code
window.onload = function() { //runs this code onload rather than before any load. <script> at the bottom of the HTML serves the same purpose, but it didn't work without this
const images = ["spacedoge1.jpeg", "spacedoge2.webp", "spacedoge3.jpeg", "spacedoge4.png"] //array of images

const img = document.getElementById("bouncing-image") //selecting div
img.src = images[Math.floor(Math.random() * images.length)] //setting random images to show
img.style.width = "35%"
img.style.position = "absolute"
img.style.zIndex = -1
img.style.opacity = 0.2

let x = 0;//}
let y = 0;//setting the speed of the div to bounce/move//keeping track of the position of the image
let xSpeed = 3;
let ySpeed = 2;//}

function animate() { //setting up moving the image around the screen
    let width = window.innerWidth - img.offsetWidth //these two lines set the maximum that the image can move without going off of the edge of the screen
    let height = window.innerHeight - img.offsetHeight

    x += xSpeed; //these two lines update the x and y based on the speed variables
    y += ySpeed;

    if (x > width || x < 0) { //these two lines and the below two lines check if the image has hit the edge of the screen, if so it reverses xSpeed and ySpeed by negating them
        xSpeed = -xSpeed;
    }

    if (y > height || y < 0) {
        ySpeed = -ySpeed;
    }

    img.style.left = x + 'px' //sets the left and top properties to new positions
    img.style.top = y + 'px'

    requestAnimationFrame(animate) //schedules the next frame of the animation
}
animate() //calls the animate function above
}

// Protagonist of our application
const playerShip = {
  name: 'USS Assembly',
  hull: 20,
  firepower: 5,
  accuracy: .7,
  // Element that will hold the game screen
  element: document.querySelector('#player-ship'),
  // Game Screen
  render: () => {
    document.getElementById("player-hp").innerHTML = `The USS Assembly's hull: ${playerShip.hull}` //this needs to be here to update the hull value every time it changes from an alien hit
    document.getElementById("alien-hp").innerHTML = `The alien ship's hull: ${alienShipN.hull}`
  }
}
//I chose poorly for naming the above element/object, but at this point I'm done after working on this for 3 days this week and I'm not changing it, I'll do better next time

//Enemy code that gets instantiated
class AlienShip {
    constructor() {
      this.hull = Math.floor(Math.random() * (6 - 3) + 4) //verified hull can be between 6 and 3
      this.firepower = Math.floor(Math.random() * (4 - 2) + 2)//verified firepower can be between 4 and 2
      this.accuracy = Math.random() * (0.9 - 0.1)
    }
  }

  //selecting elements. I also just realized I don't use playerHP in the code anywhere, I use playerShip.hull. Ah well.
let alienShipN = new AlienShip()

const alienShipNHp = document.getElementById("alien-hp").innerHTML = `The alien ship's hull: ${alienShipN.hull}`

const playerHp = document.getElementById("player-hp").innerHTML = `The USS Assembly's hull: ${playerShip.hull}`

//counter for use later to count dead aliens
let counter = 0

//event listener for the attack button
attackButton.addEventListener("click", (event) => {

    const between = (x, min, max) => {
        return x >= min && x <= max
    }
    let y = Math.random() * (.9 - .1)
    let x = Math.random() * (.9 - .1)

    let checkInterval;

    //Function that tracks a bunch of stuff for the player and triggers the YouTube video on hit
  function fireSalvo(x) {
    if (between(x, .4, .7)) {
        // console.log(x.toFixed(4))
        alienShipN.hull -= playerShip.firepower
        alert(`You hit the alien ship!`)
        if (alienShipN.hull <= 0){
          retreatButton.style.display = "none"
        }

        //YouTube video
        let playerDiv = document.getElementById("player")
        playerDiv.style.display = "block"
        playerDiv.style.opacity = "1"
        resetVideoToTime()
        player.playVideo()

        //Code for setting the video to a certain time and play for a certain duration
        setTimeout(function() { //wrapping the polling function in a timeout to give the API time to load, or else the video sometimes doesn't work.
          checkInterval  = setInterval(function() { //polling the video for the specific timestamp

            if (player.getCurrentTime() >= 944){
                playerDiv.style.opacity = 0;
                setTimeout(() => {
                    playerDiv.style.display = "none"
                    resetVideoToTime()
                }, 2000);               
                clearInterval(checkInterval)
            }
        }, 1000)
      }, 2500);
    playerShip.render()
    return true
      //If we miss the shot (And also if we continue fighting, the retreat button goes away)

    } else if (!between(x, .4, .7)) {
      alert(`You missed!`)
      if (alienShipN.hull > 0){
        retreatButton.style.display = "none"
      }
      playerShip.render()
      return false
      } 
  }

  let result = fireSalvo(x) //result automatically invokes fireSalvo(x) when the eventlistener is triggered on button press.

  //The aliens fire back, results happen based on t or f out of fireSalvo
function alienSalvo(result, y) {
  if (!result){ //fireSalvo() has returns for true and false
    if (between(y, .4, .7)){
      playerShip.hull -= alienShipN.firepower
      alert(`The aliens hit!`)
      playerShip.render()
        if (playerShip.hull <= 0){
          alert(`SNAAAAAAAKEEEEEEE!!! GAME OVER.`)
          const btnContainer = document.querySelector("#button-container")
          btnContainer.style.justifyContent = "center"
          playAgain.style.display = "inline"
          attackButton.style.display = "none"
          // document.getElementById("disabling-div").style.display="block"; //leaving this here for posterity
          playerShip.render()
        } 
       } else if (!between(y, 0.4, 0.7)) {
        alert(`The aliens missed!`)
      }
    } else {
      if (between(y, .4, .7)){
        playerShip.hull -= alienShipN.firepower
        alert(`The aliens hit!`)
        playerShip.render()
      } else {
        alert(`The aliens missed!`)
      }
    }
}

alienSalvo(result, y) //calling aliensalvo to trigger after the player's function

if (alienShipN.hull <= 0){ //this gets put outside because if it doesn't, the text shows up on the next button click instead of during the event when it happens (hull health is <= 0)
    document.querySelector(".retreat").style.display = "inline" //displaying the retreat button after a ship goes down
    alert(`You defeated an alien ship! Alien Ships defeated: ${counter += 1}`) //uses the counter var to determine if statement
      if (counter === 6){
        alert(`Congratulations Commander, you've defended Earth from the aliens! YOU WIN!`)
        const btnContainer = document.querySelector("#button-container")
        btnContainer.style.justifyContent = "center"
        playAgain.style.display = "block"
        retreatButton.style.display = "none"
        attackButton.style.display = "none"
        playerShip.render()
      } else {
        alienShipN = new AlienShip() //calling alienShipN because that's automatically assigned to creating new ships to generate a new ship for the user to fight
        alert(`All hands, theres a new alien ship incoming!`)
        playerShip.render()
      }
}
})
//END OF FIRE BUTTON EVENT LISTENER

retreatButton.addEventListener("click", (event) => {
  alert(`You have retreated back to Earth, let's hope the other fleets can pick up the slack. GAME OVER.`)
  const btnContainer = document.querySelector("#button-container")
  btnContainer.style.justifyContent = "center"
  playAgain.style.display = "block"
  retreatButton.style.display = "none"
  attackButton.style.display = "none"
  // document.getElementById("disabling-div").style.display="block" //leaving this here for posterity
})
//END OF RETREAT BUTTON EVENT LISTENER

playAgain.addEventListener("click", (event) => {
  document.location.reload()
  return false
})

// attackButton.addEventListener("click", (e) => {
//   if (playerShip.hull <= 0 || counter === 6) {
//     document.getElementById("fire").setAttribute("disabled", "true");
//   } else {
//     document.getElementById("fire").removeAttribute("disabled");
//   }
// })

// retreatButton.addEventListener("click", (e) => {
//   if (playerShip.hull <= 0 || counter === 6) {
//     document.querySelector(".retreat").setAttribute("disabled", "true");
//   } else {
//     document.querySelector(".retreat").removeAttribute("disabled");
//   }
// })

//I may come back to this project in the future and spruce it up a bit
//ideas: replace ship image with damaged ship image when alien hp reaches a certain number + lower player damage. Replace with new alien ship image when next one is instantiated
//cycle alien ship images from a random array of images for each instantiation
//image of player ship maybe? //DONE
//when player pushes the attack button, have a video play of missiles hitting something in space + alert //DONE
//when player pushes flee, have a video showing a ship going fast/into hyperspace/whatever + alert
//pull random section of video for each alien kill would be cool
//OR have a random phrase show up on screen like "pwnt" or "this is what you just did to that alien" etc when the video shows up
//OOOOOR BOTH???
