let biler = [];  
let antalBiler = 7;  

function setup() {
  createCanvas(800, 400);
  frameRate(50); 
  strokeWeight(2);

  // Opret biler baseret på antalBiler
  for (let i = 0; i < antalBiler; i++) {
    let farve = (i === 0) ? "silver" : (i === 1) ? "gold" : "blue";  // Forskellige farver
    let position = createVector(-75 * i, 200);  // Placer biler med afstand
    let hastighed = createVector(1, 0);
    biler.push(new Car(farve, position, hastighed));  // Tilføj bil til arrayet
  }
}

function draw() {
  background("#247B28");
    
<<<<<<< HEAD
  bil1.update();
  bil2.update();
  bil3.update();
  bil4.update();
  bil5.update();
  bil2.tjekBilForan(bil1);
  bil3.tjekBilForan(bil2);
  bil4.tjekBilForan(bil3);
  bil5.tjekBilForan(bil4);
  //if(bil1.velocity.x < 1 )
  //  bil1.velocity.x *= 1.005
  
  fill(240);
  rect(-10, height/2-20, width+10, 60);
  bil1.display();
  bil2.display();
  bil3.display();
  bil4.display();
  bil5.display();

  document.getElementById("points").textContent = "Speed: " + bil1.velocity.x.toFixed(2);
}

function keyPressed(){
  if(key === 'a') //stop bil -0.2
  bil1.velocity.x -= 0.2;
  if(key === 'd') //start bil +0.2
    bil1.velocity.x += 0.2;
  if(key === 's') //stop bil
    bil1.velocity.x = 0;
  if(key === 'w') //start bil
    bil1.velocity.x = 1;
    if(key == 'r') { //animation af kø
    let velocity = 1;
    let deceleration = 0.1;

    const intervalIda = setInterval(() => {
      velocity -= deceleration; // Reducer farten
      if (velocity <= 0) {
        velocity = 0; // Stop farten ved 0
        clearInterval(intervalIda); // Stop intervallet når farten når 0
      }
      bil1.velocity.x = velocity; // Opdater bilens fart
    }, 10); // Kør hver 100 ms

    const intervalIdb = setInterval(() => {
      velocity += deceleration; // Reducer farten
      if (velocity >= 1) {
        velocity = 1; // Stop farten ved 0
        clearInterval(intervalIdb); // Stop intervallet når farten når 0
      }
      bil1.velocity.x = velocity; // Opdater bilens fart
    }, 30); // Efter 5 sekunder
  }
}
=======
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
}

function keyPressed(){
  if(key === 'a')
    biler[0].velocity.x -= 0.3;  // Juster hastigheden på den første bil
}
>>>>>>> e9050f8fa0021c83a7f80d3a25425958bc5dbb66
