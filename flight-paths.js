const { MAX_MATRIX_SIZE } = require('./constants.js');

function validateMatrix(costs) {
    // Check if matrix is square
    const size = costs.length;
    if (size > MAX_MATRIX_SIZE) {
        console.error('Matrix size cannot exceed 8x8');
        process.exit(1);
        return;
    }

    // Check if each row has correct length and is upper triangular
    for (let i = 0; i < size; i++) {
        if (costs[i].length !== size) {
            console.error('Matrix must be square');
            process.exit(1);
            return;
        }
        
        // Verify lower triangular part is all zeros
        for (let j = 0; j <= i; j++) {
            if (costs[i][j] !== 0) {
                console.error('Invalid matrix: lower triangular part must be zeros');
                process.exit(1);
                return;
            }
        }
    }
}

function findAllPaths(start, end, costs, locations) {
    // Add matrix validation at the start
    validateMatrix(costs);
    
    const startIndex = locations.indexOf(start);
    const endIndex = locations.indexOf(end);
    
    // Validate inputs
    if (startIndex === -1 || endIndex === -1) {
        console.error('Invalid location names');
        process.exit(1);
        return;
    }
    
    if (startIndex >= endIndex) {
        console.error('Can only fly from north to south');
        process.exit(1);
        return;
    }

    const paths = [];
    
    function findPaths(current, path, totalCost) {
        if (current === endIndex) {
            paths.push({ path: [...path], cost: totalCost });
            return;
        }
        
        // Try all possible next destinations
        for (let next = current + 1; next <= endIndex; next++) {
            if (costs[current][next] > 0) {
                path.push(locations[next]);
                findPaths(next, path, totalCost + costs[current][next]);
                path.pop();
            }
        }
    }
    
    findPaths(startIndex, [locations[startIndex]], 0);
    return paths;
}

// Export the necessary functions and constants
module.exports = {
    findAllPaths,
}; 