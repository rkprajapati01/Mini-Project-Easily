import express from 'express';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import { getWelcome } from './src/controllers/welcome.controller.js';
import JobController from './src/controllers/job.controller.js';

const server = express();
const jobController = new JobController();

// Set the view engine to EJS
server.set('view engine', 'ejs');
server.set('views', path.resolve("src", "views"));

server.use(ejsLayouts);
server.use(express.static(path.resolve('public')));
server.use('/icons', express.static(path.join(path.resolve(), 'node_modules', 'bootstrap-icons', 'font')));

// Route for the welcome page
server.get('/', getWelcome);
server.get('/jobs', jobController.getJobListing);



export default server;

