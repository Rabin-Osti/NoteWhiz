import React from 'react'
import "./footer.css"

function Footer() {
  return (
    <div className='footer'>
      <h4>NoteWhiz</h4>
      <div className='footer-middle'>
          <span>Home</span>
          <span>About</span>
          <span>Contact</span>
      </div>
      <div className='footer-bottom'>
        <span>Copyright &copy; 2023 NoteWhiz | All Rights Reserved</span>
      </div>
    </div>
  )
}

export default Footer