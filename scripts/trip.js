// ------------------------------------------------------------
// Variables
// ------------------------------------------------------------

const driverName = "Theo Symonds";
const distanceMiles = 520;
const mpg = 30;
const gasPrice = 3.79;
const fuelCapacity = 12;
const isRoundTrip = true;

let totalDistance;

// ------------------------------------------------------------
// Functions
// ------------------------------------------------------------

function calculateGallonsNeeded(distance, milesPerGallon) {
  return distance / milesPerGallon;
}

function calculateFuelCost(gallons, pricePerGallon) {
  return gallons * pricePerGallon;
}

// ------------------------------------------------------------
// Derived/Calculated Values
// ------------------------------------------------------------

if (isRoundTrip) {
  totalDistance = distanceMiles * 2;
} else {
  totalDistance = distanceMiles;
}

console.log("Total Distance:", totalDistance, "miles");

const gallonsNeeded = calculateGallonsNeeded(totalDistance, mpg);
const totalFuelCost = calculateFuelCost(gallonsNeeded, gasPrice);
const maxMilesPerTank = fuelCapacity * mpg;

// ------------------------------------------------------------
// Main Program Execution
// ------------------------------------------------------------

console.log("Road Trip Planning Report");
console.log("-------------------------");
console.log("Driver Name:", driverName);
console.log("One-Way Distance:", distanceMiles, "miles");
console.log("Round Trip:", isRoundTrip);
console.log("Max Miles Per Tank:", maxMilesPerTank, "miles");
console.log("Outbound Gas Stops:");

let stopNumber = 1;
let milesTraveled = maxMilesPerTank;

if (distanceMiles <= maxMilesPerTank) {
  console.log("No gas stops needed before reaching the destination.");
}

while (milesTraveled < distanceMiles) {
  const gallonsUsedSoFar = calculateGallonsNeeded(milesTraveled, mpg);
  const runningFuelCost = calculateFuelCost(gallonsUsedSoFar, gasPrice);

  console.log(
    `Stop ${stopNumber}: ${milesTraveled} miles traveled, estimated gas spent $${runningFuelCost.toFixed(2)}`,
  );

  stopNumber += 1;
  milesTraveled += maxMilesPerTank;
}

console.log("-------------------------");
console.log(`Driver: ${driverName}`);
console.log(`Total Distance: ${totalDistance} miles`);
console.log(`Estimated Gallons Needed: ${gallonsNeeded.toFixed(2)} gallons`);
console.log(`Estimated Total Fuel Cost: $${totalFuelCost.toFixed(2)}`);
