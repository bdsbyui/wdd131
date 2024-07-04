const canvas = document.querySelector("#canvas");

if (canvas.getContext) {
  const ctx = canvas.getContext("2d");
  // ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.save();

  const imgVanessa = new Image();
  imgVanessa.src = "../assets/images/vanessa.jpg";
  const imgVanessaAR = imgVanessa.width / imgVanessa.height;
  const imgBryant = new Image();
  imgBryant.src = "../assets/images/bryant.jpg";
  const imgBryantAR = imgBryant.width / imgBryant.height;
  const imgJacob = new Image();
  imgJacob.src = "../assets/images/jacob.jpg";
  const imgJacobAR = imgJacob.width / imgJacob.height;
  const imgCeleste = new Image();
  imgCeleste.src = "../assets/images/celeste.jpg";
  const imgCelesteAR = imgCeleste.width / imgCeleste.height;
  const imgHannah = new Image();
  imgHannah.src = "../assets/images/hannah.jpg";
  const imgHannahAR = imgHannah.width / imgHannah.height;
  const imgAaron = new Image();
  imgAaron.src = "../assets/images/aaron.jpg";
  const imgAaronAR = imgAaron.width / imgAaron.height;
  const imgTimothy = new Image();
  imgTimothy.src = "../assets/images/timothy.jpg";
  const imgTimothyAR = imgTimothy.width / imgTimothy.height;

  const leftClip = new Path2D("M 601,249 c -600,600, -600,-600, 1,1");
  const rightClip = new Path2D("M 599,249 c 600,600, 600,-600, -1,1");
  const roundClip = new Path2D();
  roundClip.arc(600, 250, 60, 0, Math.PI * 2, true);

  const svgPath = document.querySelector("#infinityLoopPath");
  const totalLength = svgPath.getTotalLength();

  function drawImages() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.clip(leftClip);
    ctx.drawImage(imgVanessa, 25, 10, 1200, 1200 / (imgVanessa.width / imgVanessa.height));
    ctx.restore();

    ctx.save();
    ctx.clip(rightClip);
    ctx.drawImage(imgBryant, 90, 70, 1100, 1100 / (imgBryant.width / imgBryant.height));
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = "#488737";
    ctx.lineWidth = 30;
    ctx.stroke(new Path2D(svgPath.getAttribute("d")));
    ctx.restore();

    // animateJacob();
  }

  function animateJacob() {
    const duration = 60000;
    const startTime = performance.now();

    function animate(time) {
      const elapsedTime = time - startTime;
      const progress = (elapsedTime % duration) / duration;
      const currentLength = progress * totalLength;
      const point = svgPath.getPointAtLength(currentLength);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawImages();

      // ctx.save();
      // ctx.translate(point.x, point.y);
      // ctx.beginPath();
      // ctx.arc(0, 0, 60, 0, Math.PI * 2, true);
      // ctx.clip();
      // ctx.drawImage(
      //   imgJacob, 100, -100, 600, 600 / (imgJacob.width / imgJacob.height)
      // );
      // ctx.restore();

      ctx.beginPath();
      ctx.arc(point.x, point.y, 60, 0, Math.PI * 2, true);
      ctx.strokeStyle = "#488737";
      ctx.lineWidth = 20;
      ctx.stroke();

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  let imagesLoaded = 0;

  imgVanessa.onload = imgBryant.onload = imgJacob.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === 3) drawImages();
  };

  imgVanessa.onerror = () => {
    console.error("Vanessa image failed to load.");
  };

  imgBryant.onerror = () => {
    console.error("Bryant image failed to load.");
  };

  imgJacob.onerror = () => {
    console.error("Jacob image failed to load.");
  };
}