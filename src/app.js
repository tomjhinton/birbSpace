import './style.scss'
import * as THREE from 'three'
// import * as dat from 'lil-gui'
import gsap from 'gsap'



import vertexShader from './shaders/vertex.glsl'

import vertexDShader from './shaders/vertexDistort.glsl'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


import fragmentShader1 from './shaders/planet1Frag.glsl'

import fragmentShader2 from './shaders/planet2Frag.glsl'

import fragmentShader3 from './shaders/planet3Frag.glsl'

import particlesShader from './shaders/particlesFrag.glsl'


const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()




const loadingBarElement = document.querySelector('.loading-bar')
const loadingBarText = document.querySelector('.loading-bar-text')
const loadingManager = new THREE.LoadingManager(
  // Loaded
  () =>{
    window.setTimeout(() =>{
      gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 5, value: 0, delay: 2 })

      loadingBarElement.classList.add('ended')
      loadingBarElement.style.transform = ''

      loadingBarText.classList.add('fade-out')

    }, 500)
  },

  // Progress
  (itemUrl, itemsLoaded, itemsTotal) =>{
    const progressRatio = itemsLoaded / itemsTotal
    loadingBarElement.style.transform = `scaleX(${progressRatio})`

  }
)

const gtlfLoader = new GLTFLoader(loadingManager)

const textureLoader = new THREE.TextureLoader(loadingManager)

const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
  depthWrite: false,
  uniforms:
    {
      uAlpha: { value: 1 }
    },
  transparent: true,
  vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
  fragmentShader: `
  uniform float uAlpha;
        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `
})

const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)

console.log(overlay)


//Models

const rocketTexture = textureLoader.load('rocket3.jpg')

const birdTexture = textureLoader.load('bird2.jpg')

const ufoTexture = textureLoader.load('ufo2.jpg')


rocketTexture.flipY = false
rocketTexture.encoding = THREE.sRGBEncoding

const rocketMaterial = new THREE.MeshBasicMaterial({ map: rocketTexture,
  side: THREE.DoubleSide})


birdTexture.flipY = false
birdTexture.encoding = THREE.sRGBEncoding

const birdMaterial = new THREE.MeshBasicMaterial({ map: birdTexture,
    side: THREE.DoubleSide})

ufoTexture.flipY = false
ufoTexture.encoding = THREE.sRGBEncoding

const ufoMaterial = new THREE.MeshBasicMaterial({ map: ufoTexture,
        side: THREE.DoubleSide})



let sceneGroup, rocket
gtlfLoader.load(
  'rocket.glb',
  (gltf) => {
    gltf.scene.scale.set(0.5,0.5,0.5)
    sceneGroup = gltf.scene
    sceneGroup.needsUpdate = true
    sceneGroup.position.z -= 3
    scene.add(sceneGroup)


    rocket = gltf.scene.children.find((child) => {
      return child.name === 'rocket'
    })



    rocket.material = rocketMaterial



  }
)


let sceneGroupBird, bird, helmet
gtlfLoader.load(
  'spacebird.glb',
  (gltf) => {
    gltf.scene.scale.set(0.75,0.75,0.75)
    sceneGroupBird = gltf.scene
    sceneGroupBird.needsUpdate = true
    sceneGroupBird.position.y -= (3.1 * 4)-.1
    scene.add(sceneGroupBird)

      sceneGroupBird.rotation.y += .7


    bird = gltf.scene.children.find((child) => {
      return child.name === 'bird'
    })





    helmet = gltf.scene.children.find((child) => {
      return child.name === 'helmet'
    })




    bird.material = birdMaterial

      helmet.material =  new THREE. MeshStandardMaterial({ color: 'cyan',opacity: 0.3, transparent: true})



  }
)




let sceneGroupUfo, ufo
gtlfLoader.load(
  'ufo.glb',
  (gltf) => {
    gltf.scene.scale.set(0.5,0.5,0.5)
    sceneGroupUfo = gltf.scene
    sceneGroupUfo.needsUpdate = true
    sceneGroupUfo.position.z -= 4
    sceneGroupUfo.position.y -= 8
    scene.add(sceneGroupUfo)


    ufo = gltf.scene.children.find((child) => {
      return child.name === 'ufo'
    })



    ufo.material = ufoMaterial



  }
)



//Materials

const material1 = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader1,
  transparent: true,
  depthWrite: true,
  clipShadows: true,
  wireframe: false,
  side: THREE.DoubleSide,
  uniforms: {
    uTime: {
      value: 0
    },

    uResolution: { type: 'v2', value: new THREE.Vector2() },
    uPosition: {
      value: {
        x: 0
      }
    }
  }
})


const material2 = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader2,
  transparent: true,
  depthWrite: true,
  clipShadows: true,
  wireframe: false,
  side: THREE.DoubleSide,
  uniforms: {
    uTime: {
      value: 0
    },

    uResolution: { type: 'v2', value: new THREE.Vector2() },
    uPosition: {
      value: {
        x: 0
      }
    }
  }
})



