import { useState } from 'react';
import { db } from "./firebase.js"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import './ContactPage.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    subject: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "contact_form"), {
        first_name: formData.firstname,
        last_name: formData.lastname,
        email: formData.email,
        message: formData.subject,
        submitted_at: serverTimestamp()  // sort the messages by time in the database
      });
      setFormData({ firstname: '', lastname: '', email: '', subject: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ContactPage">
      <h1>Contact Us</h1>
      <p>Email: kfh5534@psu.edu</p>
      <p>Phone: (267) 243-3282</p>
      <p>Address: 201 Vairo Blvd, State College, PA 16803</p>
      
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h2>Contact Form</h2>
          
          <label for="fname">First Name</label>
          <input 
            type="text" id="fname" name="firstname" 
            placeholder="Your name.." 
            value={formData.firstname}
            onChange={handleChange}
            required
          />

          <label for="lname">Last Name</label>
          <input 
            type="text" id="lname" name="lastname" 
            placeholder="Your last name.." 
            value={formData.lastname}
            onChange={handleChange}
            required 
          />

          <label for="email">Email</label>
          <input 
            type="text" id="email" name="email" 
            placeholder="Your email.." 
            value={formData.email}
            onChange={handleChange}
            required 
          />

          <label for="subject">Message</label>
          <input
            type='text' id="subject" name="subject"
            placeholder="Write something.."
            value={formData.subject}
            onChange={handleChange}
            required
          ></input>

          <input 
            type="submit" 
            value={isSubmitting ? "Sending..." : "Submit"} 
            disabled={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
}

export default ContactPage;