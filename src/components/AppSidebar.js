import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CIcon from '@coreui/icons-react';
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react';
import SimpleBar from 'simplebar-react';
import { logoNegative } from 'src/assets/brand/logo-negative';
import { sygnet } from 'src/assets/brand/sygnet';
import { responsiveSidebar } from 'src/store/actions';

// sidebar nav config
import navigation from '../_nav';

import { AppSidebarNav } from './AppSidebarNav';

import 'simplebar/dist/simplebar.min.css';

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.changeState.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.changeState.sidebarShow);

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(responsiveSidebar({ sidebarShow: visible }));
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch(responsiveSidebar({ sidebarUnfoldable: !unfoldable }))}
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
