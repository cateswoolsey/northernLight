[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/bpCU668e)
# Final Project - Open Season


Please replace this text with your own text that addresses the following:
- What do we need to know about interacting with your piece?
- What was your inspiration or concept?
- What techniques did you use and why did you chose them?
- Any references to tutorials, examples, libraries, inspirations etc that played a role in your piece


How to use: There is very little user-interaction with my piece, apart from the small slider in the bottom right corner (which allows for real time adjustment of sin wave amplitude). 
Use the slider to explore different wave amplitudes and how they effect the movement and shape of the lights!!

For my project, I wanted to create a visualization that mirrors the movement and aesthetic of the Northern Lights. 
In addition to being inspired by how the lights look, I also wanted to capture the feeling of watching them move in the sky. My visual incorperates several techniques -- the primary
technique being a particle system for emitters and individual shooting stars. Main particles have dynamic lifespans, and are influenced by upward acceleration and wave modulation, creating the natural and organic movement of the lights (the sine wave governs the positions of the emitters, creating the natural and flowing rhythm to the piece). In addition to a particle system, I use perlin noise to create smooth and randomized movement for the stars in the background. I explored geometry and working with shape (specifically in my creation of the main shooting star -- which is star shaped). Color is also used in purposeful manner -- to better capture the aesthetic and look of the lights, I created a gradient of green/pink colors. Particles emitted by the emitters transition through a gradient as they rise, using their vertical position to determine the color. To have all elements move a look a little smoother together, I incorperated a blur buffer (this was mainly to better blend the particles rising in the sky). I was initially uncertain about incorporating an audio element into the piece, as I wanted to ensure it served a purpose beyond just being an addition. Ultimately, I decided to have a relaxing song to simply loop in the background to give users a more immersive experience/feeling. In addition to watching videos and looking at images of the Northern Lights, I also referenced tutorial06 -- which focused on particle systems and a the creation of a smokey effect. Furthermore, my music is from youtube: https://www.youtube.com/watch?v=FeRETHO298w.

