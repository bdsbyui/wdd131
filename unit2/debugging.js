const PI = 3.14;

function putCircleArea(radius) {
    const area = PI * radius * radius;
    console.log(
        `The area of a circle with a radius of ${
            radius} units is ${
                area} square units.`
    );
}

putCircleArea(3);
putCircleArea(4);
