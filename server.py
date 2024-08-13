from flask import Flask, request, jsonify
from flask_cors import CORS
import extract_words as extract

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def extract_text():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'})
    
    image_file = request.files['image']
    if image_file.filename == '':
        return jsonify({'error': 'No image selected'})
    
    try:
        extracted_text = extract_text_from_image(image_file)
        extract.return_audio(extracted_text)
        return jsonify({'data': extracted_text})
    except Exception as e:
        return jsonify({'error': str(e)})

def extract_text_from_image(image_file):
    extract.extract_words(image_file.filename)
    extract.box_characters()
    return extract.predict_text_from_all_folders()

if __name__ == '__main__':
    app.run(debug=True)
