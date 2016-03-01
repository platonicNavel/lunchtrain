// SHARED

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import $ from 'jquery';
import _ from 'lodash';

// LOGIN

import Login from './routes/Login/App.js'

// LANDING

import Landing from './routes/Landing/App.js';

// DESTINATIONS
import GoogleList from './routes/Destinations/components/GoogleList.js';
import GoogleListEntry from './routes/Destinations/components/GoogleListEntry.js';
import GoogleMap from './routes/Destinations/components/GoogleMap.js';
import LocalList from './routes/Destinations/components/LocalList.js';
import LocalMap from './routes/Destinations/components/LocalMap.js';
import Destinations from './routes/Destinations/App.js';


// TRAINS

import getCurrentTrains from './utils/getCurrentTrains.js';
import TrainsListEntryDropdown from './routes/Trains/components/TrainsListEntryDropdown.js';
import TrainsListEntry from './routes/Trains/components/TrainsListEntry.js';
import TrainsList from './routes/Trains/components/TrainsList.js';
import Trains from './routes/Trains/App.js';

// ROUTES

import routes from './routes.js';