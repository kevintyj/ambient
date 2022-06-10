/* @refresh reload */
import {render} from 'solid-js/web';

import './assets/SCSS/styles.scss';
import App from './App';
import { Router } from 'solid-app-router';

render((
  () => 
    <Router>
      <App/>
    </Router>
  ), 
  document.getElementById('root') as HTMLElement);
