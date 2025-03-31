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