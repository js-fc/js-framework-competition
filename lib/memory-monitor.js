import { LitElement,  html, css } from 'https://unpkg.com/lit@2.0.0/index.js?module';

class MemoryMonitor extends LitElement {

    static get properties() {
        return {
			memory: { type: String, default: '0', save: true, category: 'settings' },
            version: { type: String, default: '1.0.0', save: true, category: 'settings' }
        }
    }

    static get styles() {
        return css`
			:host {
				position: fixed;
				right: 0px;
				bottom: 0px;
				width:80px;
				opacity:0.9;
				cursor:pointer;
			}
			#ms {
				padding: 0 0 3px 3px;
				text-align: left;
				background-color: #020;
			}
			#text {
				color:#0f0;
				font-family: Helvetica,Arial,sans-serif;
				font-size:9px;
				font-weight:bold;
				line-height:15px;
			}
			#graph {
				position: relative;
				width: 74px;
				height: 30px;
				background-color: #0f0;
			}
			.bar {
				width: 1px;
				height:30px;
				float:left;
				background-color: #131
			}
		`
	}

	perf;
	lastTime;
	lastUsedHeap;
	memories;

    constructor() {
        super();
        this.version = "1.0.0";
		this.perf = window.performance || {};
		this.memory = 0;
		this.lastTime = Date.now();
		this.lastUsedHeap = this.perf.memory.usedJSHeapSize;
		this.memories = Array(74).fill(0);
    }
    render() {
        return html`
			<div id="ms">
				<div id="text">
					Memory: ${this.memory}
				</div>
				<canvas id="graph" width="74" height="30"></canvas>
			</div>
        `;
    }

    _handleClick(e) {
        console.log(e.target);
    }

    firstUpdated() {
        super.firstUpdated();
    }

    updated(e) {
		const canvas = this.renderRoot.querySelector('#graph');
		const ctx = canvas.getContext('2d');
		ctx.fillStyle="#FF0000";
		ctx.strokeStyle="#FF0000";
		ctx.beginPath();
		this.memories.forEach((memory, index) => {
		 	ctx.moveTo(index, 0);
		 	ctx.lineTo(index, memory);
		})
		ctx.stroke();
		window.requestAnimationFrame(this.my1.bind(this));
    }

	my1() {
		this.startMeasure();
		window.requestAnimationFrame(this.my1.bind(this));
	}

	startMeasure() {
		// Refresh only 30 times per second
		if( Date.now() - this.lastTime < 1000/30 )	return;
		this.lastTime = Date.now();

		const delta	= this.perf.memory.usedJSHeapSize - this.lastUsedHeap;
		this.lastUsedHeap = this.perf.memory.usedJSHeapSize;
		const color	= delta < 0 ? '#830' : '#131';

		const ms = this.perf.memory.usedJSHeapSize;
		//msMin	= Math.min( msMin, ms );
		//msMax	= Math.max( msMax, ms );

		this.memory = this.bytesToSize(ms, 2);
		this.memories.shift();


		const normValue	= ms / (30*1024*1024);
		var height	= Math.min( 30, 30 - normValue * 30 );
		this.memories.push(height);
		//this.updateGraph( msGraph, height, color);
		//this.requestUpdate();
		//window.requestAnimationFrame(this.startMeasure.bind(this));

	}

	bytesToSize( bytes, nFractDigit ){
		var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		if (bytes == 0) return 'n/a';
		nFractDigit	= nFractDigit !== undefined ? nFractDigit : 0;
		var precision	= Math.pow(10, nFractDigit);
		var i = Math.floor(Math.log(bytes) / Math.log(1024));
		return Math.round(bytes*precision / Math.pow(1024, i))/precision + ' ' + sizes[i];
	};

    async init() {

    }
}

customElements.define("memory-monitor", MemoryMonitor);