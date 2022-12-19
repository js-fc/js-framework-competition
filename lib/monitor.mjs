import './rate-monitor.mjs';
import './memory-monitor.mjs';

document.body.append(document.createElement('memory-monitor'));

globalThis.Monitoring = document.createElement('rate-monitor');

document.body.append(Monitoring);
