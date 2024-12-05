Here's the updated **README** with the new instructions:

---

# Vamtec

Vamtec is a utility package designed to simplify and automate the process of managing commonly used file generation tasks in Node.js. It helps you quickly set up and generate Excel, CSV, and PDF files from JSON data. It also ensures that necessary dependencies like `xlsx`, `json2csv`, and `pdfkit` are installed automatically if missing.

## Features
- Automatically installs necessary dependencies (`xlsx`, `json2csv`, `pdfkit`).
- Provides functions to generate Excel, CSV, and PDF files from JSON data.
- Supports quick and seamless file generation for web applications or automation tasks.
- Lightweight and easy to integrate into existing projects.

## Installation
```bash
npm install vamtec
```

## Usage

### Automatically Install Dependencies and Load Modules

```javascript
const vamtec = require('vamtec'); // Import the vamtec library
vamtec.main(); // This will check and install required dependencies like xlsx, json2csv, pdfkit
```

This will automatically install the required packages and print:

```
xlsx is already installed.
json2csv is already installed.
pdfkit is already installed.
Modules loaded successfully!
yes...
```

### Using the Functions in Your Express Router

Here’s an example of how to use all three functions (Excel, PDF, and CSV) in an Express route:

```javascript
const express = require('express');
const router = express.Router();
const vamtec = require('vamtec'); // Import the vamtec library
const pool = require('../config/db'); // Database connection

// Route to generate reports in different formats
router.get('/', async (req, res) => {
  const format = req.query.format || 'excel'; // Default to 'excel' if format is not specified
  const title = req.query.title || 'Leave Requests'; // Get title from query parameter, default to 'Leave Requests Report'
  
  try {
    // Fetch data from the database
    const { rows: data } = await pool.query('SELECT * FROM LeaveRequests');

    // Generate the file based on the format specified in the query
    if (format === 'excel') {
      vamtec.generateExcel(data, res); // Generate Excel file
    } else if (format === 'pdf') {
      vamtec.generatePDF(data, res, title); // Generate PDF file
    } else if (format === 'csv') {
      vamtec.generateCSV(data, res); // Generate CSV file
    } else {
      res.status(400).send('Invalid format');
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
```

### Available Functions
- **`generateExcel(data, res)`**: Generates and sends an Excel file (XLSX format) from the provided data.
- **`generateCSV(data, res)`**: Generates and sends a CSV file from the provided data.
- **`generatePDF(data, res, title)`**: Generates and sends a PDF file from the provided data with an optional title.

---

This guide provides a simple way to integrate **Vamtec** into your project for file generation tasks like creating Excel, PDF, or CSV files from JSON data.