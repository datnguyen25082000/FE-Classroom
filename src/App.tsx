import React, { useEffect } from 'react';
import { Routers } from './routers';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { useAppDispatch, doGetCurrentUser } from './redux';

export default function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(doGetCurrentUser());
  }, []);

  return (
    <div className="app">
      <Routers />
    </div>
  );
}
