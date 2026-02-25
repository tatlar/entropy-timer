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

## Philosophy
A simple concept like a timer shares a profound similarity with the second law of thermodynamics of our universe: the entropy in a system always increases.

The early universe after a big bang was a state of high energy and random motion. As energy redistributes over vast timescales, order appears to prevail in local structures, but eventually, the system moves toward an inevitable conclusion: heat death. In this state, all particles are distributed uniformly, energy is balanced, and no more work can be performed. The universe reaches total balance and stillness.

I have represented this on a miniature scale. In the initial state, particles move in chaotic, unpredictable patterns. As time passes, more and more particles find their final position and lose their speed. At the end, there is total thermal equilibrium, where motion ceases and particles settle into a uniform grid.

This simulation doesn't aim to be a scientifically perfect model. It ignores gravity, energy conservation and other laws. Instead, it is a simulation of feeling: the transition from the anxiety of chaos to the silence of stillness. It allows the observer to watch their small universe inevitably converge to rest, and ponder how our universe (and every one of us) will eventually run out of time. 
