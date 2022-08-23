const html = document.documentElement;
const canvas = document.querySelector(".airpods-scrolling");
const context = canvas.getContext("2d");

const currentFrame = (index) =>
  `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index
    .toString()
    .padStart(4, "0")}.jpg`;

const TOTAL_IMGS = 148;
canvas.height = 770;
canvas.width = 1158;

// Preload images for smooth scrolling
const preloadImages = () => {
  for (let i = 1; i < TOTAL_IMGS; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

// Load first image on page load
const img = new Image();
img.src = currentFrame(1);
img.onload = function () {
  context.drawImage(img, 0, 0);
};

const updateImage = (index) => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
};

// Animation effect on scroll

window.addEventListener("scroll", () => {
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;

  //scrolling progress
  const scrollProgress = scrollTop / maxScrollTop;

  const frameIndex = Math.min(
    TOTAL_IMGS - 1,
    Math.floor(scrollProgress * TOTAL_IMGS)
  );

  requestAnimationFrame(() => updateImage(frameIndex + 1));
});

preloadImages();
