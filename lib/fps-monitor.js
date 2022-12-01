import { LitElement,  html, css } from 'https://unpkg.com/lit@2.0.0/index.js?module';

class FpsMonitor extends LitElement {

    static get properties() {
        return {
			fps: { type: String, category: 'settings' },
            version: { type: String, category: 'settings' }
        }
    }

    static get styles() {
        return css`
			:host {
				position: fixed;
				right: 85px;
				bottom: 0px;
				width: 80px;
				opacity: 0.9;
				cursor: pointer;
			}
			#container {
				padding: 0 0 3px 3px;
				text-align: left;
				background-color: #020;
			}
			#text {
				color:#0f0;
				font-family: Helvetica,Arial,sans-serif;
				font-size: 9px;
				font-weight: bold;
				line-height: 15px;
			}
		`
	}

	static bucketSize = 200;
	lastTime;
	bucket;

    constructor() {
        super();
        this.version = "1.0.0";
		this.fps = 0;
		this.lastTime = performance.now();
		this.bucket = [];
    }

    render() {
        return html`
			<div id='container'>
				<div id="text">FPS: ${this.fps.toFixed(2)}/sec</div>
			</div>
        `;
    }

   	ping() {
        const stop = performance.now();
        const rate = 1000 / (stop - this.lastTime);
        if (rate == Infinity) {
        	return;
        }
        this.bucket.push(rate);
        if (this.bucket.length > FpsMonitor.bucketSize) {
			this.bucket.shift();
        }
		let sum = 0;
		for (let index = 0; index < this.bucket.length; index++) {
			sum += this.bucket[index];
		}
        this.fps = sum / (this.bucket.length || 1);
        this.lastTime = stop;
	}

	test() {
		let n = 2000000;
		let a = [...Array(n).keys()];
		let start = performance.now();
		// var sum = 0;
		// for (let index = 0; index < n; index++) {
		// 	sum += a[index];
		// }
		 let b = a.reduce((sum, elem) => sum += elem);
		let end = performance.now();
		console.log(end- start);

	}
}

customElements.define("fps-monitor", FpsMonitor);