// import { useState } from "react";
// import { saveContact } from "../services/contactService";
// import "./Contact.css";

// function Contact() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     message: ""
//   });

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     await saveContact(form);

//     alert("Message sent successfully!");

//     setForm({
//       name: "",
//       email: "",
//       message: ""
//     });
//   };

//   return (
//     <section
//       className="contact"
//       id="contact"
//     >
//       <div className="section-title">
//         <h2>Contact Me</h2>
//         <p>
//           Let's build something amazing together
//         </p>
//       </div>

//       <form
//         className="contact-form"
//         onSubmit={handleSubmit}
//       >
//         <input
//           type="text"
//           name="name"
//           placeholder="Your Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Your Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />

//         <textarea
//           name="message"
//           placeholder="Your Message"
//           rows="3"
//           value={form.message}
//           onChange={handleChange}
//           required
//         />

//         <button type="submit">
//           Send Message
//         </button>
//       </form>
//     </section>
//   );
// }

// export default Contact;

import { useState } from "react";
import { saveContact } from "../services/contactService";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await saveContact(form);
    alert("Message sent successfully!");

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section className="contact" id="contact">
      <div className="section-title">
        <h2>Connect With Me</h2>

        <div className="line"></div>
      </div>

      <div className="contact-container">
        {/* Left Side */}
        <div className="contact-info">
          <div className="info-card">
            <div className="icon-box">
              <FaPhoneAlt />
            </div>
            <span>+91 9704818469</span>
          </div>

          <div className="info-card">
            <div className="icon-box">
              <FaEnvelope />
            </div>
            <span>srivallikagitha01@gmail.com</span>
          </div>

          <div className="info-card">
            <div className="icon-box">
              <FaMapMarkerAlt />
            </div>
            <span>Gudivada, Andhra Pradesh, India</span>
          </div>
        </div>

        {/* Right Side */}
        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            rows="4"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Send Message
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;