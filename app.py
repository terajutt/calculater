import os
from flask import Flask, render_template, send_from_directory

# Create the Flask application
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET")

@app.route('/')
def index():
    """Render the main calculator page"""
    return render_template('index.html')

@app.route('/download')
def download_page():
    """Render the download page"""
    return render_template('download.html')

@app.route('/download-file')
def download_file():
    """Download the zip file"""
    return send_from_directory('download', 'financial_calculator.zip', as_attachment=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
