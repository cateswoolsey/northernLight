//cw
let emitters = []; 
let blurBuffer; 
let waveOffset = 0; 
let baseAmplitude = 80; 
let stars = []; // 
let amplitudeSlider; 
let shootingStars = []; 
let lastXPositions = []; 
const maxXHistory = 5; 

let sounds = [];
function preload() {
  sounds.push(loadSound("media/music.mp3"));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  sounds[0].loop(); //play and loop song

  blurBuffer = createGraphics(windowWidth, windowHeight);
  blurBuffer.noStroke();

  let numEmitters = 170; //emitters
  let xStep = width / (numEmitters - 1);
  let yOffsetStart = height / 4;
  let yOffsetEnd = height / 4;

  //create emitters
  for (let i = 0; i < numEmitters; i++) {
    let x = i * xStep + random(-5, 5); 
    let sineFactor = sin(i * 0.1 + waveOffset) * baseAmplitude + sin(i * 0.8 + waveOffset); 
    let y = height - yOffsetStart + sineFactor - yOffsetEnd * (i / (numEmitters - 1)) + random(-5, 5); 
    emitters.push(new Emitter(x, y));
  }

  //initialize stars + perlin noise
  for (let i = 0; i < 300; i++) {
    let x = random(width);
    let y = random(height);
    stars.push({
      x: x,
      y: y,
      size: random(1, 8), //varying sizes
      brightness: random(0, 200),
      twinkleSpeed: random(0.02, 0.5), //twinle speed
      phase: random(TWO_PI),
      noiseX: random(1000), //prlin noise offset for x 
      noiseY: random(1000)  //perlin noise offset for y 
    });
  }

  //create a slider for baseAmplitude
  amplitudeSlider = createSlider(0, 180, baseAmplitude);
  amplitudeSlider.position(width - 160, height - 40); 
  amplitudeSlider.style('width', '150px');

  //style the slider
  amplitudeSlider.style('appearance', 'none');
  amplitudeSlider.style('background', '#ccc'); 
  amplitudeSlider.style('height', '8px');
  amplitudeSlider.style('border-radius', '5px');
  amplitudeSlider.style('outline', 'none');

  amplitudeSlider.style('background-image',
    'linear-gradient(to right, #555, #555), linear-gradient(to right, #ccc, #ccc)'
  );
  amplitudeSlider.style('background-size', 'var(--value) 100%, 100% 100%');
  amplitudeSlider.style('background-repeat', 'no-repeat');

  amplitudeSlider.input(() => {
    let value = map(amplitudeSlider.value(), 0, 180, 0, 100);
    amplitudeSlider.style('--value', `${value}%`);
  });

  //initialize shooting stars
  for (let i = 0; i < 3; i++) {
    resetShootingStar();
  }
}

function draw() {
  background(0); //clear the canvas to black

  //update baseAmplitude
  baseAmplitude = amplitudeSlider.value();

  //draw stars
  for (let star of stars) {
    //brightness for flickering effect
    star.phase += star.twinkleSpeed;
    let twinkle = map(sin(star.phase), -1, 1, 0, 255); 
    if (twinkle < 50) {
      fill(0); 
    } else {
      fill(255, twinkle); //make stars shine
    }

    //update star position
    star.x += map(noise(star.noiseX), 0, 1, -2, 2); 
    star.y += map(noise(star.noiseY), 0, 1, -2, 2); 


    star.noiseX += 0.01;
    star.noiseY += 0.01;

    if (star.x < 0) star.x = width;
    if (star.x > width) star.x = 0;
    if (star.y < 0) star.y = height;
    if (star.y > height) star.y = 0;

    ellipse(star.x, star.y, star.size); 
  }

  waveOffset += 0.05; 


  blurBuffer.fill(0, 0, 0, 75); 
  blurBuffer.rect(0, 0, blurBuffer.width, blurBuffer.height);

  // update emittion posiitons
  emitters.forEach((emitter, i) => {
    let modulatedAmplitude = baseAmplitude + sin(i * 0.01 + waveOffset) * 75; 
    let sineFactor = sin(i * 0.1 + waveOffset) * modulatedAmplitude; 
    emitter.basePosition.y = height - height / 4 + sineFactor - height / 4 * (i / (emitters.length - 1)); 
    emitter.run(blurBuffer);
  });


  blendMode(ADD);
  //draw the blur buffer onto main canvas
  image(blurBuffer, 0, 0, width, height);
  //reset
  blendMode(BLEND);

  //draw shooting stars
  for (let star of shootingStars) {
    drawShootingStar(star);
  }
}

