import React from 'react';
import styles from '@/styles/Footer.module.css'
import Button from './Button';

function Footer() {
  return (
    <div className={styles.footer_container} >
      <section className={styles.footer_subscription} >
        <p className={styles.footer_subscription_heading}>
          Join the Learning Revolution. With AI generated course recommendations and evaluations.
        </p>
        <p className={styles.footer_subscription_text}>
          Join The Newsletter
        </p>
        <div className={styles.input_areas} >
          <form>
            <input
              className={styles.footer_input}
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <Button buttonStyle='btn--outline' link='#'>Subscribe</Button>
          </form>
        </div>
      </section>
      <div className={styles.footer_links}>
        <div className={styles.footer_link_wrapper} >
          <div className={styles.footer_link_items}>
            <h2>About Us</h2>
            <div to='/login'>How it works</div>
            <div to='/'>Testimonials</div>
            <div to='/'>Careers</div>
            <div to='/'>Investors</div>
            <div to='/'>Terms of Service</div>
          </div>
          <div className={styles.footer_link_items}>
            <h2>Contact Us</h2>
            <div to='/'>Contact</div>
            <div to='/'>Support</div>
            <div to='/'>Destinations</div>
            <div to='/'>Sponsorships</div>
          </div>
        </div>
        <div className={styles.footer_link_wrapper} >
          <div className={styles.footer_link_items} >
            <h2>Videos</h2>
            <div to='/'>Submit Video</div>
            <div to='/'>Ambassadors</div>
            <div to='/'>Agency</div>
            <div to='/'>Influencer</div>
          </div>
          <div className={styles.footer_link_items}>
            <h2>Social Media</h2>
            <div to='/'>Instagram</div>
            <div to='/'>Facebook</div>
            <div to='/'>Youtube</div>
            <div to='/'>Twitter</div>
          </div>
        </div>
      </div>
      <section className={styles.social_media} >
        <div className={styles.social_media_wrap} >
          <small className={styles.website_rights} >designed by <a href="http://utkarsh-portfolio.web.app" target="_blank" rel="noopener noreferrer">Utkarsh</a>  © 2021</small>
          <div className={styles.social_icons}>
              <i  className='fab fa-facebook-f' />
              <i  className='fab fa-instagram' />
              <i  className='fab fa-youtube' />
              <i  className='fab fa-twitter' />
              <i  className='fab fa-linkedin' />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
