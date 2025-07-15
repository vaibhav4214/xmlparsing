from flask import Flask, send_file,jsonify,request
from flask_cors import CORS
import xml.etree.ElementTree as ET
import os
import json
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

@app.route('/emp-details',methods=['GET', 'POST'])
def emp_details():
    servicess={}
    
    id=request.args.get("id")
    for emp in root.findall('employee'):
        if id==emp.find('id').text:
            servicess["id"]=id
            services = emp.find('services')
         
            for service in services:
                servicess[service.tag]=service.text
            print(servicess)
            return jsonify(servicess)
        
@app.route('/status-update',methods=['GET', 'POST'])
def emp_status_val_update():
    status=request.args.get("empInfo")
    s=json.loads(status) #string to dict convert
  
        # Find the 'price' element within a 'employee' element and update its text
    for emp in root.findall('employee'):
   
        if emp.find('id').text == s["id"]: # Assuming 'id' is an attribute
              emp.find('status').text=s['status']
              print(f"Updated employee ID {s["id"]}")
        tree.write('employee.xml')
            
    return "ok"



if __name__ == '__main__':
    app.run(debug=True, port=5000)
