import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CIcon from '@coreui/icons-react';
import {
  CCreateNavItem,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from '@coreui/react';
import SimpleBar from 'simplebar-react';

// sidebar nav config
import navigation from '../_nav';
import { responsiveSidebar } from '../store/actions';

import 'simplebar/dist/simplebar.min.css';

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.changeState.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar
      position="fixed"
      selfHiding="md"
      unfoldable={unfoldable}
      show={sidebarShow}
      onShow={() => console.log('show')}
      onHide={() => {
        dispatch({ type: 'set', sidebarShow: false });
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full" name="logo-negative" height={35} />
        <CIcon className="sidebar-brand-narrow" name="sygnet" height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <CCreateNavItem items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch(responsiveSidebar(!unfoldable))}
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
