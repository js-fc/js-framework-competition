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
            <iframe id="render-frame" height="650px" width="100%" src="../frameworks/lit"></iframe>
        `;
    }

    _handleClick(e) {
        console.log(e.target);
    }

    firstUpdated() {
        super.firstUpdated();
    }

    updated(e) {

    }

    async init() {

    }
}

customElements.define("base-framework", BaseFramework);