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
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    padding: 0;
                    margin: 20px 0 0;
                    justify-content: flex-start;
                    position: relative;
                    box-sizing: border-box;
                }
            `
        ]
    }

    constructor() {
        super();
        this.version = "1.0.0";
    }

    render() {
        return html`
            <div id="render-box">
                <div id="render-info"></div>
                <iframe id="render-frame" height="1080" width="1920" src="../frameworks/lit"></iframe>
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

    }

    async init() {

    }
}

customElements.define("base-framework", BaseFramework);