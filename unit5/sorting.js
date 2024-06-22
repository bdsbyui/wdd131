// sorting.js
const hikes = [
  {
    "name": "Bechler Falls",
    "imgSrc": "//byui-cit.github.io/cit261/examples/falls.jpg",
    "imgAlt": "Image of Bechler Falls",
    "distance": "3 miles",
    "difficulty": "Easy",
    "description": "Beautiful short hike along the Bechler river to Bechler Falls",
    "directions": "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to the end of the Cave Falls road. There is a parking area at the trailhead."
  },
  {
    "name": "Teton Canyon",
    "imgSrc": "//byui-cit.github.io/cit261/examples/falls.jpg",
    "imgAlt": "Image of Teton Canyon",
    "distance": "3 miles",
    "difficulty": "Easy",
    "description": "Beautiful short (or long) hike through Teton Canyon.",
    "directions": "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Road for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead."
  },
  {
    "name": "Alaska Basin",
    "imgSrc": "//byui-cit.github.io/cit261/examples/falls.jpg",
    "imgAlt": "Image of Alaska Basin",
    "distance": "17 miles",
    "difficulty": "Difficult",
    "description": "Beautiful hike through Teton Canyon, up the Devils Staircase, to Alaska Basin",
    "directions": "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Road for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead."
  },
  {
    "name": "North Menan Butte",
    "imgSrc": "//byui-cit.github.io/cit261/examples/falls.jpg",
    "imgAlt": "Image of Menan Butte",
    "distance": "3.4 miles",
    "difficulty": "Moderate",
    "description": "Beautiful hike up and around the Menan Butte, an extinct volcano cone",
    "directions": "Take Main Street West out of Rexburg. Continue onto Highway 33. Travel west for about 8 miles until you see E Butte Rd on the South. Turn left and travel about 1 mile, turn left at your first opportunity onto Twin Butte Road. Follow that road for about 2 miles. The trailhead parking lot will be on the left"
  },
  {
    "name": "Denanda Falls",
    "imgSrc": "//byui-cit.github.io/cit261/examples/falls.jpg",
    "imgAlt": "Image of Bechler Falls",
    "distance": "7 miles",
    "difficulty": "Moderate",
    "description": "Beautiful hike through Bechler meadows river to Denanda Falls",
    "directions": "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead."
  }
];
const simpleList = ["oranges", "grapes", "lemons", "apples", "Bananas", "watermelons", "coconuts", "broccoli", "mango"];

// Activity 1
const simpleSort = simpleList.sort().join(", ");
console.log(`simpleSort: ${simpleSort}`);

function compareFunction(a, b) {
  if (a < b) return -1;
  else if (a > b) return 1;
  return 0;
}
const anotherSort = simpleList.sort(compareFunction).join(", ");
console.log(`anotherSort: ${anotherSort}`);

function reverseCompareFunction(a, b) {
  if (a > b) return -1;
  else if (a < b) return 1;
  return 0;
}
const reverseSort = simpleList.sort(reverseCompareFunction).join(", ");
console.log(`reverseSort: ${reverseSort}`);


const caseInsensitiveSort = simpleList.sort(
  (a, b) => a.toLowerCase().localeCompare(b.toLowerCase())
).join(", ");
console.log(`caseInsensitiveSort: ${caseInsensitiveSort}`);

// Activity 2
function isIncluded(subject, test) {
  return subject.toLowerCase().includes(test.toLowerCase());
}
const stringFilter = function(string, query) {
  return isIncluded(string, query);
};
const filteredList = function(list, filter, query) {
  return list.filter((item) => filter(item, query));
};
console.log(`"b" in simpleList: ${
  filteredList(simpleList, stringFilter, "b").join(", ")
}`);
console.log(`"an" in simpleList: ${
  filteredList(simpleList, stringFilter, "an").join(", ")
}`);

// Activity 3
const objectFilter = function(object, query) {
  return (
    isIncluded(object.name, query) ||
    isIncluded(object.difficulty, query) ||
    isIncluded(object.description, query) //||
    // object.tags.find((tag) = tag.toLowerCase().includes(query.toLowerCase()))
  );
};
const filteredHikes = function(query) {
  return filteredList(hikes, objectFilter, query)
    .sort((a, b) => 
      parseFloat(a.distance.slice(0, -6)) -
      parseFloat(b.distance.slice(0, -6))
    ).map(hike => hike.name);
}
console.log(`"yellowstone" in hikes: ${
  filteredHikes("yellowstone").join(", ")
}`);
console.log(`"moderate" in hikes: ${filteredHikes("moderate").join(", ")}`);
console.log(`"al" in hikes: ${filteredHikes("al").join(", ")}`);
