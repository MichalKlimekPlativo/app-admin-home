importScripts('https://unpkg.com/workbox-sw@2.0.1/build/importScripts/workbox-sw.prod.v2.0.1.js');

const swVersion = '{{appVersion}}';
const workboxSW = new self.WorkboxSW({
    skipWaiting: true,
    clientsClaim: true
});

// This is a placeholder for manifest dynamically injected from webpack.config.js
workboxSW.precache([]);

// Here we precache urls that are generated dynamically in the main.js controller
workboxSW.precache([
    '{{baseUrl}}',
    '{{assetsUri}}/admin/common/js/_all.js'
]);

workboxSW.router.setDefaultHandler({
    handler: workboxSW.strategies.cacheFirst()
});
