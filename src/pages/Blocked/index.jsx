import React from 'react';
import { render } from 'react-dom';
import Blocked from './Blocked';
import './index.css'


render(<Blocked />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
