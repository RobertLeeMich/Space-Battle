/* 

You attack the first alien ship
If the ship survives, it attacks you
If you survive, you attack the ship again
If it survives, it attacks you again ... etc
If you destroy the ship, you have the option to attack the next ship or to retreat
If you retreat, the game is over, perhaps leaving the game open for further developments or options
You win the game if you destroy all of the aliens
You lose the game if you are destroyed

hull is the same as hitpoints. If hull reaches 0or less, the ship is destroyed
firepower is the amount of damage done to the hull of the target with a successful hit
accuracy is the chance between 0 and 1 that the ship will hit its target
Your spaceship, the USS Assembly should have the following properties:

hull - 20
firepower - 5
accuracy - .7
The alien ships should each have the following ranged properties determined randomly:

hull - between 3and 6
firepower - between 2and 4
accuracy - between .6and .8
You could be battling six alien ships each with unique values.

Example use of accuracy to determine a hit:

if (Math.random() < alien[0].accuracy) {
	console.log('You have been hit!');
}

You attack the first alien ship
If the ship survives, it attacks you
If you survive, you attack the ship again
If it survives, it attacks you again ... etc
If you destroy the ship, you have the option to attack the next ship or to retreat
If you retreat, the game is over, perhaps leaving the game open for further developments or options
You win the game if you destroy all of the aliens
You lose the game if you are destroyed

change the barbie code into the game? The most likely easiest thing to conclude here


//begin by making the actors

    Make 1 alienship object and repeat the fight 6 times with the same object.

    put methods in the ship object, not in individual objects. We don't need to overly complicate the code with multiple objects and keeping track of them, etc

code out one fight
display player HP
display alien HP
    code the accuracy of the shot (math.random)
    code the damage given from player (static accuracy stat)
    code the damage taken from player
    code the damage given from alien (using accuracy stat)
    code the damage taken from alien

//binding methods


*/

console.log('App is connected');

const bg = document.querySelector("body")

bg.style.backgroundImage = "url(spacebackground.jpeg)"

document.getElementById("retreat-slide").style.display = "none"

document.getElementById("disabling-div").style.display="none";

// Protagonist of our application
const playerShip = {
  name: 'USS Assembly',
  hull: 20,
  firepower: 20,
  accuracy: .7,
  // Element that will hold the game screen
  element: document.querySelector('#player-ship'),
  // Game Screen
  render: () => {
    document.getElementById("player-hp").innerHTML = `The USS Assembly's hull: ${playerShip.hull}` //this needs to be here to update the hull value every time it changes from an alien hit
    document.getElementById("alien-hp").innerHTML = `The alien ship's hull: ${alienShipN.hull}`
  }
}

class AlienShip {
  constructor(hull, firepower) {
    this.hull = Math.floor(Math.random() * (6 - 3) + 3)
    this.firepower = Math.floor(Math.random() * (4 - 2) + 2)
    this.accuracy = Math.random() * (0.9 - 0.1)
  }
}

let alienShipN = new AlienShip()

const alienShipNHp = document.getElementById("alien-hp").innerHTML = `The alien ship's hull: ${alienShipN.hull}`

const playerHp = document.getElementById("player-hp").innerHTML = `The USS Assembly's hull: ${playerShip.hull}`

const attackButton = document.getElementById("fire")

const retreatButton = document.getElementById("retreat-slide")

let counter = 0

