import './fps-monitor.js';
import './memory-monitor.js';

document.body.append(document.createElement('memory-monitor'));

globalThis.Monitoring = document.createElement('fps-monitor');

document.body.append(Monitoring);
