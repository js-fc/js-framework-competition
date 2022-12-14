import { LitElement,  html, css } from 'https://unpkg.com/lit@2.0.0/index.js?module';

class MemoryMonitor extends LitElement {

    static get properties() {
        return {
			memory: { type: String, category: 'settings' },
            version: { type: String, category: 'settings' }
        }
    }

    static get styles() {
        return css`
			:host {
				position: fixed;
				right: 0px;
				bottom: 0px;
				width: 85px;
				opacity: 0.9;
				cursor: pointer;
			}
			#container {
				padding: 0 0 3px 3px;
				text-align: left;
				background-color: #020;
			}
			.text {
				display: flex;
     			justify-content: space-between;
				color:#0f0;
				font-family: Helvetica,Arial,sans-serif;
				font-size: 9px;
				font-weight: bold;
				line-height: 15px;
				padding-right: 3px;
			}

			#graph {
				position: relative;
				width: 79px;
				height: 30px;
				background-color: #0f0;
			}
		`
	}

	perf;
	lastTime;
	memories;

    constructor() {
        super();
        this.version = "1.0.0";
		this.perf = window.performance || {};
		this.memory = this.bytesToString(0);
		this.lastTime = Date.now();
		this.lastUsedHeap = this.perf.memory.usedJSHeapSize;
		this.memories = Array(75).fill(60);
    }

    render() {
        return html`
			<div id='container'>
				<div class="text">
					<span>Memory:</span>
					<span>${this.memory}</span>
				</div>
				<canvas id="graph" width="149" height="60"></canvas>
			</div>
        `;
    }

    firstUpdated() {
        super.firstUpdated();
		window.requestAnimationFrame(() => this.startMeasure());
    }

    /**
	 * @param {any} e
	 */
    updated(e) {
		const canvas = this.renderRoot.querySelector('#graph');
		const ctx = canvas.getContext('2d');
		ctx.lineWidth = 2;
		ctx.fillStyle=" #131";
		ctx.clearRect(0 , 0, canvas.width, canvas.height);
		ctx.beginPath();
		this.memories.forEach((memory, index) => {
		 	ctx.moveTo(2*index, 0);
		 	ctx.lineTo(2*index, memory);
		})
		ctx.stroke();
    }

	startMeasure() {
		window.requestAnimationFrame(() => this.startMeasure());
		if( Date.now() - this.lastTime < 1000/30 )
			return;
		const ms = this.perf.memory.usedJSHeapSize;
		const height = Math.max( 0 , 60 - Math.floor( 2 * ms / 1048576 )); // 2 pixels per MB
		this.memory = this.bytesToString(ms, 2);
		this.memories.shift();
		this.memories.push(height);
		this.requestUpdate();
	}

	/**
	 * @param {number} bytes
	 * @param {number | undefined} precision
	 */
	bytesToString( bytes, precision = 0){
		const sizes = ['B ', 'KB', 'MB', 'GB', 'TB'];
		if (bytes == 0) return 'n/a';
		const i = Math.floor(Math.log2(bytes) / 10);
		return (bytes / Math.pow(1024, i)).toFixed(precision) + ' ' + sizes[i];
	};
}

customElements.define("memory-monitor", MemoryMonitor);