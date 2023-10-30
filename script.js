if (window.innerWidth < 768) {
  console.log("True");
  // Hide the desktop video and show the mobile video
  document.getElementById("desktopVideo").style.visibility = "none";
  //   document.getElementById("mobileVideo").style.display = "block";
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
