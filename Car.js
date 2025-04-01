// Variables and constants
let bmwImage; 
const maxSpeed2 = 1;

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
    this.previousVelocity = vel.x; // Gem tidligere hastighed
  }

  tjekBilForan(bilForan) { // Variables for reaction, braking, and acceleration
    const minSafeDistance = 80; // Minimum safe distance between cars
    const reactionDistance = 100; // Distance to start reacting
    const brakingFactor = 0.8; // Factor to reduce velocity when braking
    const accelerationFactor = 0.05; // Factor to gradually increase velocity
    const bufferDistance = 10; // Buffer zone to prevent oscillation
    const distanceToCarInFront = bilForan.position.x - this.position.x;
  
    if (distanceToCarInFront < minSafeDistance) {
      // Too close to the car in front, stop completely
      this.velocity.x = 0;
      return;
    }
  
    if (distanceToCarInFront < reactionDistance && !this.fare) {
      // Start reacting if within reaction distance
      this.reaktion = true;
      this.fare = true;
      this.timer = millis(); // Start reaction timer
      if (this.velocity.x > maxSpeed2) {
        this.velocity.x = maxSpeed2; // Stop the car
      }
    
    } else if (this.reaktion) {
      if (millis() - this.reaktionstid > this.timer) {
        this.reaktion = false; // End reaction time
      }
    } else if (this.fare) {
      // Check if the path is clear again
      if (distanceToCarInFront > reactionDistance + bufferDistance) {
        // Gradually accelerate instead of jumping
        this.velocity.x += accelerationFactor;
        if (this.velocity.x >= maxSpeed2) {
          this.velocity.x = maxSpeed2; 
          this.fare = false; // Resume normal speed
        }
      } else if (distanceToCarInFront < reactionDistance - bufferDistance) {
        // Gradually slow down
        this.velocity.x *= brakingFactor;

      }
    }
  }


  
  update() {
    // Add speed to position
    this.position.add(this.velocity);
  }

  display() {
    if (this.velocity.x < this.previousVelocity) {
      if (!this.brakingStartTime) {
        this.brakingStartTime = millis(); // Start the timer
      }
      if (millis() - this.brakingStartTime >= 10) { // Check if 0.1 seconds have passed
        image(bmwBrakeImage, this.position.x, this.position.y, 120, 80); // Use brake image
      } else {
        image(bmwImage, this.position.x, this.position.y, 120, 80); // Use normal image until 0.1 seconds pass
      }
    } else {
      this.brakingStartTime = null; // Reset the timer if not braking
      image(bmwImage, this.position.x, this.position.y, 120, 80); // Use normal image
    }
    this.previousVelocity = this.velocity.x; // Update previous velocity
  }
}
