# Reflection

For my project, I wanted to create a visualization that mirrors the movement and aesthetic of the Northern Lights. In addition to using a particle system to replicate the fluid, wave-like motion of the light as it moves across the dark sky, I wanted to use a color gradient of greens, purples, and blues to capture its aesthetic. I also thought of including an audio-reactive component, perhaps where peaks in sound could effect the intensity or motion of the lights. However, the use of audio will depend on whether it enhances the overall aesthetic and purpose of the piece!! With the lights, which move using sin waves, there are shooting stars (shaped as stars) that spawn randomly in the background -- they fade in and out as they shoot across the screen. There is also a blur buffer being used to make everything appear smoother and more cohesive. Behind everything there are smaller stars (dots) that move based on perlin noise and flicker "on/off."

- Do you think it is complete?
I think that this project04 is complete. It uses a variety of techniques (color, perlin noise, beginShape() -- geometry/vertice work, blurbuffer,  audio, etc), with the main technique being a particle system. In addition to using necessary techniques, I think the visual is very satisfying and pleasing to look at. My piece also meets my goal of mirroring the Northern Lights.

- If not, what would you still like to add or change?
While I think that my piece is complete, I think there is definitely opportunity for improvement. I think something that I would like to add is audio-reactivity. I was initially uncertain about incorporating an audio element into the piece, as I wanted to ensure it served a purpose beyond just being an addition. I think if I had a little more time, I would epxlore ways to use audio that does not take away from the visual. 

- What part are you most proud of?
The thing I am most proud of is my particle system -- specifically the way it moves and looks. While I believe it successfully captures the essence of the Northern Lights, I think the particle system element adds a personal touch that makes it unique (and not exactly a replica of the lights, but a more artistic take on them). I’m particularly proud of how I incorporated smooth wave-like motions through sine wave modulation (which created that natural and flowing effect). 

- What part are you least proud of?
I think I am least proud of the audio component. While I do use audio—particularly to create a more immersive experience as viewers gaze at my piece—it was relatively straightforward to load in a song. Compared to the effort and creativity I invested in other components, such as my particle system or shooting stars, the audio feels less integral to the piece. It enhances the mood and atmosphere but doesn't interact dynamically with the visuals. 

- What was the hardest part?
I think the hardest part was working with a large number of particles and ensuring that my visual would run smoothly. At first, I was focused on making the visuals resemble the Northern Lights as closely as possible, but I soon realized that balancing realism with performance was a challenge. Managing the number of particles, their lifespans, movement, and gradients required careful optimization to prevent the frame rate from dropping. Another challenge was integrating all the components (particles, shooting stars, and the starry background) in a cohesive way that felt balanced and immersive. I didn't want one element to take away from another. 

- What, if anything, have you gained by completing this project?
During this project, I definitely gained a deeper understanding of working with particle systems and optimizing them for performance. I think I improved my skills in using trigonometric functions (specfiically sine waves) to create dynamic and flowing motion. I also gained valuable experience in balancing artistic vision with technical implementation. This project challenged me to think about how to structure and organize my code to manage multiple interacting components (such as emitters, shooting stars, and a starry background). I think it can be difficult to find ways to blend multiple effects into one cohesive piece (which this project forced us to do by using so many different tehcniques from class). I also got to explored a little bit with interactive elements (slider) -- which I avoided in all of my other projects. 


