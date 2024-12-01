const { exec } = require("child_process");
const readline = require("readline");

// Function to check if a package is installed
function isPackageInstalled(packageName) {
  try {
    require.resolve(packageName);
    return true;
  } catch (e) {
    return false;
  }
}

// Function to install dependencies
function installDependencies(packageName, callback) {
  if (isPackageInstalled(packageName)) {
    console.log(`${packageName} is already installed.`);
    callback(); // Start the server directly if already installed
  } else {
    console.log(`${packageName} is not installed. Installing now...`);
    exec(`npm install ${packageName}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(stdout);
      console.log(`${packageName} has been installed successfully!`);
      callback(); // Start the server after installation
    });
  }
}

// Function to start the Express server
function startServer() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter the port number to start the server: ", (port) => {
    const express = require("express");
    const app = express();

    app.get("/", (req, res) => {
      res.send("Hello, World!");
    });

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

    rl.close();
  });
}

// Main function to handle installation and server startup
function main() {
  installDependencies("express", startServer);
}

// Export main function for external use
module.exports = main;

// Run main function if this file is executed directly
if (require.main === module) {
  main();
}
