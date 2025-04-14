#!/usr/bin/env node

const { findAllPaths } = require('./flight-paths.js');
const { LOCATIONS, COSTS } = require('./constants.js');

function main() {
    // Check command line arguments
    if (process.argv.length !== 4) {
        console.error('Usage: ./list-flight-paths "[location1]" "[location2]"');
        process.exit(1);
        return;
    }

    const start = process.argv[2];
    const end = process.argv[3];

    const paths = findAllPaths(start, end, COSTS, LOCATIONS);
    
    // Sort paths by cost (optional)
    paths.sort((a, b) => a.cost - b.cost);
    
    // Print all paths
    paths.forEach(({ path, cost }) => {
        console.log(`${path.join(' -> ')}: ${cost}`);
    });
}

main(); 