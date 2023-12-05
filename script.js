// Set up Three.js scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.lookAt(0, 0, 0);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const container = document.querySelector(".canvas-container");
container.appendChild(renderer.domElement);

// Add lighting (optional)
const light = new THREE.PointLight(0xffffff);
light.position.set(5, 5, 5);
scene.add(light);

//Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Color can be adjusted (hex format)
scene.add(ambientLight);

//Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 3); // Color and intensity
directionalLight.position.set(1, 1, 1); // Set the light's direction
scene.add(directionalLight);

let model;
let frontwheel;
let backwheel;
let engine;

const adjustModelScale = () => {
  console.log("resize");
  const width = window.innerWidth;
  console.log(width);
  if (width <= 768) {
    console.log("inside");
    model.scale.set(1, 1, 1);
  } else {
    model.scale.set(4, 4, 4);
  }
};

let mixer;
// GLTF Loader
const gltfLoader = new THREE.GLTFLoader();
gltfLoader.load("assets/bajajAnimation.glb", (gltf) => {
  model = gltf.scene;
  console.log(model);
  frontwheel = model.children[20];
  backwheel = model.children[21];
  engine = model.children[17];
  backwheel.scale.set(1,1,1)
  // Set up animation mixer
  mixer = new THREE.AnimationMixer(model);
  const animations = gltf.animations;

  if (animations && animations.length > 0) {
      const action = mixer.clipAction(animations[0]); // Assuming the first animation is the loop
      action.play();
  }

  adjustModelScale();
  model.position.y = -2;
  model.rotation.y = 1.48;
  model.scale.set(4, 4, 4);
  scene.add(model);
});

const t1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-one",
    start: "50% 50%",
    end: "bottom 50%",
    markers: true,
    scrub: 0.5,
    duration: 3,
  },
});

// t1.from(".box",{opacity:0,scrub:0.4,duration:10});
// t1.fromTo(".image",{opacity:0,scrub:0.4,duration:4,delay:6});
// t1.fromTo(".image",{opacity:0,scrub:0.4,duration:3},{opacity:1,scrub:0.5,duration:3})

t1.to(camera.position, {
  z: 1.8,
  y: 0.8,
  x: 3.5,
  duration: 10,
  scrub: 0.5,
}).to(camera.rotation, { y: 0.2 });

const t2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-two",
    start: "50% 50%",
    end: "bottom 50%",
    markers: true,
    scrub: 0.5,
    duration: 10,
  },
});

t2.from(".box-three",{opacity:0,scrub:0.4,duration:10,onComplete:function(){
  gsap.set(".box-three",{opacity:1,scrub:0.4,duration:4})
  // gsap.from(".front-lottie",{opacity:1,delay:58,duration:10,scrub:0.4});
  // gsap.from(".front-lottie",{opacity:0})
}}).from(".front-lottie",{opacity:0,delay:38,duration:20,scrub:0.9})


// t3.from(".box",{opacity:0,scrub:0.4,duration:10,onComplete:function(){
//   gsap.from(".box",{opacity:1,scrub:0.4,duration:4})
// }});

t2.to(camera.position, {
  z: 1.6,
  y: -1,
  x: 3,
  duration: 8,
  scrub: 0.5,
}).to(camera.rotation, { y: 0 });

const t3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-three",
    start: "50% 50%",
    end: "bottom 50%",
    markers: true,
    scrub: 0.5,
    duration: 10,
  },
});

t3.from(".box-three",{opacity:0,scrub:0.9});

t3.to(camera.position, {
  z: 1.3,
  y: -0.6,
  x: 0,
  duration: 8,
  scrub: 0.5,
}).to(camera.rotation, { y: 0 });

t3.from(".box",{opacity:0,scrub:0.4,duration:10,onComplete:function(){
  gsap.from(".box",{opacity:1,scrub:0.4,duration:4})
  // gsap.to(".front-lottie",{opacity:0})
}});


const t4 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-four",
    start: "50% 50%",
    end: "bottom 50%",
    markers: true,
    scrub: 0.5,
    duration: 3,
  },
});

t4.to(".box",{display:"none"})
t4.to(".box-three",{display:"none"})

t4.to(camera.position, {
  z: 1.1,
  y: -0.85,
  x: -2.8,
  duration: 8,
  scrub: 0.5,
}).to(camera.rotation, { y: 0 });

const t5 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-five",
    start: "50% 50%",
    end: "bottom 50%",
    markers: true,
    scrub: 0.5,
    duration: 10,
  },
});

t4.from(".box-five",{opacity:0,scrub:0.4,duration:10,onComplete:function(){
  gsap.from(".box-five",{opacity:1,scrub:0.4,duration:4})
}});


t5.to(camera.position, {
  z: 3.3,
  y: 2,
  x: -4.7,
  duration: 10,
  scrub: 0.5,
}).to(camera.rotation, { x: -1,y:0,duration:10 });

function onWindowResize() {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;
  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
}

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  if (mixer) {
    mixer.update(0.016); // Update with your frame time
}
  frontwheel.rotation.x += 0.09;
  backwheel.rotation.x += 0.09;
  engine.rotation.x += -.09;
  renderer.render(scene, camera);
}

animate();

// Handle window resize

if (window.innerWidth < 768) {
  console.log("True");
  // Hide the desktop video and show the mobile video
  document.getElementById("desktopVideo").style.visibility = "none";
}

const intro = document.querySelector(".page2");
const video = intro.querySelector("video");
const text = intro.querySelector("h1");
//END SECTION
const section = document.querySelector(".page2");
const end = section.querySelector(".intro-title");

//SCROLLMAGIC
const controller = new ScrollMagic.Controller();

//Scenes
let scene1 = new ScrollMagic.Scene({
  duration: 20000,
  triggerElement: intro,
  triggerHook: 0,
})
  .addIndicators()
  .setPin(intro)
  .addTo(controller);

//Text Animation
const textAnim = TweenMax.fromTo(text, 1, { opacity: 1 }, { opacity: 0 });

let scene2 = new ScrollMagic.Scene({
  duration: 3000,
  triggerElement: intro,
  triggerHook: 0,
})
  .setTween(textAnim)
  .addTo(controller);

//Video Animation
let accelamount = 0.5;
let scrollpos = 0.5;
let delay = 0;
// let animationFrameId = null;

scene1.on("update", (e) => {
  scrollpos = e.scrollPos / 1000;
  // updateVideoCurrentTime();
});

setInterval(() => {
  delay += (scrollpos - delay) * accelamount;
  // console.log(scrollpos, delay);

  video.currentTime = delay;
}, 33.3);

function changeBodyClass(newClass) {
  document.body.className = newClass;
}

let cardAnimation = gsap.timeline({
  scrollTrigger: {
    trigger: ".image-gallery",
    markers: true,
    pin: true,
  },
});

cardAnimation.from(".card1", {
  opacity: 0,
  x: -30,
  duration: 0.2,
  ease: "power2.inOut",
});
cardAnimation.from(".card2", {
  opacity: 0,
  x: -30,
  duration: 0.4,
  ease: "power2.inOut",
});
cardAnimation.from(".card3", {
  opacity: 0,
  x: -30,
  duration: 0.4,
  ease: "power2.inOut",
});
