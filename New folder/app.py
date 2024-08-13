# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, origins = ['http://localhost:3000'])
@app.route('/calculate', methods=['POST'])
@cross_origin()
def calculate_sum():
    data = request.json
    number1 = int(data['number1'])
    number2 = int(data['number2'])
    sum = number1 + number2
    return jsonify({'sum': sum})

if __name__ == '__main__':  
    app.run(debug=True)
