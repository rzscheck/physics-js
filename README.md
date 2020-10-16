# physics-js
A simple 2D physics engine written in order to learn more about JavaScript

## Features
* Circles!
* Particles with position, velocity, and acceleration vectors! In the shape of circles!
* Working projectile motion!
* Bouncing off the edges of the canvas!

## TODO
* Modularize - the current form factor is terrible, I realize. I've never coded in JS before so I'm going to have to learn how to do this
* Add new features:
  * Forces: (friction, gravity as a force instead of just acceleration, etc)
  * Collision Detection
  * Springs
  * Fluid Dynamics
  * And More
  
## How it Works
```index.html``` contains a ```<canvas id="physics-js">```. ```physics.js``` draws inside that canvas. Currently, one draws by declaring one's particles and calling the ```drawMany(particles)``` function on an array containing those particles.
The code currently draws two particles with the same downward acceleration and no horizontal acceleration. One has zero horizontal velocity and the other has a constant horizontal velocity. They will always be at the same y-position on the canvas due to their equal acceleration.
