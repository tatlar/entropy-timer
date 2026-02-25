# The Entropy Clock
A meditative visual countdown timer, which resembles the transformation of chaos to order. Scattered particles pull back together into a systematic structure as time passes, culminating into a still grid as the timer runs out. 

## Live 
Check out the Entropy Timer in action here: 
* **https://tatlar.github.io/entropy-timer/**

## Features 
* **Procedurally Generated Visuals**: Each of the dots has its own chaotic independent path and converges into the middle place exactly at the moment it has finished the countdown. 
* **Soundscapes**: Low frequency ambient noise from deep space. 
    Procedurally generated sound effects assigned to each theme (using the Web Audio API).
* **Multiple Visual Themes**: 
  - Sunset (Warm gradients of purple and peach) 
  - Ocean (Deep teals and blues) 
  - Forest (Floral greens and earth tones) 
  - Stars (Black and white space aesthetic with additional glow). 
* **Interactive Controls**: adjustable duration and real-time theme changes.

## Built with 
* **HTML5/CSS3** - Created custom animations and used grid styling.
* **Vanilla JavaScript** - Utilised physics engine and logic. 
* **Web Audio API** - Real-time sound generator, no pre-recorded sound files.

## How It Works 
The clock counts down time not just as simply numbers, but through the physical experience of “establishing the order”.
1. The **Chaos**: When the timer is first started, all the dots are moving in different directions with changing speed, manifesting the randomness. 
2. The **Pull**: Upon each tick of clock, a randomly selected dot is finishing its motion, the physics of that dot will now be changed to “pull” towards its predetermined grid coordinate (each dot will eventually stop at its place). 
3. The **Stillness**: When a dot reaches its final destination, it will create both a blink and a sound (associated with the visual theme it represents) and then remain in a “neutral” gray state until the clock runs out.

