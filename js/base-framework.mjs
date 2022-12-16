import { LitElement,  html, css } from 'https://unpkg.com/lit@2.0.0/index.js?module';

import { baseFrameworkStyles } from './base-framework-css.mjs';

class BaseFramework extends LitElement {

    static get properties() {
        return {
            version: { type: String, default: '1.0.0', save: true, category: 'settings' }
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
    }

    testName = "Lit";
    mutation = 1;
    render() {
        return html`
            <div class="title">Framework Speed Competition</div>
            <div id="render-info">Running test: ${this.testName} Mutation: ${this.mutation}%</div>
            <iframe id="render-frame" onload="${()=>this.onFrameLoad()}" height="650px" width="100%" src="../frameworks/lit"></iframe>
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
        this.checkDone();
    }

    updated(e) {

    }

    async checkDone() {
        var rateByMutation = [];
		for (var k = 0; k <= 4; k++) {
			var mutation = k * .25;
			if (mutation == 0) {
				mutation = 0.01;
			}
            let sum = 0;
            console.log(111);
            await this.sleep(2000);


            console.log(222);
            if (mutation == 0) {
				mutation = 0.01;
			}
        }
    }

    sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
    async init() {

    }
}

customElements.define("base-framework", BaseFramework);