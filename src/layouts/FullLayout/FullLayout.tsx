import React from 'react';
import './FullLayout.scss';

export const FullLayout: React.FC = ({ children }) => {
  return <div className={'full-layout'}>{children}</div>;
};
