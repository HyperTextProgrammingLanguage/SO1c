// Variables and constants
let bmwImage;
let bmwBrakeImage;
let bmwAccelImage;
const maxSpeed2 = 1;
const normalMaxSpeed = 1.5; // Define a higher speed when far away

function preload() {
  // Preload image (BMW) before setup
  bmwImage = loadImage("img/bmw.png");
  bmwBrakeImage = loadImage("img/bmwBreak.png");
  bmwAccelImage = loadImage("img/bmwAccel.png");
}

class Car {
  constructor(cColor, pos, vel) {
    // Properties of the car
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
    this.currentImage = bmwImage; // Initialize with a default image
  }

  tjekBilForan(bilForan) {
    // Variables for reaction, braking, and acceleration
    const minSafeDistance = 80;
    const reactionDistance = 101;
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
    if (frameCount % 3 === 0) { // Makes it so it only updates every 3 frames
      if (this.velocity.x < 0.25) {
        this.currentImage = bmwBrakeImage; // Update image every 3 frames
      } else if (this.velocity.x > 1) {
        this.currentImage = bmwAccelImage;
      } else {
        this.currentImage = bmwImage;
      }
    }
    image(this.currentImage, this.position.x, this.position.y, 120, 80); // Display the current image
    this.previousVelocity = this.velocity.x;
  }
}
