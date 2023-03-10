import './rate-monitor.mjs';
import './memory-monitor.mjs';
import './median-monitor.mjs';

document.body.append(document.createElement('memory-monitor'));
// document.body.append(document.createElement('median-monitor'));

// globalThis.Monitoring = document.createElement('rate-monitor');
//globalThis.Monitoring = document.createElement('median-monitor');

document.body.append(Monitoring);
