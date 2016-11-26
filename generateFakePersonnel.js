const generateAndAddNoise = (number) => {
  return number + (Math.random() - .5) * number * 0.005;
}

let datum = {};
for (let i = 1; i < 50; i ++ ) {
  datum[i] = {
    name: `Name${i}`,
    position: {
      lat: generateAndAddNoise(37.824),
      lng: generateAndAddNoise(127.597),
    },
  }
}

console.log(datum);
