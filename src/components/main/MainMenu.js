import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { makeRequest } from '../../Helper';
import Config from '../../Config';
import Spaces from './space/Spaces';
import Settings from './Settings';
import Space from './space/Space';
import Members from './member/Members';
import Images from './Images';
import WrongUrl from './WrongUrl';
import Breadcrumb2 from './Breadcrumb2';

function MainMenu() {
  const [msg, setMsg] = useState('');

  async function handleLogout() {
    setMsg(Config.waitMsg);
    let response = await makeRequest('/logout', 'DELETE', null);
    if (response.ok) {
      sessionStorage.removeItem('access_token');
      window.location.reload(false);
    }
  };

  return (
    <div className='App'>
      <div className='header'>
        <nav className='main-menu-bar'>
          <Link to='/spaces' className='logo-text'>Shared Spaces</Link>
          <Link to='/spaces' className='main-menu-link-item'>Home</Link>
          <Link to='/edit-pwd' className='main-menu-link-item'>Settings</Link>
          <Link to='/' className='main-menu-link-item' onClick={handleLogout}>{'Logout (' + sessionStorage.getItem('currentUser') + ')'}</Link>
        </nav>
        <div className='msg-bar'>
          {msg}
        </div>
        <div className='breadcrumb-bar'>
          <Breadcrumb2 />
        </div>
      </div>
      <div className='body'>
        <Routes>
          <Route path='/spaces' element={<Spaces setMsg={setMsg} />}></Route>
          <Route path='/edit-pwd' element={<Settings setMsg={setMsg} />}></Route>
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