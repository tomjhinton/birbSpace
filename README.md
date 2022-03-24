# birbSpace

For @sableRaph's weekly Creative Coding Challenge. The Challenge topic was 'Space'.



Turns out there's a [name](https://en.wikipedia.org/wiki/Law_of_the_instrument) for why I do this but this week I made some models in blender, stuck them in a three.js scene and wrote some chaotic shaders.

First question here is how far do you have to stray from a tutorial for it to be your own work?

- Slight debt owed to one of [Bruno Simon's Three.js Course](https://threejs-journey.com/) lessons in terms of layout and several details tbh.
- Ok a large debt, I'd say this was Bruno's entry apart from it would be much better if it was.
[It's a really nice layout!](https://threejs-journey.com/resources/codrops/threejs-scroll-based-animation/)
- Flicked through a youtube video to make the rocket.
- Flicked through a youtube video to make the flying saucer.
- Did not flick through a youtube video to make the bird in a space suit because no matter how hard I looked I could not find one.
- This is why that one is significantly worse.

# Three bit
- 4 spheres, one with a torus around it
- Top one is just three's own yellow basic material, was a placeholder but liked it so it stayed.
- Second is just the radial uvs distorted.
- Third with the torus again was just a placeholder shader but then decided I like it so I left it.  
- Fourth is a sphere but distorted in the vertex shader with a bit of noise for the fragment shader.

Ok so the bird is meant to turn towards you when you scroll to it, that's done with gsap but dont know if it worked today as its been temperamental.


Font is [Basement](https://grotesque.basement.studio/)


#Bonus
As ppl pointed out we did space genuary, deployed mine[here](https://tomjhinton.github.io/genuarySpace/)
- refresh for minimal changes
- yes thats my level of generative
- yes I put this here because I feel bad about how much of Bruno's stuff I used.
- It's a shader.
- Raymarching makes my tiny head hurt but it is pretty.