attackButton.addEventListener("click", (event) => {

    const between = (x, min, max) => {
        return x >= min && x <= max
    }
    let y = Math.random() * (.9 - .1)
    let x = Math.random() * (.9 - .1)

  function fireSalvo(x) {
    if (between(x, .4, .7)) {
    console.log(x.toFixed(4))
    alienShipN.hull -= playerShip.firepower
    playerShip.render()
    alert(`You hit the alien ship!`)
    return true
    } else if (!between(x, .4, .7)) {
      alert(`You missed!`)
      playerShip.render()
      return false
      } 
  }
   
  let result = fireSalvo(x) //result automatically invokes fireSalvo(x) when the eventlistener is triggered on button press.

function alienSalvo(result, y) {
  if (result === false){ //fireSalvo() has returns for true and false
    if (between(y, .4, .7)){
      playerShip.hull -= alienShipN.firepower
      alert(`The aliens hit!`)
      playerShip.render()
        if (playerShip.hull <= 0){
          alert(`SNAAAAAAAKEEEEEEE!!! GAME OVER. Refresh to try again.`)
          document.getElementById("disabling-div").style.display="block";
          playerShip.render()
        } 
       } else if (!between(y, 0.4, 0.7)) {
        alert(`The aliens missed!`)
      }
    } else if (result === true){
      if (between(y, .4, .7)){
        playerShip.hull -= alienShipN.firepower
        alert(`The aliens hit!`)
      } else {
        alert(`The aliens missed!`)
      }
      playerShip.render()
    }
}

alienSalvo(result, y)

if (alienShipN.hull <= 0){ //this gets put outside because if it doesn't, the text shows up on the next button click instead of during the event when it happens (health is <= 0)
    document.getElementById("retreat-slide").style.display = "inline" //displaying the retreat button after a ship goes down
    alert(`You defeated an alien ship! Alien Ships defeated: ${counter += 1}`)
      if (counter === 6){
        alert(`Congratulations Commander, you've defended Earth from the aliens! YOU WIN! Refresh to play again.`)
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
  alert(`You have retreated back to Earth, let's hope the other fleets can pick up the slack. GAME OVER. Refresh to try again.`)
  document.getElementById("retreat-slide").classList.add('off-screen');
  document.getElementById("disabling-div").style.display='block'
})
//END OF RETREAT BUTTON EVENT LISTENER

//disabling div layered over every other element to disable webpage
//http://fczaja.blogspot.com/2009/02/disable-all-page-elements-with.html

/*
#retreat
{
  display: none; //no retreat button until after the first ship is dead
}

#disablingDiv
{
    Do not display it on entry 
    display: none; 

    Display it on the layer with index 1001.
       Make sure this is the highest z-index value
       used by layers on that page 
    z-index:1001;
    
    make it cover the whole screen 
    position: fixed; //previous was absolute, just see if this does anything later
    top: 0%; 
    left: 0%; 
    width: 100%; 
    height: 100%; 

    make it white but fully transparent
    background-color: white; 
    opacity:.00; 
    filter: alpha(opacity=00); 
}

//enable the div:
document.getElementById('disablingDiv').style.display='block';

//disable div:
   document.getElementById('disablingDiv').style.display='none';



*/


/*firing at alien

if the ship fires at an alien and meets the accuracy check, - hull from the alien, alert

if the ship misses the alien, alert

*/


// const workButton = document.getElementById('work');

// workButton.addEventListener('click', () => {
//   if (barbie.career) {
//     barbie.wallet += barbie.career.income; // WE updated the wallet that belongs to barbie so the object was changed
//     // the object control the information that is visible to us on the screen
//     // I want to re-render the content so that i can see the updated information in the browser
//     barbie.render();
//   } else {
//     alert('You are unemployed, get a job first');
//   }
// });

// const redBottoms = new Clothing(
//   'Red Bottoms',
//   'Christian Louboutin',
//   'black',
//   'stiletto',
//   'W7',
//   1200
// );

// const redBottomsBtn = document.getElementById('red-bottoms');

// redBottomsBtn.addEventListener('click', (evt) => {
//   if (barbie.wallet >= redBottoms.price) {
//     //buy the shoes
//     barbie.wardrobe.push(redBottoms);
//     barbie.wallet -= redBottoms.price;
//     // I want to re-render the content so that i can see the updated information in the browser
//     barbie.render();
//   } else {
//     alert("You ain't got enough, go get some Vans of the wall.");
//   }
// });

// const rentalBtn = document.getElementById('rental');

// rentalBtn.addEventListener('click', () => {
//   if (barbie.wallet >= 50000) {
//     //buy the property
//     barbie.career.income += 500;
//     barbie.wallet -= 50000;
//     barbie.render();
//     alert(
//       `You now own a rental property. This adds $500 to your current income. New Income: ${barbie.career.income}`
//     );
//   } else {
//     alert('Save up so more and come back later!');
//   }
// });

// const sellItemBtn = document.getElementById('sell-item');

// sellItemBtn.addEventListener('click', () => {
//   if (barbie.wardrobe.length) {
//     //removing the item from the wardrobe
//     const itemToBeSold = barbie.wardrobe.shift();

//     const randomPercent = Math.floor(Math.random() * (201 - 70) + 70);
//     // Calculating the sell price
//     const sellPrice = Math.floor((itemToBeSold.price * randomPercent) / 100);

//     // selling this item
//     barbie.wallet += sellPrice;
//     //render
//     barbie.render();
//   } else {
//     alert('There is nothing to sell. Wardrobe is empty.');
//   }
// });

// const getHired = document.getElementById('get-hired');
// const modal = document.getElementById('modal');

// getHired.addEventListener('click', () => {
//   if (modal.style.display === 'none') {
//     modal.style.display = 'flex';
//   } else {
//     modal.style.display = 'none';
//   }
// });

// const jobForm = document.getElementById('job-form');

// jobForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   const formValues = [];

//   for (let i = 0; i < jobForm.length - 1; i++) {
//     if (jobForm[i].value) {
//       formValues.push(jobForm[i].value);
//     }
//   }
//   console.log(formValues);

//   const gotTheJob = Math.floor(Math.random() * 101) >= 50;

//   if (gotTheJob && formValues.length === 3) {
//     const newCareer = new Career(...formValues);
//     newCareer.income = parseInt(newCareer.income);
//     barbie.career = newCareer;

//     getHired.style.display = 'none';
//     document.querySelector('#modal').style.display = 'none';
//     barbie.render();
//   } else {
//     if (formValues.length !== 3) {
//       alert(
//         'Please enter the rest of the information about the job before applying'
//       );
//     } else {
//       alert('Sorry but we found a better candidate. Better luck next time!');
//     }
//   }
// });

// // barbie.render();


