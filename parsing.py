from flask import Flask, send_file,jsonify
from flask_cors import CORS
import xml.etree.ElementTree as ET
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all origins
tree = ET.parse('employees.xml')
root = tree.getroot()


@app.route('/get-emp-id')
def get_xml():
    # # Replace with the correct path to your XML file
    # xml_path = os.path.join(os.getcwd(), 'employees.xml')
    # return send_file(xml_path, mimetype='application/xml')
    empIdList=[]
    for emp in root.findall('employee'):
        id = emp.find('id').text
        empIdList.append(id)
      
    return jsonify(empIdList)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
