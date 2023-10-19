import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { makeRequest } from '../../Helper';
import Config from '../../Config';
import Spaces from './space/Spaces';
import Settings from './Settings';
import Space from './space/Space';
import Members from './member/Members';
import Images from './Images';
import WrongUrl from './WrongUrl';
import Breadcrumbs from './breadcrumb/Breadcrumbs';

function MainMenu() {
  const [msg, setMsg] = useState(Config.blankSymbol);
  const currentPageURL = window.location.pathname;

  async function handleLogout() {
    setMsg(Config.waitMsg);
    let response = await makeRequest('/logout', 'DELETE', null);
    if (response.ok) {
      sessionStorage.removeItem('access_token');
      window.location.reload(false);
    }
  };

  function clickHome() {
    if ('/spaces' === currentPageURL) {
      window.location.reload();
    }
  }

  return (
    <div className='app'>
      <header>
        <nav className='main-menu-bar'>
          <Link to='/spaces' className='logo-text' onClick={clickHome}>Shared Spaces</Link>
          <Link to='/spaces' className='main-menu-link' onClick={clickHome}>Home</Link>
          <Link to={'/' + Config.settingsPath} className='main-menu-link'>Settings</Link>
          <Link className='main-menu-link' onClick={handleLogout}>{'Logout (' + sessionStorage.getItem('currentUser') + ')'}</Link>
        </nav>
        <div className='msg-bar'>
          {msg}
        </div>
        <nav className='breadcrumb-bar'>
          <Breadcrumbs />
        </nav>
      </header>
      <div className='main-content'>
        <Routes>
          <Route path='/spaces' element={<Spaces setMsg={setMsg} />}></Route>
          <Route path={'/' + Config.settingsPath} element={<Settings setMsg={setMsg} />}></Route>
          <Route path='/spaces/:spaceId' element={<Space setMsg={setMsg} />}></Route>
          <Route path='/spaces/:spaceId/members' element={<Members setMsg={setMsg} />}></Route>
          <Route path='/spaces/:spaceId/images' element={<Images setMsg={setMsg} />}></Route>
          <Route path='*' element={<WrongUrl />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default MainMenu;