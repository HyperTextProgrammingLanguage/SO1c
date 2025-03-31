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
  if(bil1.velocity.x < 1 )
    bil1.velocity.x *= 1.005
  
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
  if(key === 'a') //stop bil -0.3
  bil1.velocity.x -= 0.3;
  if(key === 'd') //start bil +0.3
    bil1.velocity.x += 0.3;
  if(key === 's') //stop bil
    bil1.velocity.x = 0;
  if(key === 'w') //start bil
    bil1.velocity.x = 1;
  if(key == 'r') //animation af kø
      bil2.velocity.x = 1;
    setTimeout(() => {
      bil3.velocity.x = 1;
    }, 300);
    setTimeout(() => {
      bil4.velocity.x = 1;
    }, 600);
    setTimeout(() => {
      bil5.velocity.x = 1;
    }, 900);
}

