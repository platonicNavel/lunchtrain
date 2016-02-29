// SHARED

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import $ from 'jquery';
import _ from 'lodash';

// LANDING

import Landing from './routes/Landing/App.js';

// TRAINS

import getCurrentTrains from './utils/getCurrentTrains.js';
import TrainsListEntryDropdown from './routes/Trains/components/TrainsListEntryDropdown.js';
import TrainsListEntry from './routes/Trains/components/TrainsListEntry.js';
import TrainsList from './routes/Trains/components/TrainsList.js';
import App from './routes/Trains/App.js';
import routes from './routes.js';