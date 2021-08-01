import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Button from '@atlaskit/button';

import './Header.scss';

const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const backButtonVisible = location.pathname.length > 1;

  return (
    <div className="header">
      <div className="header__content">
        {backButtonVisible && (
          <Button
            id="backButton"
            label="Go Back"
            onClick={() => history.goBack()}
          >
            Go back
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
