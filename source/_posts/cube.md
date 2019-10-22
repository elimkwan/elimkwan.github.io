---
title: Rubik's Cube Solving Robot
date: 2019-08-05 01:32:54
tags:
cover_index: "https://www.dropbox.com/s/qp5l6iiyj72h2xj/thumb-cube.jpg?raw=1"
---
{% youtube Fook-gANs6U %}
<br>
<br>
This is our Rubik's Cube Solver project! The work was divided into several parts: implementing colour recognition; obtaining the solving algorithm and designing the GUI; interpretation of signal and lter circuits; implementation of logic and corresponding logic circuits; and design of physical elements and mechanical manipulation.
<br>
<img src="https://www.dropbox.com/s/n6zv8rm1eheshj2/cube-overall.png?raw=1" width="1080" height="200">
<br>
I was in charged of mainly the following two aspects: 



<br>
<br>
<h1 style="color:#7ecaf6;" class="fas fa-briefcase"> Embedded Circuits with PCB prototype </h1>
The most interesting constraint of the project is that only analog output is allowed from the computer, yet, when translating the analog signal to PWM input for motors, no MCU/Arduino is allowed. Therefore, we had constructed our own analog-to-digital circuit with D-latches and 555 timer.
<br>
<br>
<h3>Overview of the circuit</h3>
<img src="https://www.dropbox.com/s/e2ibao4k4r9buzb/cube-circuit.png?raw=1" width="1080" height="750">
<br>
<br>


We had gone through many engineering cycles and design iterations to evolve our circuits. We first started off with bread board. As we gained confident in our design, we started to build stripboard prototype as well. Furthermore, with pcb development experience from previous work, I also managed to develop the pcb version of our circuit.
<br>
<br>
<h3>Hardware Prototypes</h3>
<img src="https://www.dropbox.com/s/359e7hs1ahr9qdk/cube-strip-board.jpg?raw=1">
 &nbsp  &nbsp  &nbsp
<img src="https://www.dropbox.com/s/mxc3y1lkoutovbj/cube-pcb.jpg?raw=1">





<br>
<br>
<h1 style="color:#7ecaf6;" class="fas fa-briefcase"> Colour Recognition System </h1>
Colour recognision is one of the main blockers of the project. The slightest change in light intensity drastically changes the RGB value. To complete the project within the specified time frame, I refactored the colour recognition code from my team mates, and we had also came up with the following solutions to alleviate the problem:

<li> The interior of the box in which the cube is housed is spray painted white and dim lights are distributed evenly around within the box, the aim of this is to have a consist brightness within the box.</li>
<li> Change the colour space from RGB to HSV</li>
<li> Random seed averaging approach</li>

Random seed averaging approach means when pixels are picked from each tiles to calculated RGB average, instead of hard-coded the locations the pixels, pixels are picked randomly with in the tiles. This hugely improved the accuracy of the code. Also, with random seed approach, each run could potentially yield different results, thus, we can retry multiple times until we had successfully detected a valid scrambled cube configuarion.

<br>
<br>
<br>
<h3>Key Skills developed:<h3>
<button>#Hardware Prototype</button>  <button>#Sequential Circuit</button>
<br>
<br>
<button>#Embedded Circuits</button>  <button>#Soldering</button>
<br>
<br>
<button>#Image Processing</button>  <button>#Computer Vision</button>
<br>
<br>
<button>#Software</button>  <button>#Python</button>  <button>#Teamwork</button>