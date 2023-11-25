import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
doorColorTexture.colorSpace = THREE.SRGBColorSpace
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
bricksColorTexture.colorSpace = THREE.SRGBColorSpace
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
grassColorTexture.colorSpace = THREE.SRGBColorSpace
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

// House container
const house = new THREE.Group()
scene.add(house)

/**
 * House
*/

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
)

walls.position.y = 1.25

house.add(walls)

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({ color: '#b35f45' })
)

roof.position.y = 3
roof.rotation.y = Math.PI * 0.25

house.add(roof)

gui.add(roof.position, 'y').name('roof y').min(0).max(5).step(0.1)
gui.add(roof.rotation, 'y').name('roof rotation y').min(0).max(5).step(0.1)


// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
    })
)

floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
house.add(floor)

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
)
   
door.position.set(0, 1, 2.01)
gui.add(door.position, 'z').name('door position z').min(0).max(5).step(0.1)

house.add(door)

// Door light
const doorLightGroup = new THREE.Group()
house.add(doorLightGroup)

const doorLampGeometry = new THREE.SphereGeometry(0.05, 16, 16)
const doorLampMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.0, transparent: false })

const doorLamp = new THREE.Mesh(doorLampGeometry, doorLampMaterial)
doorLamp.position.set(0, 2.2, 2.1)

const doorLight = new THREE.PointLight('#ff7d46', 3, 7)

doorLight.position.set(0, 2.2, 2.2)
doorLightGroup.add(doorLight, doorLamp)

gui.add(doorLightGroup.position, 'z').name('doorlight position z').min(0).max(5).step(0.1)
gui.add(doorLightGroup.position, 'y').name('doorlight position y').min(0).max(5).step(0.1)

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(- 0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(- 1, 0.05, 2.6)

house.add(bush1, bush2, bush3, bush4)

// Path
const path = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 10),
    new THREE.MeshStandardMaterial({ color: '#ffffff', side: THREE.DoubleSide })
    )
    
path.position.set(0, 0.01, 5)
path.rotation.x = Math.PI / 2
scene.add(path)

gui.add(path.position, 'x').name('path x').min(-10).max(10).step(0.1)
gui.add(path.position, 'y').name('path y').min(-2).max(2).step(0.1)
gui.add(path.position, 'z').name('path z').min(-10).max(10).step(0.1)

// Windows
const windowGeometry = new THREE.PlaneGeometry(0.75, 1)
const windowMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff', side: THREE.DoubleSide })

const window1 = new THREE.Mesh(windowGeometry, windowMaterial)

window1.position.set(2.01, 1.5, -0.75)
window1.rotation.y = Math.PI / 2

const window2 = new THREE.Mesh(windowGeometry, windowMaterial)

window2.position.set(2.01, 1.5, 0.75)
window2.rotation.y = Math.PI / 2

const window3 = new THREE.Mesh(windowGeometry, windowMaterial)

window3.position.set(-2.01, 1.5, -0.75)
window3.rotation.y = Math.PI / 2

const window4 = new THREE.Mesh(windowGeometry, windowMaterial)

window4.position.set(-2.01, 1.5, 0.75)
window4.rotation.y = Math.PI / 2

// house.add(window1, window2, window3, window4) TODO: Make pretty

// Graves
const graves = new THREE.Group()
scene.add(graves)

const fontLoader = new FontLoader();

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })
const graveTexts = ['RIP', 'Best baker in town', 'RIP', 'Miss you', 'Rest In Peace', 'RIP']

for(let i = 0; i < 50; i++)
{
    const angle = Math.random() * Math.PI * 2 // Random  angle
    const radius = 3 + Math.random() * 6      // Random radius
    const x = Math.cos(angle) * radius        // Get the x position using cosinus
    const z = Math.sin(angle) * radius        // Get the z position using sinus

    // Create the mesh
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)

    grave.castShadow = true

    // Position
    grave.position.set(x, 0.3, z)                              

    // Rotation
    const rotationZ = (Math.random() - 0.5) * 0.4
    const rotationY = (Math.random() - 0.5) * 0.4
    grave.rotation.z = rotationZ
    grave.rotation.y = rotationY

    const graveText = graveTexts[Math.floor(Math.random() * graveTexts.length)] // Get random text from array
    const graveTextSize = graveText === 'RIP' ? 0.15 : 0.04 

    fontLoader.load('/fonts/droid_sans_regular.typeface.json', function (font) {
        const textGeometry = new TextGeometry(graveText, {
            font,
            size: graveTextSize,
            height: 0,
            curveSegments: 4,
            bevelEnabled: true,
            bevelThickness: 0.01,
            bevelSize: 0.01,
            bevelOffset: 0,
            bevelSegments: 4
        })
    
        textGeometry.center()
    
        const text = new THREE.Mesh(textGeometry, graveMaterial)
        text.position.set(x, 0.4, z + 0.1)

        text.rotation.z = rotationZ
        text.rotation.y = rotationY
    
        graves.add(text);
    });


    // Add to the graves container
    graves.add(grave)
}



/**
 * Fog
 */
const fog = new THREE.Fog('#262837', 1, 20)
scene.fog = fog

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#ff00ff', 6, 3)
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#00ffff', 6, 3)
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#ffff00', 6, 3)
scene.add(ghost3)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.26)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

// Shadows
moonLight.castShadow = true
moonLight.shadow.mapSize.width = 256
moonLight.shadow.mapSize.height = 256
moonLight.shadow.camera.far = 15

gui.add(moonLight, 'castShadow').name('moonlight shadow')

doorLight.castShadow = true
doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

gui.add(doorLight, 'castShadow').name('doorlight shadow')

ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7

gui.add(ghost1, 'castShadow').name('ghost1 shadow')
gui.add(ghost2, 'castShadow').name('ghost2 shadow')
gui.add(ghost3, 'castShadow').name('ghost3 shadow')

walls.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

floor.receiveShadow = true

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
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Ghosts
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(elapsedTime * 3)

    const ghost2Angle = - elapsedTime * 0.32
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    const ghost3Angle = - elapsedTime * 0.18
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
    ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()