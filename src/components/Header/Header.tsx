import React, { FunctionComponent } from 'react';
import cx from 'classnames';
import Button from '../Button';

import './Header.scss';

type Props = JSX.IntrinsicElements['div'] & {
  onClickSettings?: () => void;
};

const Header: FunctionComponent<Props> = ({ onClickSettings, className, ...rest }) => {
  const classNames = cx('Header', className);

  const handleClick = () => {
    if (onClickSettings) onClickSettings();
  };

  return (
    <div className={classNames} {...rest}>
      <span className="brand">dora</span>
      <Button onClick={handleClick} primary={true}>
        settings
      </Button>
    </div>
  );
};

export default Header;
