let biler = [];
let antalBiler = 0;


let userInput = prompt("Antal biler: ");
if (userInput === null || isNaN(userInput) || userInput === "") {
  antalBiler = 20;  // Set default to 20 if the input is invalid or canceled
} else {
  antalBiler = parseInt(userInput);
}

let width = screen.width;


function setup() {
  createCanvas(width, 400);
  frameRate(60); 
  strokeWeight(2); 

  // Opret biler baseret på antalBiler
  for (let i = 0; i < antalBiler; i++) {
    let farve = (i === 0) ? "silver" : (i === 1) ? "gold" : "blue";  // Forskellige farver
    let position = createVector(-75 * i+1000, 200);  // Placer biler med afstand
    let hastighed = createVector(1, 0);
    biler.push(new Car(farve, position, hastighed));  // Tilføj bil til arrayet
  }
}

function draw() {
  background("#247B28");

  for (let i = 0; i < biler.length; i++) {
    biler[i].update();  // Opdater bilen
    if (i > 0) {
      biler[i].tjekBilForan(biler[i-1]);  // Tjek om bilen foran er for tæt på
    }
  }

  if(biler[0].velocity.x < 1)
    biler[0].velocity.x *= 1.005;
  
  fill(240);
  rect(-10, height/2-20, width+10, 60);

  for (let i = 0; i < biler.length; i++) {
    biler[i].display();
  }

  const allSpeedsElement = document.getElementById("allSpeeds");
  const StoppedCarsElement = document.getElementById("StoppedCars");
  allSpeedsElement.innerHTML = ""; // Ryd listen
  StoppedCarsElement.innerHTML = ""; // Ryd P
  
  // Count how many cars are stopped
  const stoppedCarsCount = biler.filter(bil => bil.velocity.x === 0).length;
  
  // Display the count of stopped cars
  StoppedCarsElement.textContent = "Stoppede biler: " + stoppedCarsCount;

  
  biler.forEach((bil, index) => {
    const li = document.createElement("li");
    li.textContent = `Bil${index+1}: ${bil.velocity.x.toFixed(2)}`;
    if (bil.velocity.x < 0.5) {
      li.style.backgroundColor = "#ff0000";
    }
    allSpeedsElement.appendChild(li);
  });
}

function keyPressed(){
  if(key === 'a') //stop bil -0.2
    biler[0].velocity.x -= 0.2;
  if(key === 'd') //start bil +0.2
    biler[0].velocity.x += 0.2;
  if(key === 's') //stop bil
    biler[0].velocity.x = 0;
  if(key === 'w') //start bil
    biler[0].velocity.x = 1;
  if(key == 'r') { //animation af kø
    let velocity = 1; //start fart
    let minFart = 0.4; //Den laveste fart som bilen når
    let deceleration = 0.1; //Hvor meget bilen decelererer
    let acceleration = 0.1; //Hvor meget bilen accelererer
    let accelerationInterval = 120; //Hvor hurtigt bilen starter
    let decelerationInterval = 30; //Hvor hurtigt bilen stopper

    const intervalIda = setInterval(() => {
      velocity -= deceleration; // Reducer farten
      if (velocity <= minFart) {
        velocity = minFart; // Stop nedsænkning
        clearInterval(intervalIda); // Stop intervallet når farten når 0
      }
      biler[0].velocity.x = velocity; // Opdater bilens fart
    }, decelerationInterval); // Kør hver x ms

    const intervalIdb = setInterval(() => {
      velocity += acceleration; // Reducer farten
      if (velocity >= 1) {
        velocity = 1; // Stop farten ved 0
        clearInterval(intervalIdb); // Stop intervallet når farten når 0
      }
      biler[0].velocity.x = velocity; // Opdater bilens fart
    }, accelerationInterval); // Efter 5 sekunder
  }
}
