// dynamic pricing model for v2

function calculateContributions() {
    // Given parameters
    const nftPrice = 0.5;
    let reservedThresholdValue = nftPrice * 2.5;
    const totalFractionsOfNFT = 40; // random number between 10 to 50 multiples of 10
    const dynamicPriceRandom = 5684; // random number between 1000 to 10000
    const totalAvailableContributions = Math.round(1.5 * totalFractionsOfNFT);
    const dynamicPriceRandomValue = nftPrice / dynamicPriceRandom;

    let initialContributionPrice = nftPrice / totalAvailableContributions;
    console.log(reservedThresholdValue, '1');
    console.log(initialContributionPrice, '2');
    console.log(totalAvailableContributions, '3')
    console.log(dynamicPriceRandomValue, '4')

    // Initialize an array to store contribution values
    let contributions = [initialContributionPrice];

    // Calculate subsequent contributions until reaching the reserved threshold value
    while (calculateTotalValue(contributions) <= reservedThresholdValue) {
        let lastContribution = contributions[contributions.length - 1];
        let nextContribution = lastContribution + dynamicPriceRandomValue;
        contributions.push(nextContribution);
    }

    // Once the threshold is reached, set the remaining contributions to the last calculated value
    let remainingContributions = totalAvailableContributions - contributions.length + 1;
    contributions = contributions.concat(Array.from({ length: remainingContributions }, () => contributions[contributions.length - 1]));

    return contributions;
}

// Function to calculate the total value of contributions
function calculateTotalValue(contributions) {
    return contributions.reduce((total, contribution) => total + contribution, 0);
}

// Call the function and get the contributions array
const contributionsArray = calculateContributions();

// Call the function to calculate the total value
const totalValue = calculateTotalValue(contributionsArray);

// Print the contributions and total value
console.log("Contributions:", contributionsArray);
console.log("Total Value:", totalValue);