import React from 'react';
import { freeSet } from '@coreui/icons';
import { CCard, CCardBody, CCardHeader, CRow } from '@coreui/react';
import { DocsLink } from 'src/components';

import { getIconsView } from '../brands/Brands.js';

const CoreUIIcons = () => {
  return (
    <CCard className="mb-4">
      <CCardHeader>
        Free Icons / as CIcon{' '}
        <DocsLink href="https://github.com/coreui/coreui-icons" text="GitHub" />
      </CCardHeader>
      <CCardBody>
        <CRow className="text-center">{getIconsView(freeSet)}</CRow>
      </CCardBody>
    </CCard>
  );
};

export default CoreUIIcons;
