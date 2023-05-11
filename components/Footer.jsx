import React from 'react';

const Footer = () => (
  <footer className="bg-light p-3 text-center" data-testid="footer">
    <div className="logo" data-testid="footer-logo" />
    <p data-testid="footer-text">
      My Read List copyrigth &copy; {new Date().getFullYear()}.
    </p>
  </footer>
);

export default Footer;
