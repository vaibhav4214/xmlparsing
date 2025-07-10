import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const EmpDetails=()=>



    {
            const [empDetailss,setEmpDetailss]=useState({})
           const location=useLocation()
           const empId=location.state
           console.log(empId)

        
           useEffect(()=>
        {   
           
            getEmpDetails()
        },[])
        const getEmpDetails= async()=>
        {
               
               await  fetch(`http://localhost:5000/emp-details?id=${empId}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empId),
    })
      .then((response) => response.text())
      .then((data) => {
        
       setEmpDetailss(JSON.parse(data))
        console.log(typeof empDetailss)
        
      })
      .catch((error) => console.error('Error fetching XML:', error));
        }

        const updateStatus=async()=>
        {
          let userConfirmed = window.confirm("Are you sure you want to proceed?");
          if(userConfirmed)
          {
             let statusVal=document.getElementById("selectUpdate").value
             let empInfo={"id":empId,"status":statusVal}
                await  fetch(`http://localhost:5000/status-update?empInfo=${JSON.stringify(empInfo)}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statusVal),
    })
      .then((response) => response.text())
      .then((data) => {
        
       setEmpDetailss(JSON.parse(data))
        console.log(typeof empDetailss)
        
      })
      .catch((error) => console.error('Error fetching XML:', error));
          }
        }

        return(<>
                  <p>Id: {empDetailss.id}</p>
                  <p>Name: {empDetailss.name}</p>
                  <p>Department: {empDetailss.department}</p>
                  <p>Salary: {empDetailss.salary}</p>
                  <p>Status {empDetailss.status} {empDetailss.status=="Pending"?
                      <><select id="selectUpdate">
                        <option>Update Status</option>
                        <option value="Ok" >Ok</option>
                        <option value="Reject">Reject</option>
                      </select>
                      <button onClick={updateStatus}>Update</button></>
                      :  ""
                }</p>
        </>)
    }

export default EmpDetails