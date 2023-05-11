import { LitElement,  html, css } from 'https://unpkg.com/lit@2.0.0/index.js?module';

import { baseFrameworkStyles } from './base-framework-css.mjs';

import { BaseList } from './base-list.mjs';

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
        this.frameworkList = [];
        //https://js-fc.github.io/js-framework-competition/test.html?framework=01GXVGCMM9SF0JHFEH6DY7J2X4&test=01H054KC6CJC758G56M9VRN378
        // this.frameworkList = [BaseList[0]];
        //this.testName = this.frameworkList[0].label;
        //this.frameSrc = this.frameworkList[0].url;
    }

    testResult = {}

    scheme = "http";
    hostname = "localhost";
    port = 7000
    frameworkList = [];

    static get waitBeforeCollecting() {
        return 1000;
    }

    static get collectTime() {return 2000}; // ms
	static get sleepTime() {return 10}; // ms

    render() {
        return html`
            <div class="title">Framework Speed Competition</div>
            <div id="render-info">Running test: ${this.testName} Mutation: ${this.mutation}%</div>
            <iframe id="render-frame" @onload="${this.onFrameLoad}" height="650px" width="100%" src="${this.frameSrc}"></iframe>
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
        this.getParams();
        this.getFramework();

    }

    updated(e) {

    }

    getParams() {
        const searchParams = new URLSearchParams(window.location.search); //01GJFRHJ6M5DQX9AE0CXXC6H05
        this.frameworkUlid = searchParams.get('framework');
        this.testUlid = searchParams.get('test');

    }

    getFramework() {
        fetch(`${this.scheme}://${this.hostname}:${this.port}/api/framework/${this.frameworkUlid}`).then(response => response.json())
        .then(framework => {
            this.frameworkList.push(framework);
        }).then(() => this.checkDone());
    }

    async checkDone() {
        for (let i = 0; i < 1; i++) {
            let rateByMutation = [];
            for (let k = 0; k <= 0; k++) {
                this.mutation = k ? k * 25 : 1;
                this.testName = this.frameworkList[i].label;
                this.frameSrc = this.frameworkList[i].url;
                await this.sleep(BaseFramework.waitBeforeCollecting);
                if (!this.renderFrame.contentWindow.ENV) {
                    rateByMutation.push(0);
                    continue;
                }
                this.renderFrame.contentWindow.ENV.mutations(this.mutation / 100.0);

                while (!this.renderFrame.contentWindow.Monitoring) {
                    await this.sleep(100);
                }
                this.renderFrame.contentWindow.Monitoring.startMeasure();

                let rateData = [];
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

            // if (i === 0) {
            //     this.testResult.base = rateByMutation.slice();
            // }
            // else {
                this.testResult.rate = rateByMutation.slice();
            // }
            console.log(rateByMutation);
        }
        this.testResult.mutation = [1, 25, 50, 75, 100];
        console.log(this.testResult);

        await this.sentResult();
        window.close();
    }

    async sentResult() {
        const rawResponse = await fetch(`${this.scheme}://${this.hostname}:${this.port}/api/result/${this.testUlid}/framework/${this.frameworkUlid}`, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.testResult)
        });
        const content = await rawResponse.json();
        console.log(content);
    }

    sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

    async init() {

    }
}

customElements.define("base-framework", BaseFramework);