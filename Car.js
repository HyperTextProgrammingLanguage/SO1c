// Variables and constants
let bmwImage; 
let bmwBrakeImage;
const maxSpeed2 = 1;
const normalMaxSpeed = 1.2; // Define a higher speed when far away

function preload() { // Preload image (BMW) before setup
  bmwImage = loadImage("img/bmw.png"); 
  bmwBrakeImage = loadImage("img/bmwBreak.png");  
}

class Car {
  constructor(cColor, pos, vel) { // Properties of the car
    this.color = cColor;
    this.position = pos;
    this.velocity = vel;
    this.acceleration = createVector(0, 0);
    this.fare = false;
    this.reaktion = false;
    this.timer = millis();
    this.reaktionstid = 250;
    this.previousVelocity = vel.x;
    this.maxSpeed = normalMaxSpeed; // Default max speed when far away
  }

  tjekBilForan(bilForan) { // Variables for reaction, braking, and acceleration
    const minSafeDistance = 80;
    const reactionDistance = 100;
    const brakingFactor = 0.8;
    const accelerationFactor = 0.05;
    const bufferDistance = 10;
    const distanceToCarInFront = bilForan.position.x - this.position.x;

    if (distanceToCarInFront < minSafeDistance) {
      this.velocity.x = 0;
      this.maxSpeed = 0; // Ensure the car completely stops
      return;
    }

    if (distanceToCarInFront < reactionDistance) {
      this.maxSpeed = maxSpeed2; // Reduce max speed when close
      if (this.velocity.x > this.maxSpeed) {
        this.velocity.x *= brakingFactor;
        if (this.velocity.x < this.maxSpeed) {
          this.velocity.x = this.maxSpeed;
        }
      }
    } else {
      this.maxSpeed = normalMaxSpeed; // Allow higher speed when far away
      if (this.velocity.x < this.maxSpeed) {
        this.velocity.x += accelerationFactor;
        if (this.velocity.x > this.maxSpeed) {
          this.velocity.x = this.maxSpeed;
        }
      }
    }
  }

  update() {
    if (this.velocity.x > this.maxSpeed) {
      this.velocity.x = this.maxSpeed; // Prevent random acceleration
    }
    this.position.add(this.velocity);
  }

  display() {
    if (this.velocity.x === 0 || this.velocity.x < this.previousVelocity) {
      image(bmwBrakeImage, this.position.x, this.position.y, 120, 80); // Show brake image when stopping or slowing
    } else {
      image(bmwImage, this.position.x, this.position.y, 120, 80);
    }
    this.previousVelocity = this.velocity.x;
  }
}
