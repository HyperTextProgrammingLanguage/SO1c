let bil1, bil2, bil3, bil4;
function setup() {
  createCanvas(800, 400);
  frameRate(50); strokeWeight(2);
  bil1 = new Car("silver", createVector(75,200), createVector(1,0)); // Laver objekter af klassen "Car"
  bil2 = new Car("gold",createVector(0,200), createVector(1,0));
  bil3 = new Car("black",createVector(-75,200), createVector(1,0));
  bil4 = new Car("blue",createVector(-150,200), createVector(1,0));
}

function draw() {
  background("#247B28");
    
  bil1.update();
  bil2.update();
  bil3.update();
  bil4.update();
  bil2.tjekBilForan(bil1);
  bil3.tjekBilForan(bil2);
  bil4.tjekBilForan(bil3);
  if(bil1.velocity.x < 1 )
    bil1.velocity.x *= 1.005
  
  fill(240);
  rect(-10, height/2-20, width+10, 60);
  bil1.display();
  bil2.display();
  bil3.display();
  bil4.display();
}

function keyPressed(){
  if(key === 'a')
  bil1.velocity.x -= 0.3;
}
