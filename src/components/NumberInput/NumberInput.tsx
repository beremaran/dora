import React, { FunctionComponent } from 'react';
import Input from '../Input';

type Props = JSX.IntrinsicElements['input'] & {
  label?: string;
};

const NumberInput: FunctionComponent<Props> = ({ label, ...rest }) => (
  <Input type="number" label={label} {...rest} />
);

export default NumberInput;
