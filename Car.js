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
    if (bilForan.position.x - this.position.x < 45){ //Hvis bilen er inde for 45 vil den lige så stille bræmse
      this.velocity.x *= 0.9;
      return;
    }
    if (bilForan.position.x - this.position.x < 75 && this.fare == false) { //his bilen er inde for 75 og fare er false
      this.reaktion = true;
      this.fare = true;
      this.timer = millis(); // reaktionstid start
    } 
    else if (this.reaktion == true) {
      if (millis() - this.reaktionstid > this.timer) {
        this.reaktion = false; // reaktionstid slut
      }
    } 
    else if (this.fare == true) {
      // er der fri bane igen?
      if (bilForan.position.x - this.position.x > 75) {

        if (this.velocity.x < 1) 
          this.velocity.x *= 1.04; // accelerer igen lidt

          if (this.velocity.x === 0)
            this.velocity.x += 0.5;

          else 
            this.fare = false;  // fart på 1, og fare væk
      }
      else
        this.velocity.x *= 0.99; // bremser lidt per frame
   }
   if (bilForan.position.x - this.position.x < 75){ //hvis bilen er inde for 75 vil den sætte en maskshastighed på 1
    if (this.velocity.x > 1)
      this.velocity.x = 1;
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