const material3 = new THREE.ShaderMaterial({
  vertexShader: vertexDShader,
  fragmentShader: fragmentShader3,
  transparent: true,
  depthWrite: true,
  clipShadows: true,
  wireframe: false,
  side: THREE.DoubleSide,
  uniforms: {
    uTime: {
      value: 0
    },

    uResolution: { type: 'v2', value: new THREE.Vector2() },
    uPosition: {
      value: {
        x: 0
      }
    }
  }
})

const partcilesMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: particlesShader,
  transparent: true,
  depthWrite: true,
  clipShadows: true,
  wireframe: false,
  side: THREE.DoubleSide,
  uniforms: {
    uTime: {
      value: 0
    },

    uResolution: { type: 'v2', value: new THREE.Vector2() },
    uPosition: {
      value: {
        x: 0
      }
    }
  }
})





//Meshes

const objectsDistance = 4

const planet1 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 16, 16),
  material1
)

const planet2 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 16, 32),
  material2
)

const planet2Ring = new THREE.Mesh(
  new THREE.TorusGeometry(1.4, .1, 20, 20),
  material2
)


const planet3 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 16, 32),
  material3
)

planet1.position.y = - objectsDistance * 0

planet2.position.y = - objectsDistance * 1
planet2Ring.position.y = - objectsDistance * 1

planet3.position.y = - objectsDistance * 2


planet1.position.x = 2
planet2.position.x = -2
planet2Ring.position.x = -2

planet2Ring.rotation.x = Math.PI / 2

planet3.position.x = 2


scene.add(planet1, planet2, planet2Ring, planet3)

const sectionMeshes = [planet1, planet2,  planet3]

const spinMehses= [planet2]

//
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(.5, 16, 32),
  new THREE.MeshBasicMaterial({color: 'yellow'})
)

sun.position.x = -2
sun.position.y = +1.3

scene.add(sun)

// Particles

// Geometry
const particleCount = 200
const positions = new Float32Array((particleCount * 3))

for(let i =0; i < particleCount; i++){
  positions[i *3 + 0] = (Math.random() - .5) * 10
  positions[i *3 + 1] = objectsDistance * .5 - Math.random() * objectsDistance * sectionMeshes.length
  positions[i *3 + 2] = (Math.random() - .5) * 10
}

const paarticlesGeometry = new THREE.BufferGeometry()
paarticlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))



const particles = new THREE.Points(paarticlesGeometry, partcilesMaterial)
scene.add(particles)

//Lights
const directionalLight = new THREE.DirectionalLight('#ffffff')
directionalLight.position.set(1,1,0)
scene.add(directionalLight)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */

 // group

 const cameraGroup = new THREE.Group()
 scene.add(cameraGroup)
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Scroll

let scrollY = window.scrollY
let currentSection = 0

function birdSpin(){
  gsap.to(
    bird.rotation, {
      delay: 3,
      duration: 2.5,
      ease: 'power2.inOut',
      y: '+=.5'


    }
  )
}

window.addEventListener('scroll', () =>{
  scrollY = window.scrollY

  const newSection = Math.round(scrollY /sizes.height)

  if(newSection !== currentSection){
    currentSection = newSection

    if(currentSection === 1 ){
    gsap.to(
      spinMehses[0].rotation, {
        duration: 3.5,
        ease: 'power2.inOut',
        x: '+=6',
        y: '+=6',
        z: '+=1.5'
      }
    )
  }
  }

  if(currentSection >= 3 && bird.rotation.y ===0.){
  gsap.to(
    bird.rotation, {
      delay: 1,
      duration: 2.5,
      ease: 'power2.inOut',
      y: '-=.5',
      onComplete: birdSpin

    }
  )
}



})



// Cursor

const cursor = {}

cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) => {
  cursor.x =event.clientX / sizes.width -.5
  cursor.y =event.clientY / sizes.height -.5
  console.log(currentSection)


})

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime  = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Animate Camera
    camera.position.y = - scrollY / sizes.height * objectsDistance

    // const parallaxX = cursor.x * .5
    // const parallaxY = - cursor.y * .5
    //
    // cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 4 * deltaTime
    // cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 4 * deltaTime


    // Animate Meshes
    sectionMeshes.map( mesh => {
      mesh.rotation.x += deltaTime * .1
      mesh.rotation.y += deltaTime * .12
    })

      material1.uniforms.uTime.value = elapsedTime

      material2.uniforms.uTime.value = elapsedTime

      material3.uniforms.uTime.value = elapsedTime

      partcilesMaterial.uniforms.uTime.value = elapsedTime

      if(rocket){
    rocket.position.x = Math.sin(elapsedTime * .2) * 2
    rocket.position.y = -Math.sin(elapsedTime * .2) * 8
  }


        if(ufo){
      ufo.position.y = Math.sin(elapsedTime * .2) * 2
      ufo.position.x = -Math.sin(elapsedTime * .2) * 4
      ufo.rotation.y+=.01
    }
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
