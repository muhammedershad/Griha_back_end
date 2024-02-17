"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.links = void 0;
require('dotenv').config();
const BASE_URL = process.env.CLIENT_SITE_URL;
const BASE_URL_LOCAL = 'http://localhost:8080';
exports.links = {
    BASE_URL,
    BASE_URL_LOCAL
};
