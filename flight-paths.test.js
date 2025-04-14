const { findAllPaths } = require('./flight-paths.js');
const { LOCATIONS, COSTS } = require('./constants.js');

describe('findAllPaths', () => {
    test('finds direct path between adjacent locations', () => {
        const paths = findAllPaths('Castle Black', 'Winterfell', COSTS, LOCATIONS);
        expect(paths).toEqual([
            {
                path: ['Castle Black', 'Winterfell'],
                cost: 15
            }
        ]);
    });

    test('finds multiple paths between distant locations', () => {
        const paths = findAllPaths('Castle Black', 'Kings Landing', COSTS, LOCATIONS);
        expect(paths).toEqual(expect.arrayContaining([
            {
                path: ['Castle Black', 'Kings Landing'],
                cost: 90
            },
            {
                path: ['Castle Black', 'Winterfell', 'Kings Landing'],
                cost: 65
            },
            {
                path: ['Castle Black', 'Riverrun', 'Kings Landing'],
                cost: 150
            },
            {
                path: ['Castle Black', 'Winterfell', 'Riverrun', 'Kings Landing'],
                cost: 125
            }
        ]));
        expect(paths).toHaveLength(4);
    });

    test('throws error for invalid location names', () => {
        // Mock console.error and process.exit
        const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => { });
        const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => { });

        findAllPaths('Invalid Location', 'Kings Landing', COSTS, LOCATIONS);

        expect(mockConsoleError).toHaveBeenCalledWith('Invalid location names');
        expect(mockExit).toHaveBeenCalledWith(1);

        mockExit.mockRestore();
        mockConsoleError.mockRestore();
    });

    test('throws error when flying south to north', () => {
        // Mock console.error and process.exit
        const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => { });
        const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => { });

        findAllPaths('Kings Landing', 'Castle Black', COSTS, LOCATIONS);

        expect(mockConsoleError).toHaveBeenCalledWith('Can only fly from north to south');
        expect(mockExit).toHaveBeenCalledWith(1);

        mockExit.mockRestore();
        mockConsoleError.mockRestore();
    });

    test('throws error for invalid matrix size', () => {
        // Mock console.error and process.exit
        const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => { });
        const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => { });

        const invalidCosts = [
            [0, 15, 80],
            [0, 0, 40],
            [0, 0, 0],
            [0, 0, 0]
        ];

        findAllPaths('Castle Black', 'Kings Landing', invalidCosts, LOCATIONS);

        expect(mockConsoleError).toHaveBeenCalledWith('Matrix must be square');
        expect(mockExit).toHaveBeenCalledWith(1);

        mockExit.mockRestore();
        mockConsoleError.mockRestore();
    });

    test('throws error for matrix larger than 8x8', () => {
        const invalidCosts = [
            [0, 1, 2, 3, 4, 5, 6, 7, 8],    
            [0, 0, 2, 3, 4, 5, 6, 7, 8],
            [0, 0, 0, 3, 4, 5, 6, 7, 8],
            [0, 0, 0, 0, 4, 5, 6, 7, 8],
            [0, 0, 0, 0, 0, 5, 6, 7, 8],
            [0, 0, 0, 0, 0, 0, 6, 7, 8],
            [0, 0, 0, 0, 0, 0, 0, 7, 8],
            [0, 0, 0, 0, 0, 0, 0, 0, 8],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        // Mock console.error and process.exit
        const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => { });
        const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => { });

        findAllPaths('Castle Black', 'Kings Landing', invalidCosts, LOCATIONS);

        expect(mockConsoleError).toHaveBeenCalledWith('Matrix size cannot exceed 8x8');
        expect(mockExit).toHaveBeenCalledWith(1);
    });
}); 
