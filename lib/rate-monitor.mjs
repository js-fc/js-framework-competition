import { LitElement,  html, css } from 'https://unpkg.com/lit@2.0.0/index.js?module';

class RateMonitor extends LitElement {

    static get properties() {
        return {
			rate: { type: String, category: 'settings' },
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
	testData = Array(1000);
	testCount = 0;

    constructor() {
        super();
        this.version = "1.0.0";
		this.rate = 0;
		this.lastTime = performance.now();
		this.bucket = [];
		this.testCount = 0;
    }

    render() {
        return html`
			<div id='container' @click="${this.saveCSV}">
				<div id="text">Rate: ${this.rate.toFixed(2)}/sec</div>
			</div>
        `;
    }

	startMeasure() {
		this.rate = 0;
		this.bucket = [];
		this.lastTime = performance.now();
	}

   	ping() {
        const stop = performance.now();
        const rate = 1000 / (stop - this.lastTime);
        if (rate == Infinity) {
        	return;
        }
        this.bucket.push(rate);
		if (this.testCount < 1000)
		{
			this.testData[this.testCount] = rate;
		    this.testCount++;
			if (this.testCount == 1000) {
				alert("Я все посчитал");
			}
		}
        if (this.bucket.length > RateMonitor.bucketSize) {
			this.bucket.shift();
        }
		let sum = 0;
		for (let index = 0; index < this.bucket.length; index++) {
			sum += this.bucket[index];
		}
        this.rate = sum / (this.bucket.length || 1);
        this.lastTime = stop;

	}

	async saveCSV () {
		// (B) CREATE BLOB OBJECT
		var blob = new Blob([this.testData.toString()], {type: "text/csv"});

		// (C) FILE HANDLER & FILE STREAM
		const fileHandle = await window.showSaveFilePicker({
		  suggestedName : "test.csv",
		  types: [{
			description: "CSV file",
			accept: {"text/csv": [".csv"]}
		  }]
		});
		const fileStream = await fileHandle.createWritable();

		// (D) WRITE FILE
		await fileStream.write(blob);
		await fileStream.close();
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

customElements.define("rate-monitor", RateMonitor);