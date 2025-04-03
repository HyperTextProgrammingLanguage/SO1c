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
    const minSafeDistance = 90;
    const reactionDistance = 101;
    const distanceToCarInFront = bilForan.position.x - this.position.x;

    const timeStep = 0.016; // Assuming a frame rate of 60 FPS, time per frame in seconds
    const brakingAcceleration = -2; // Deceleration in units per second squared
    const acceleration = Math.abs(brakingAcceleration)/2.5; // Acceleration in units per second squared

    if (distanceToCarInFront < reactionDistance) {
      this.maxSpeed = maxSpeed2; // Reduce max speed when close
      if (distanceToCarInFront < minSafeDistance) { // For tæt på, stop
        // Emergency braking
        this.velocity.x += brakingAcceleration * timeStep;
        if (this.velocity.x < 0) {
          this.velocity.x = 0; // Ensure the car doesn't move backward
        }
      } else if (this.velocity.x > this.maxSpeed) { // For hurtigt, stop
        // Gradual braking
        this.velocity.x += brakingAcceleration * timeStep;
        if (this.velocity.x < this.maxSpeed) {
          this.velocity.x = this.maxSpeed;
        }
      }
    } else {
      this.maxSpeed = 1.1; // Allow higher speed when far away
      if (this.velocity.x < this.maxSpeed) {
        // Apply acceleration
        this.velocity.x += acceleration * timeStep;
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
    if (frameCount % 3 === 0) {
      // Makes it so it only updates every 3 frames
      if (this.velocity.x < 1) {
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