function resetShootingStar() {
  let newStar;
  let isTooClose;

  do {
    newStar = {
      startX: random(width),
      startY: random(height / 2),
      velocityX: random(-12, -6),
      velocityY: random(2, 5), 
      starSize: 10, 
      trailSegments: [], 
      maxTrailLength: 50, 
      lifespan: 0,
      maxLifespan: 200, 
      delay: frameCount + random(200, 500) 
    };

    //check x position
    isTooClose = lastXPositions.some(prevX => abs(newStar.startX - prevX) < 100); 
  } while (isTooClose);

  lastXPositions.push(newStar.startX);
  if (lastXPositions.length > maxXHistory) {
    lastXPositions.shift(); 
  }


  shootingStars.push(newStar);
}


function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function drawShootingStar(star) {
  if (star) {
    //only start updating the star after its delay
    if (frameCount < star.delay) {
      return;
    }

    //increment lifespan 
    star.lifespan++;

    //calculate the alpha value
    let alpha;
    if (star.lifespan <= star.maxLifespan / 2) {
      //fade-in 
      alpha = map(star.lifespan, 0, star.maxLifespan / 2, 0, 150);
    } else {
      //fade-out 
      alpha = map(star.lifespan, star.maxLifespan / 2, star.maxLifespan, 150, 0);
    }

    //add the current position to trail
    star.trailSegments.push({
      x: star.startX,
      y: star.startY,
      alpha: alpha,
    });

    //limit trail length
    if (star.trailSegments.length > star.maxTrailLength) {
      star.trailSegments.shift();
    }

    //draw trail
    for (let i = 0; i < star.trailSegments.length; i++) {
      let segment = star.trailSegments[i];

      
      segment.alpha *= 0.95; //decrease alpha

      fill(255, 255, 255, segment.alpha); //white trail 
      drawStar(segment.x, segment.y, star.starSize / 2, star.starSize, 5); //star shaped trail
    }

    //shooting star
    fill(255, 255, 255, alpha); 
    drawStar(
      star.startX,
      star.startY,
      star.starSize / 2,
      star.starSize,
      5
    ); 

    star.startX += star.velocityX;
    star.startY += star.velocityY;

    // reset shooting star
    if (star.lifespan > star.maxLifespan) {
      shootingStars.splice(shootingStars.indexOf(star), 1);
      resetShootingStar();
    }
  }
}


class Emitter {
  constructor(x, y) {
    this.particles = [];
    this.basePosition = createVector(x, y);
    this.phase = random(TWO_PI); // 
  }

  run(buffer) {
    let part = new Particle(this.basePosition.x, this.basePosition.y, this.phase);
    this.particles.push(part);

    let upwardForce = createVector(0, -0.1);
    this.particles.forEach((particle) => {
      particle.applyForce(upwardForce);
    });

    this.particles = this.particles.filter((p) => p.life > 0);
    this.particles.forEach((particle) => {
      particle.update();
      particle.draw(buffer); //pass buffer
    });
  }
}

class Particle {
  constructor(x, y, emitterWavePhase) {
    this.size = random(10, 20); 
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, -0.01); 
    this.life = random(150, 200); 
    this.maxLife = this.life; 
    this.wavePhase = emitterWavePhase; 
    this.freq = random(0.02, 0.05); 
  }

  draw(buffer) {
    let alpha = map(this.life, 0, this.maxLife, 0, 150); 

    let t = map(this.position.y, height, 0, 0, 1); 

    //color gradient
    let r = map(t, 0, 0.3, 255, 180);
    let g = map(t, 0, 0.3, 255, 255);
    let b = map(t, 0, 0.3, 255, 150);

    if (t > 0.3 && t <= 0.6) {
      r = map(t, 0.3, 0.6, 180, 255);
      g = map(t, 0.3, 0.6, 255, 150);
      b = map(t, 0.3, 0.6, 150, 200);
    }

    if (t > 0.6) {
      r = map(t, 0.6, 1, 255, 150);
      g = map(t, 0.6, 1, 150, 100);
      b = map(t, 0.6, 1, 200, 255);
    }

    buffer.fill(r, g, b, alpha);
    buffer.ellipse(this.position.x, this.position.y, this.size);
  }

  applyForce(f) {
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
    this.position.add(this.velocity);

    let waveModulation = sin(this.wavePhase + waveOffset); 
    this.life -= 1.75 + waveModulation * 0.5; //decay rate
    this.wavePhase += this.freq; 
  }
}

function keyPressed() {
  if (key === "p") {
    if (sounds[0].isPlaying()) {
      sounds[0].pause();
    } else {
      sounds[0].play();
    }
  }
} 
