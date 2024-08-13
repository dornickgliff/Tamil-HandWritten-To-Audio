import cv2
import numpy as np
import os
import tensorflow as tf
from sklearn.preprocessing import LabelBinarizer 
import pandas as pd
from gtts import gTTS

def extract_words(input_image_path, output_folder='output_words'):
    try:
        
        img = cv2.imread(input_image_path)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    except Exception as e:
        print(f"Error loading image: {e}")
        return 


    h, w, c = img.shape
    if w > 1000:
        new_w = 1000
        ar = w / h
        new_h = int(new_w / ar)
        img = cv2.resize(img, (new_w, new_h), interpolation=cv2.INTER_AREA)

    img_gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    ret, thresh = cv2.threshold(img_gray, 80, 255, cv2.THRESH_BINARY_INV)
    

    kernel = np.ones((3, 36), np.uint8)
    dilated = cv2.dilate(thresh, kernel, iterations=1)
    

    contours, _ = cv2.findContours(dilated.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    sorted_contours_lines = sorted(contours, key=lambda ctr: cv2.boundingRect(ctr)[0])


    os.makedirs(output_folder, exist_ok=True)


    for i, ctr in enumerate(sorted_contours_lines):
        x, y, w, h = cv2.boundingRect(ctr)
        roi = img[y:y+h, x:x+w]
        cv2.imwrite(os.path.join(output_folder, f'boxed_word_{i}.png'), roi)


def box_characters(input_folder='output_words', output_folder='char_images'):

    for folder_index, filename in enumerate(sorted(os.listdir(input_folder)), start=1):
        if filename.endswith(".png"):
            image_path = os.path.join(input_folder, filename)
            img = cv2.imread(image_path)
            img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

            ret, thresh = cv2.threshold(img_gray, 80, 255, cv2.THRESH_BINARY_INV)
            

            kernel = np.ones((3, 3), np.uint8)
            dilated = cv2.dilate(thresh, kernel, iterations=1)

            contours, _ = cv2.findContours(dilated.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)           
            contours = sorted(contours, key=lambda ctr: cv2.boundingRect(ctr)[0])
            
            image_output_folder = os.path.join(output_folder, f'char_images{folder_index}')
            os.makedirs(image_output_folder, exist_ok=True)

            for i, contour in enumerate(contours):
                x, y, w, h = cv2.boundingRect(contour)
                char_img = img[y:y+h, x:x+w]
                cv2.imwrite(os.path.join(image_output_folder, f'boxed_char_{i}.png'), char_img)

# input_image_path = 'pic2.png'
# output_words_folder = 'output_words'
# extract_words(input_image_path, output_words_folder)

# output_characters_folder = 'char_images'
# box_characters(output_words_folder, output_characters_folder)

loaded_model = tf.keras.models.load_model("my_model3")

label_binarizer = LabelBinarizer()
label_binarizer.fit(range(156))

df = pd.read_excel('Book1.xlsx')
class_to_character = df.set_index('Class')['Character'].to_dict()
predicted_labels=[]
def load_and_preprocess_images_from_directory(directory, img_size=(28, 28)):
    images = []
    for filename in os.listdir(directory):
        if filename.endswith(".png") or filename.endswith(".tiff"):  
            image_path = os.path.join(directory, filename)
            image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
            image = cv2.resize(image, img_size)
            image = image.astype("float32") / 255.0
            images.append(image)
    images = np.array(images)
    images = np.expand_dims(images, axis=-1)  
    return images

def predict_text_from_all_folders(char_images_folder='char_images'):
    predicted_text = ""
    for subfolder in os.listdir(char_images_folder):
        subfolder_path = os.path.join(char_images_folder, subfolder)
        if os.path.isdir(subfolder_path):
            subfolder_text = predict_text_from_images(subfolder_path)
            predicted_text += subfolder_text + " " 
    return predicted_text.strip()  

def predict_text_from_images(image_directory):
    images = load_and_preprocess_images_from_directory(image_directory)
    predictions = loaded_model.predict(images)
    predicted_labels = [label_binarizer.classes_[np.argmax(prediction)] for prediction in predictions]
    predicted_text = ""
    text=[]
    # print(len(predicted_labels))
    i=0
    while(i<len(predicted_labels)):
        if predicted_labels[i]==119 or predicted_labels[i]==118 or predicted_labels[i]==120:
            text.append(predicted_labels[i+1])
            text.append(predicted_labels[i])
            i=i+2
        else:
            text.append(predicted_labels[i])
            i=i+1
            
    # print(text)
    for class_index in text:
        predicted_text += class_to_character.get(class_index, "")
    return predicted_text

def return_audio(predicted_text):
    language = 'ta'
    tts = gTTS(text=predicted_text, lang=language, slow=True)
    delete_folder("char_images")
    delete_folder("output_words")
    tts.save("output3.mp3")

    os.system("start output3.mp3")

import shutil

def delete_folder(folder_path):
    try:
        shutil.rmtree(folder_path)
    except Exception as e:
        print(f"Error deleting folder {folder_path}: {e}")

