import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App'
import './stylesheets/index.css'
import {HelmetProvider} from 'react-helmet-async'
import { disableReactDevTools } from "@fvilers/disable-react-devtools"

if (process.env.NODE_ENV === 'production') disableReactDevTools()

const root = createRoot(document.getElementById('root'))
root.render(<HelmetProvider><App /></HelmetProvider>);