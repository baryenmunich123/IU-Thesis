import React from 'react'
import './Footer.css'
import { AiFillPhone } from 'react-icons/ai';
import { FaLocationArrow } from 'react-icons/fa';
import { SlSocialFacebook } from 'react-icons/sl'
import { SlSocialYoutube } from 'react-icons/sl'

function Footer() {
  return (
    <footer className='footer-container'>
      <div className="footer-line"></div>
      <div className="footer-list">
        <div className="footer-content">
          <h3>IU Office of Student Services</h3>
          <p className="footer-content-description">
            We are committed to providing the best customer service internally and externally. It can be witnessed in how we treat our employees, our owners, our managers, our society, and our student.
          </p>
        </div>
        <div className="footer-content">
          <h3>Contact</h3>
          <ul className="footer-contact-list">
            <li className="footer-contact-item"><FaLocationArrow />Room O1.105, Quarter 6, Linh Trung Ward, Thu Duc City, HCM</li>
            <li className="footer-contact-item"><AiFillPhone />PHONE: (+84) 028 3724 4270 ext: 3334, 3826</li>
          </ul>
        </div>
        <div className="footer-content">
          <h3>Follow</h3>
          <ul className="footer-follow-list">
            <li className="footer-follow-item">
              <a href="https://www.youtube.com/channel/UCFQ9-P0JXoYo9EOjZGvWm-g/" target="_blank" rel="external noopener nofollow" class="jeg_youtube">
                <SlSocialYoutube />
              </a>
            </li>
            <li className="footer-follow-item">
              <a href="https://www.facebook.com/hcmiuoss" target="_blank" rel="external noopener nofollow" class="jeg_facebook">
                <SlSocialFacebook />

              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer