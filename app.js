    const fs = require('fs'); // Import Node.js core module
    const path = require('path');
    const dirpath =path.join(__dirname,'/input');

    const files = [];  // Create an empty array to store the paths of the input files
    // Loop from 1 to 3 to create the paths for the 3 text files
    for (let i = 1; i <= 3; i++) {
        files.push(path.join(dirpath, `a${i}.txt`));
    }
    // Read all files and split their contents into lines
    const allLines = files.map(file =>
        fs.readFileSync(file, 'utf8')
            .split(/\r?\n/)
            .filter(line => line.trim() !== '')
    );
    // Keep track of the current position in each file
    const positions = [0, 0, 0];

    let result = ''; // Create an empty string to store the final output
    let i = 1; // Set the initial number of lines to copy from each file
    let copiedSomething = true; // Control the loop and check if there are more lines to copy

    // Continue until all files have been completely copied
    while (copiedSomething) 
        {
        copiedSomething = false;
        // Go through each of the 3 files
        for (let j = 0; j < 3; j++) 
            {
            // Copy i lines from the current file
            for (let k = 0; k < i; k++) 
                {
                // Check if the current file still has lines available
                if (positions[j] < allLines[j].length) 
                    {
                    result += allLines[j][positions[j]] + '\n';
                    positions[j]++;
                    copiedSomething = true;
                }
            }
        }
        i++; // Increase the number of lines for the next round
    }
    fs.writeFileSync('output.txt', result, 'utf8'); // Write the final result into a new output file
    console.log('Copy completed successfully!'); // Display a success message in the terminal