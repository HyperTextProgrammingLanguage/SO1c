class Car {
  constructor(cColor, pos, vel) {
    this.color = cColor;
    this.position = pos;
    this.velocity = vel;
    this.acceleration = createVector(0, 0);
    this.fare = false;
    this.reaktion = false;
    this.timer = millis();
    this.reaktionstid = 750;
  }

  tjekBilForan(bilForan) {
    const minSafeDistance = 50; // Minimum safe distance between cars
    const reactionDistance = 75; // Distance to start reacting
    const brakingFactor = 0.9; // Factor to reduce velocity when braking
  
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
    } else if (this.reaktion) {
      if (millis() - this.reaktionstid > this.timer) {
        this.reaktion = false; // End reaction time
      }
    } else if (this.fare) {
      // Check if the path is clear again
      if (distanceToCarInFront > reactionDistance) {
        if (this.velocity.x < 1) this.velocity.x *= 2; // Accelerate again
        if (this.velocity.x === 0) this.velocity.x += 0.5;
        else this.fare = false; // Resume normal speed
      } else {
        this.velocity.x *= brakingFactor; // Gradually slow down
      }
    }
  }

  update() {
    // føj hastighed til position
    this.position.add(this.velocity);
  }

  display() {
    if(this.reaktion == true)
      fill(200,0,0);
    else
    fill(this.color);
    rect(this.position.x-5, this.position.y+2, 40, 16, 5);
    rect(this.position.x, this.position.y, 30, 20, 5);
  }
}