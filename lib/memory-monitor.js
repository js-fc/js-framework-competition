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

    constructor() {
        super();
        this.version = "1.0.0";
		this.perf = window.performance || {};
		this.memory = 0;
		this.lastTime = Date.now();
		this.lastUsedHeap = this.perf.memory.usedJSHeapSize;
    }

    render() {
        return html`
			<div id="ms">
				<div id="text">
					Memory: ${this.memory}
				</div>
				<div id="graph">
					${Array(74).fill(0).map( i =>
						html`<span class="bar"></span>`
					)}
				</div>
			</div>
        `;
    }

    _handleClick(e) {
        console.log(e.target);
    }

    firstUpdated() {
        super.firstUpdated();
		window.requestAnimationFrame(this.my1.bind(this));
    }

    updated(e) {

    }
	c = 0;
	updateGraph( dom, height, color ) {
		var child = dom.appendChild( dom.firstChild );
		child.style.height = height + 'px';
		if( color ) child.style.backgroundColor = color;
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
		const normValue	= ms / (30*1024*1024);
		var height	= Math.min( 30, 30 - normValue * 30 );
		//this.updateGraph( msGraph, height, color);
		//this.requestUpdate();
		//window.requestAnimationFrame(this.startMeasure.bind(this));
		this.c++;
		console.log(this.c);
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

// var MemoryStats = function (){

// 	var msMin	= 100;
// 	var msMax	= 0;

// 	var container	= document.createElement( 'div' );
// 	container.id	= 'stats';
// 	container.style.cssText = 'width:80px;opacity:0.9;cursor:pointer';

// 	var msDiv	= document.createElement( 'div' );
// 	msDiv.id	= 'ms';
// 	msDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#020;';
// 	container.appendChild( msDiv );

// 	var msText	= document.createElement( 'div' );
// 	msText.id	= 'msText';
// 	msText.style.cssText = 'color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
// 	msText.innerHTML= 'Memory';
// 	msDiv.appendChild( msText );

// 	var msGraph	= document.createElement( 'div' );
// 	msGraph.id	= 'msGraph';
// 	msGraph.style.cssText = 'position:relative;width:74px;height:30px;background-color:#0f0';
// 	msDiv.appendChild( msGraph );

// 	while ( msGraph.children.length < 74 ) {

// 		var bar = document.createElement( 'span' );
// 		bar.style.cssText = 'width:1px;height:30px;float:left;background-color:#131';
// 		msGraph.appendChild( bar );

// 	}

// 	var updateGraph = function ( dom, height, color ) {

// 		var child = dom.appendChild( dom.firstChild );
// 		child.style.height = height + 'px';
// 		if( color ) child.style.backgroundColor = color;

// 	}

// 	var perf = window.performance || {};
// 	// polyfill usedJSHeapSize
// 	if (!perf && !perf.memory){
// 		perf.memory = { usedJSHeapSize : 0 };
// 	}
// 	if (perf && !perf.memory){
// 		perf.memory = { usedJSHeapSize : 0 };
// 	}

// 	// support of the API?
// 	if( perf.memory.totalJSHeapSize === 0 ){
// 		console.warn('totalJSHeapSize === 0... performance.memory is only available in Chrome .')
// 	}

// 	// TODO, add a sanity check to see if values are bucketed.
// 	// If so, reminde user to adopt the --enable-precise-memory-info flag.
// 	// open -a "/Applications/Google Chrome.app" --args --enable-precise-memory-info

// 	var self = this;
// 	var memory = 0;
// 	var lastTime	= Date.now();
// 	var lastUsedHeap= perf.memory.usedJSHeapSize;
// 	return {
// 		domElement: container,

// 		update: function () {

// 			// refresh only 30time per second
// 			if( Date.now() - lastTime < 1000/30 )	return;
// 			lastTime	= Date.now()

// 			var delta	= perf.memory.usedJSHeapSize - lastUsedHeap;
// 			lastUsedHeap	= perf.memory.usedJSHeapSize;
// 			var color	= delta < 0 ? '#830' : '#131';

// 			var ms	= perf.memory.usedJSHeapSize;
// 			msMin	= Math.min( msMin, ms );
// 			msMax	= Math.max( msMax, ms );

// 			self.memory = bytesToSize(ms, 2);
// 			msText.textContent = "Mem: " + self.memory;

// 			var normValue	= ms / (30*1024*1024);
// 			var height	= Math.min( 30, 30 - normValue * 30 );
// 			updateGraph( msGraph, height, color);

// 			function bytesToSize( bytes, nFractDigit ){
// 				var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
// 				if (bytes == 0) return 'n/a';
// 				nFractDigit	= nFractDigit !== undefined ? nFractDigit : 0;
// 				var precision	= Math.pow(10, nFractDigit);
// 				var i 		= Math.floor(Math.log(bytes) / Math.log(1024));
// 				return Math.round(bytes*precision / Math.pow(1024, i))/precision + ' ' + sizes[i];
// 			};
// 		}
// 	}
// };

let v = 0;
function my() {
	v++;
	console.log(v);
	requestAnimationFrame(my);
}

requestAnimationFrame(my);