// Constants and variables
let biler = [];
let antalBiler = 0;
let fpsUpdateInterval = 10; // Update FPS every 30 frames
let frameCounter = 0; // Counter to track frames
let lastFPS = 0; // Variable to store the last calculated FPS
let bilAfstand = -100;
let maxSpeed = 1;
let width = screen.width;
let startSted = width/4;


// User can choose number of cars
let userInput = prompt("Antal biler: ");
if (userInput === null || isNaN(userInput) || userInput === "") {
  antalBiler = 20;  // Invalid input = 20 cars
} else {
  antalBiler = parseInt(userInput);
}

function setup() {
  const myCanvas = createCanvas(width, 400);
  myCanvas.parent("canvas");
  frameRate(60); 
  strokeWeight(2); 

  // Create cars based on antalBiler variable
  for (let i = 0; i < antalBiler; i++) {
    let farve = (i === 0) ? "silver" : (i === 1) ? "gold" : "blue";  // Forskellige farver
    let position = createVector(bilAfstand * i, 170);  // Placer biler med afstand
    let hastighed = createVector(maxSpeed, 0);
    biler.push(new Car(farve, position, hastighed));  // Tilføj bil til arrayet
  }
}

function draw() { // This function runs constantly
  background("#247B28");

  for (let i = 0; i < biler.length; i++) {
    biler[i].update();  // Update car
    if (i > 0) {
      biler[i].tjekBilForan(biler[i-1]);  // Check if car in front is too close
    }
  }

  if(biler[0].velocity.x < maxSpeed) { // If the car is not at max speed, increase speed
    biler[0].velocity.x *= 1.005;
  }
  
  fill(240);
  rect(-10, height/2-20, width+10, 60); // Draw road

  for (let i = 0; i < biler.length; i++) {
    biler[i].display();
  }

  // This section enables displaying of car information.
  // Here HTML text elements are imported (these text elements displat the car info)
  const allSpeedsElement = document.getElementById("allSpeeds");
  const StoppedCarsElement = document.getElementById("StoppedCars");
  const CompletedCarsElement = document.getElementById("CarsRight"); // Number of cars that are outside of the screen to the right
  const AwaitingCarsElement = document.getElementById("CarsLeft"); // Number of cars that are outside of the screen to the left
  allSpeedsElement.innerHTML = ""; // Ryd listen
  StoppedCarsElement.innerHTML = ""; // Ryd P
  
  // Count how many cars are stopped and outside the screen.
  const stoppedCarsCount = biler.filter(bil => bil.velocity.x < 0.25).length;
  const completedCarsCount = biler.filter(bil => bil.position.x >= width).length;
  const awaitingCarsCount = biler.filter(bil => bil.position.x <= 0).length;

  // Display the count of stopped cars and cars outside the screen
  StoppedCarsElement.textContent = "Stoppede biler: " + stoppedCarsCount;
  CompletedCarsElement.textContent = "Biler der er kommet igennem: " + completedCarsCount;
  AwaitingCarsElement.textContent = "Biler der ikke er kommet ind på banen endnu: " + awaitingCarsCount;
  
  // Show slow/stopped cars as red
  biler.forEach((bil, index) => {
    const li = document.createElement("li");
    li.textContent = `Bil${index+1}: ${bil.velocity.x.toFixed(2)}`;
    if (bil.velocity.x < 0.5) {
      li.style.backgroundColor = "#ff0000";
    }
    if (bil.velocity.x > 1) {
      li.style.backgroundColor = "#00ff00";
    }
    allSpeedsElement.appendChild(li);
  });


  // This section enables the user to see FPSs
  if (frameCounter % fpsUpdateInterval === 0) {
    lastFPS = frameRate().toFixed(0); // Update the stored FPS value
  }

  // Display the last calculated FPS on the screen
  fill(255);
  textSize(16);
  text(`FPS: ${lastFPS}`, 10, 20); // Show FPS in the top-left corner
  frameCounter++; // Increment the frame counter
}

// Register key presses
function keyPressed(){
  if(key === 'a') //stop bil -0.2
    biler[0].velocity.x -= 0.2;
  if(key === 'd') //start bil +0.2
    biler[0].velocity.x += 0.2;
  if(key === 's') //stop bil
    biler[0].velocity.x = 0;
  if(key === 'w') //start bil
    biler[0].velocity.x = 1;
  if(key === 'l'){
    for (let i = 0; i < biler.length; i++) 
      biler[i].position.x += startSted;
    }
  if(key === 'k'){
    for (let i = 0; i < biler.length; i++) 
      biler[i].position.x -= startSted;
    }
  if(key === 'i'){
    for (let i = 0; i < biler.length; i++) {
      biler[i].position.x = bilAfstand * i; // Reset each car's position
      biler[i].velocity.x = maxSpeed; // Optionally reset the speed to maxSpeed
    }
  }
  if(key == 'r') { //animation af kø
    let velocity = 1; //start fart
    let minFart = 0.4; //Den laveste fart som bilen når
    let deceleration = 0.2; //Hvor meget bilen decelererer
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
      if (velocity >= maxSpeed) {
        velocity = maxSpeed; // Stop farten ved 0
        clearInterval(intervalIdb); // Stop intervallet når farten når 0
      }
      biler[0].velocity.x = velocity; // Opdater bilens fart
    }, accelerationInterval); // Efter 5 sekunder
  }
}
