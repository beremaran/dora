import React, { FunctionComponent } from 'react';
import cx from 'classnames';

import './Footer.scss';

type Props = JSX.IntrinsicElements['footer'];

const Footer: FunctionComponent<Props> = ({ className, ...rest }) => {
  const classNames = cx('Footer', className);

  return (
    <footer className={classNames} {...rest}>
      <a href="https://beremaran.com">beremaran</a>
    </footer>
  );
};

export default Footer;
