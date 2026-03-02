import './ContactPage.css';

function ContactPage() {
  return (
    <div className="ContactPage">
      <h1>Contact Us</h1>
      <p>Email: kfh5534@psu.edu</p>
      <p>Phone: (267) 243-3282</p>
      <p>Address: 201 Vairo Blvd, State College, PA 16803</p>
      <div className="container">
        <form>
          <h2>Contact Form</h2>
          <label htmlFor="fname">First Name</label>
          <input type="text" id="fname" name="firstname" placeholder="Your name.." />

          <label htmlFor="lname">Last Name</label>
          <input type="text" id="lname" name="lastname" placeholder="Your last name.." />

          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" placeholder="Your email.." />

          <label htmlFor="subject">Write a message</label>
          <textarea
            id="subject"
            name="subject"
            placeholder="Write something.."
            style={{ height: "200px" }}
          ></textarea>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  )
}

export default ContactPage;