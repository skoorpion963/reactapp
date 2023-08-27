import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container">
        <img src="/images/logo.png" className="img-small" style={{ width: '40px', height: '40px' }} />

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
            <a className="nav-link text-white" href="/">Главная</a>
            </li>
            <li className="nav-item">
            <a className="nav-link text-white" href="/table">Скринер</a>
            </li>
            <li className="nav-item">
            <a className="nav-link text-white" href="/tableV2">СкринерV2</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
