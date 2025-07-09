import xml.etree.ElementTree as ET

# Load XML file
tree = ET.parse('employees.xml')
root = tree.getroot()

# Filter: Employees in IT department
empIdList=[]
for emp in root.findall('employee'):
        id = emp.find('id').text
        empIdList.append(id)

print(empIdList)    # if department == 'IT':
    #     name = emp.find('name').text
    #     salary = emp.find('salary').text
    #     print(f"Name: {name}, Department: {department}, Salary: {salary}")
