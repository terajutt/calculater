# Financial Calculator Web Application

A responsive web application featuring EMI, GST, and basic arithmetic calculators built with HTML, CSS, and JavaScript.

## Features

### EMI Calculator
- Calculate monthly loan payments (EMI)
- Input loan amount, interest rate, and loan tenure
- View breakdown of principal vs. interest
- Visual representation of payment distribution

### GST Calculator
- Add GST to an amount or extract GST from an inclusive amount
- Support for standard Indian GST rates (3%, 5%, 12%, 18%, 28%)
- View CGST and SGST breakdowns
- Visual representation of base amount vs. GST

### Arithmetic Calculator
- Perform basic arithmetic operations (addition, subtraction, multiplication, division)
- Full keyboard support
- Error handling for operations like division by zero

## Technologies Used

- HTML5
- CSS3 with Bootstrap for responsive design
- JavaScript for calculations and interactivity
- Flask (Python) for web server
- Font Awesome for icons

## How to Run

1. Ensure you have Python installed (Python 3.6 or higher recommended)
2. Install required packages:
   ```
   pip install flask
   ```
3. Run the application:
   ```
   python app.py
   ```
4. Open your browser and navigate to `http://localhost:5000`

## File Structure

- `app.py` - Flask application entry point
- `main.py` - Python application entry point
- `templates/` - HTML templates
  - `index.html` - Main application page
  - `download.html` - Download page
- `static/` - Static assets
  - `css/custom.css` - Custom CSS styles
  - `js/` - JavaScript files for each calculator functionality

## Customization

You can easily customize the application by modifying the following:

- Update the CSS in `static/css/custom.css` for styling changes
- Modify calculator logic in respective JavaScript files
- Add new calculators by creating a new tab in `index.html` and corresponding JavaScript file

## License

This project is open source and available for personal and commercial use.

## Credits

Created by [Your Name]