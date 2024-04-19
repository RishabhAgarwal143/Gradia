import cv2
import numpy as np
from pdf2image import convert_from_path
import pytesseract
from PIL import Image
import os
import sys
import PyPDF2
from assistants_handler import AssistantHandler
import json
import shutil

class PDFParser:
    def __init__(self, file_path):
        self.use_gpu = cv2.cuda.getCudaEnabledDeviceCount() > 0
        self.pdf_path = file_path

        self.script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in

        # create a folder for output inside the script folder
        self.output_dir = os.path.join(self.script_dir, 'content')

        # folder inside the output folder for batch texts
        self.batch_texts_dir = os.path.join(self.output_dir, 'batch_texts')

        # folder inside the output folder for batch images
        self.batch_images_dir = os.path.join(self.output_dir, 'batch_images')

        file = open(self.pdf_path, 'rb')
        pdfReader = PyPDF2.PdfReader(file)

        # count number of pages
        self.totalPages = len(pdfReader.pages)
        file.close()
        # print number of pages
        # print(f"Total Pages: {totalPages}")


        # create the directories
        os.makedirs(self.output_dir, exist_ok=True)
        os.makedirs(self.batch_texts_dir, exist_ok=True)
        os.makedirs(self.batch_images_dir, exist_ok=True)
        
    def format_checker(self, response):
        # load in json response:

        # convert string to json
        response = response.lstrip("```json")
        response = response.rstrip("```")
        
        print("NEW RESPONSE")
        print(response)
        json_response = json.loads(response)

        message_data = json_response["message"]

        out = dict()

        for key, value in message_data.items():
            print(key, value)
            if key == "assistant" or key == "topic":
                continue
            if key == "Grades":
                out[key] = value
            else:
                val1, val2 = value.split(",")
                val1 = val1.strip()
                val2 = val2.strip()
                # print("VAL1", val1)
                # print("VAL2", val2)


                if val2 == "None":
                    out[key] = (val1, None)
                else:
                    out[key] = (val1, int(val2))


        return out
        # for key, value in message_data.items():
        #     print(f"{key}: {value}")


    # Function to preprocess an image with OpenCV
    def preprocess_image(self, image):
        image_cv = np.array(image)
        if self.use_gpu:
            # Upload image to GPU
            image_gpu = cv2.cuda_GpuMat(image_cv)
            # Convert to grayscale
            gray_gpu = cv2.cuda.cvtColor(image_gpu, cv2.COLOR_BGR2GRAY)
            # Download image from GPU to CPU
            image_cv = gray_gpu.download()
        else:
            # Convert to grayscale
            image_cv = cv2.cvtColor(image_cv, cv2.COLOR_BGR2GRAY)
        return Image.fromarray(image_cv)

    # Function to process a batch of pages as images
    def process_batch(self, start, end, batch_number):
        # Convert a range of pages to images
        images = convert_from_path(self.pdf_path, first_page=start, last_page=end, dpi=200)

        # Perform OCR on each image after preprocessing
        for i, image in enumerate(images):
            # Preprocess the image
            image = self.preprocess_image(image)

            # Perform OCR using pytesseract
            text = pytesseract.image_to_string(image)

            # Save the text in a file
            text_file_path = os.path.join(self.batch_texts_dir, f'batch_{batch_number}_page_{start + i}.txt')
            with open(text_file_path, 'w') as file:
                file.write(text)

            image_file_path = os.path.join(self.batch_images_dir, f'batch_{batch_number}_page_{start + i}.png')
            image.save(image_file_path)

        del images

    def batch_processing(self, totalPages, batch_size = 1):

        batches = (totalPages + batch_size - 1) // batch_size

        for batch in range(batches):
            start_page = batch * batch_size + 1
            end_page = min(start_page + batch_size - 1, totalPages)
            self.process_batch(start_page, end_page, batch)


        combined_text = ''
        for i in range(batches):
            text_file_path = os.path.join(self.batch_texts_dir, f'batch_{i}_page_{i+1}.txt')
            with open(text_file_path, 'r') as file:
                combined_text += file.read() + '\n'
            
        # combined_text_path = os.path.join(output_dir, 'combined_text.txt')
        # with open(combined_text_path, 'w') as file:
        #     file.write(combined_text)
        
        return combined_text



    def parser(self, subject_id, userinfo_id):
        

        combined_text = self.batch_processing(self.totalPages, batch_size=1)

        assistant = AssistantHandler()
        response = assistant.sendcall(combined_text)

        # check format of response
        # print(response)

        n = 5
        for i in range(n):
            try:
                grade_data = self.format_checker(response)
                break
            except:
                if i == n-1:
                    raise Exception("Could not format response")
                response = assistant.sendcall("STRICTLY FOLLOW THE JSON SCHEMA: " + combined_text)


        # for key, value in grade_data.items():
        #     print(f"{key}: {value}")


        # clear all created directories and files
        shutil.rmtree(self.output_dir)
        return grade_data

    # def grade_formatter(grade_data):
    #     # format the grade data
    #     for subject, value in grade_data.items():
        


if __name__ == '__main__':
    parser = PDFParser()
    grade_data = parser.parser(sys.argv[1], sys.argv[2], sys.argv[3])
    print(grade_data)

