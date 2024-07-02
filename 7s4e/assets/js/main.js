const canvas = document.querySelector("#canvas");

if (canvas.getContext) {
  const ctx = canvas.getContext("2d");

  const imgVanessa = new Image();
  imgVanessa.src = "../assets/images/vanessa.jpg";
  const imgVanessaAR = imgVanessa.width / imgVanessa.height;
  imgVanessa.onload = () => {
    const leftPath = "M 600,250 c -600,600, -600,-600, 0,0";
    const rightPath = "M 600,250 c 600,600, 600,-600, 0,0";
    const leftClip = new Path2D(leftPath);
    ctx.beginPath();
    ctx.stroke(leftClip);
    ctx.clip();

    ctx.drawImage(imgVanessa, 30, 0, 1300, 1300/imgVanessaAR);
    const d = "M 600,250 c -600,600, -600,-600, 0,0 s 600,-600, 0,0";
    const infinityLoop = new Path2D(d);
    ctx.strokeStyle = "#488737";
    ctx.lineWidth = 10;
    ctx.stroke(infinityLoop);
  };



  // ctx.fillStyle = "rgb(200 0 0)";
  // ctx.fillRect(10, 10, 50, 50);
  // ctx.fillStyle = "rgb(0 0 200 / 50%)";
  // ctx.fillRect(30, 30, 50, 50);

  // ctx.fillRect(25, 25, 100, 100);
  // ctx.clearRect(45, 45, 60, 60);
  // ctx.strokeRect(50, 50, 50, 50);

  // ctx.beginPath();
  // ctx.moveTo(75, 50);
  // ctx.lineTo(100, 75);
  // ctx.lineTo(100, 25);
  // ctx.fill();

  // ctx.beginPath();
  // ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
  // ctx.moveTo(110, 75);
  // ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
  // ctx.moveTo(65, 65);
  // ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
  // ctx.moveTo(95, 65);
  // ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
  // ctx.stroke();

  // // Filled triangle
  // ctx.beginPath();
  // ctx.moveTo(25, 25);
  // ctx.lineTo(105, 25);
  // ctx.lineTo(25, 105);
  // ctx.fill();
  // // Stroked triangle
  // ctx.beginPath();
  // ctx.moveTo(125, 125);
  // ctx.lineTo(125, 45);
  // ctx.lineTo(45, 125);
  // ctx.closePath();
  // ctx.stroke();

  // for (let i = 0; i < 4; i++) {
  //   for (let j = 0; j < 3; j++) {
  //     ctx.beginPath();
  //     const x = 25 + j * 50; // x coordinate
  //     const y = 25 + i * 50; // y coordinate
  //     const radius = 20; // Arc radius
  //     const startAngle = 0; // Starting point on circle
  //     const endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
  //     const counterclockwise = i % 2 !== 0; // clockwise or counterclockwise

  //     ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);

  //     if (i > 1) {
  //       ctx.fill();
  //     } else {
  //       ctx.stroke();
  //     }
  //   }
  // }

  // Quadratic curves example
  // ctx.beginPath();
  // ctx.moveTo(75, 25);
  // ctx.quadraticCurveTo(25, 25, 25, 62.5);
  // ctx.quadraticCurveTo(25, 100, 50, 100);
  // ctx.quadraticCurveTo(50, 120, 30, 125);
  // ctx.quadraticCurveTo(60, 120, 65, 100);
  // ctx.quadraticCurveTo(125, 100, 125, 62.5);
  // ctx.quadraticCurveTo(125, 25, 75, 25);
  // ctx.stroke();

  // // Cubic curves example
  // ctx.beginPath();
  // ctx.moveTo(75, 40);
  // ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
  // ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
  // ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
  // ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
  // ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
  // ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
  // ctx.fill();

  // ctx.beginPath();
  // ctx.moveTo(x, y + radius);
  // ctx.arcTo(x, y + height, x + radius, y + height, radius);
  // ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  // ctx.arcTo(x + width, y, x + width - radius, y, radius);
  // ctx.arcTo(x, y, x, y + radius, radius);
  // ctx.stroke();

  // ctx.fillRect(0, 0, 150, 150); // Draw a Black rectangle with default settings
  // ctx.save(); // Save the original default state
  // ctx.fillStyle = "#09F"; // Make changes to saved settings
  // ctx.fillRect(15, 15, 120, 120); // Draw a Blue rectangle with new settings
  // ctx.save(); // Save the current state
  // ctx.fillStyle = "#FFF"; // Make changes to saved settings
  // ctx.globalAlpha = 0.5;
  // ctx.fillRect(30, 30, 90, 90); // Draw a 50%-White rectangle with newest settings
  // ctx.restore(); // Restore to previous state
  // ctx.fillRect(45, 45, 60, 60); // Draw a rectangle with restored Blue setting
  // ctx.restore(); // Restore to original state
  // ctx.fillRect(60, 60, 30, 30); // Draw a rectangle with restored Black setting

}



