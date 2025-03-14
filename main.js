// setup canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate a random color (only red, pink, and white)
function randomRGB() {
  const colors = ["rgb(255, 0, 0)", "rgb(255, 192, 203)", "rgb(255, 255, 255)"];
  return colors[random(0, colors.length - 1)];
}

class Triangle {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    
    // the triagnle shape 

    ctx.moveTo(this.x, this.y - this.size); 
    ctx.lineTo(this.x - this.size, this.y + this.size); 
    ctx.lineTo(this.x + this.size, this.y + this.size); 
    ctx.closePath();
    
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width || this.x - this.size <= 0) {
      this.velX = -this.velX;
    }
    if (this.y + this.size >= height || this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const triangle of triangles) {
      if (this !== triangle) {
        const dx = this.x - triangle.x;
        const dy = this.y - triangle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size * 2) {
          triangle.color = this.color = randomRGB();
        }
      }
    }
  }
}

// array of triangles 

const triangles = [];

while (triangles.length < 25) {
  const size = random(10, 20);
  const triangle = new Triangle(
    random(size, width - size),
    random(size, height - size),
    random(-5, 5),
    random(-5, 5),
    randomRGB(),
    size
  );

  triangles.push(triangle);
}

// animation loop 

function loop() {
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);

  for (const triangle of triangles) {
    triangle.draw();
    triangle.update();
    triangle.collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();
