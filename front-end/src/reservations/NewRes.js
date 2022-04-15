import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations, createReservation } from "../utils/api"
import { today } from "../utils/date-time"

// route: /reservations/new

// Form containing follow fields:
// First name: `<input name="first_name" />`
// Last name: `<input name="last_name" />`
// Mobile number: `<input name="mobile_number" />`
// Date of reservation: `<input name="reservation_date" />`
// Time of reservation: `<input name="reservation_time" />`
// Number of people in the party, which must be at least 1 person. 
// `<input name="people" />`



export default function NewRes() {

const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",

};

const [ formData, setFormData ] = useState({ ...initialFormState });
const history = useHistory();

const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };  

const handleSubmit = async (event) => {
    event.preventDefault();
    let a = formData.name;
    let b = formData.last_name;
    let c = formData.mobile_number;
    let d = formData.reservation_date;
    let e = formData.reservation_time;
    let f = formData.people;

    // if one of inputs are empty show alert

    // if reservation date is before validation:
    // const resDate = d;
    // const now = today();
    // if (resDate < now) {
    //   // selected date is in the past
    // window.alert("Date must be in the future")
    // } 
    
  
    if ( a === "" || b === "" || c === "" || d === "" || f < 1 || e === ""){
        window.alert('Invalid Input')
        
    } else {
        console.log(formData);
        const ac = new AbortController();
        await createReservation(formData, ac.signal);
       
    }
    
    // reset form state

  };

  const handleCancel = (event) => {
    event.preventDefault();
    setFormData(initialFormState);
    history.goBack();
  };

    return (
        <main>
            <p>Hello</p>

            <form>
        <label>
            First Name:
            <input type="text" name="first_name" onChange={handleChange} />
        </label>
        <label>
            Last Name:
            <input type="text" name="last_name" onChange={handleChange} />
        </label>
        <label>
            Mobile Number:
            <input type="text" name="mobile_number" onChange={handleChange} />
        </label>
        <label>
            Date of reservation:
            <input type="date" name="reservation_date" onChange={handleChange} />
        </label>
        <label>
            Time of reservation:
            <input type="time" name="reservation_time" onChange={handleChange} />
        </label>
        <label>
            Number of people in the party:
            <input type="text" name="people" onChange={handleChange} />
        </label>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
        <button onClick={handleCancel} className="btn btn-danger">Cancel</button>
        </form>
        </main> 
    )
};
