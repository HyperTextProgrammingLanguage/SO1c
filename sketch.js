let bil1, bil2, bil3, bil4, bil5;
function setup() {
  createCanvas(800, 400);
  frameRate(60); strokeWeight(2);
  bil1 = new Car("silver", createVector(75,200), createVector(1,0));
  bil2 = new Car("gold",createVector(0,200), createVector(1,0));
  bil3 = new Car("black",createVector(-75,200), createVector(1,0));
  bil4 = new Car("blue",createVector(-150,200), createVector(1,0));
  bil5 = new Car("silver", createVector(-225,200), createVector(1,0));
}

function draw() {
  background("#247B28");
    
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
