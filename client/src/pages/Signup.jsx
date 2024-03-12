import React, {useState} from "react";
import Footer from "../components/Footer";
import Headers from "../components/Header";
import axios from "axios";
import '../styles/Signup.scss'

const Signup = (props) => {
  // get sign up info from user
  const [formDatas, setFormDatas] = useState({
    username: '',
    email: '',
    password: '',
  })

  // capture user input to send over to useState above
  const handleChange = function(e) {
    const {name, value} = e.target;
    setFormDatas(prev => {
      return {...prev, [name]: value};
    })
  }

  // 
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/signup', formDatas);
      console.log(response);
    } catch (error) {
      console.error('Error during signup:', error);
    }
  }


  return (
    <div>
      <Headers />
      <form className='signup-form' onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="username" name="username" value={formDatas.name} onChange={handleChange} autoComplete="new-password" required/>

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={formDatas.email} onChange={handleChange} autoComplete="new-password" required/>

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={formDatas.password} onChange={handleChange} autoComplete="new-password" required/>
        
        <button type="submit" name="submit">Sign Up</button>
      </form>
      <Footer />
    </div>
  )
}

export default Signup;