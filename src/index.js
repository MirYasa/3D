/* eslint-disable eol-last */
/* eslint-disable strict */
'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import showImg from './modules/showImg';
import calculateCost from './modules/calculateCost';
import sendForm from './modules/sendForm';

countTimer('23 september 2020');

toggleMenu();

togglePopup();

tabs();

slider();

showImg();

calculateCost(100);

sendForm();