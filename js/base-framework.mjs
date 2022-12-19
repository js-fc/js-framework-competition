import { LitElement,  html, css } from 'https://unpkg.com/lit@2.0.0/index.js?module';

import { baseFrameworkStyles } from './base-framework-css.mjs';

import { List } from './lit-list.js';

class BaseFramework extends LitElement {

    static get properties() {
        return {
            version: { type: String, default: '1.0.0', save: true, category: 'settings' },
            testName: { type: String },
            mutation: { type: Number },
            frameSrc: { type: String },
        }
    }

    static get styles() {
        return [
            baseFrameworkStyles,
            css`
                :host {
                    flex: 100%;
                    box-sizing: border-box;
                }
                input[type=range] {
                    display: block;
                    width: 100%;
                }
            `
        ]
    }

    constructor() {
        super();
        this.version = "1.0.0";
        this.mutation = 0;
        this.testName = List[0].label;
        this.frameSrc = List[0].url;
    }

    renderFrame;
    result = {};

    static get waitBeforeCollecting() {
        return 1000;
    }

    static get collectTime() {return 2000}; // ms
	static get sleepTime() {return 10}; // ms

    render() {
        return html`
            <div class="title">Framework Speed Competition</div>
            <div id="render-info">Running test: ${this.testName} Mutation: ${this.mutation}%</div>
            <iframe id="render-frame" onload="${()=>this.onFrameLoad()}" height="650px" width="100%" src="${this.frameSrc}"></iframe>
        `;
    }

    _handleClick(e) {
        console.log(e.target);
    }

    onFrameLoad() {
        console.log("111");
    }

    firstUpdated() {
        super.firstUpdated();
        this.renderFrame = this.renderRoot.querySelector('#render-frame');
        this.checkDone();
    }

    updated(e) {

    }

    async checkDone() {
        for (let i = 0; i < 2; i++) {
            let rateByMutation = [];
            for (let k = 0; k <= 4; k++) {
                this.mutation = k ? k * 25 : 1;
                this.testName = List[i].label;
                this.frameSrc = List[i].url;
                await this.sleep(BaseFramework.waitBeforeCollecting);
                if (!this.renderFrame.contentWindow.ENV) {
                    rateByMutation.push(0);
                    continue;
                }
                this.renderFrame.contentWindow.ENV.mutations(this.mutation / 100.0);
                let rateData = [];
                this.renderFrame.contentWindow.Monitoring.startMeasure();
                for (let j = 0; j < BaseFramework.collectTime; j += BaseFramework.sleepTime) {
                    await this.sleep(BaseFramework.sleepTime);
                    if (this.renderFrame.contentWindow.Monitoring) {
                        let rate = this.renderFrame.contentWindow.Monitoring.rate;
                        rateData.push(rate)
                    }
                }

                let sumRate = 0;
                for (var j = 0; j < rateData.length; j++) {
                    sumRate += rateData[j];
                }
                let averageRate = sumRate / rateData.length;

                rateByMutation.push(averageRate);
            }

            if (i === 0) {
                this.result.rate = rateByMutation.slice();
            }
            else {
                this.result.base = rateByMutation.slice();
            }
            console.log(rateByMutation);
        }
        window.close()
    }

    sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

    async init() {

    }
}

customElements.define("base-framework", BaseFramework);