# Flight Paths

## Description

This is a simple script that calculates all the paths and the cost between two locations in a matrix.

## Usage    
### Make sure you have installed node

```bash
brew install node
```
### Build binary

```bash
npm run build
```

### Run the compiled binary

```bash
./bin/list-flight-paths "<start_location>" "<end_location>"
```

## Example

```bash
./bin/list-flight-paths "Castle Black" "Winterfell"
```

## Output

```bash
Castle Black -> Winterfell: 15
```

## Testing

### Make sure you have installed the dependencies   

```bash
npm install
```

### Run the tests

```bash
npm test
```

### Run the tests in watch mode

```bash
npm test:watch
```