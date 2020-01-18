const { execSync } = require('child_process');

execSync('npm i --no-package-lock', { cwd: __dirname });

const Seemple = require('seemple');
const parseForm = require('seemple-parse-form');
const router = require('seemple-router');
