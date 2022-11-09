import { LitElement,  html, css } from 'https://unpkg.com/lit@2.0.0/index.js?module';

import { List } from './lit-list.js';

import { frameworkStyles } from './framework-list-css.js';

class FrameworkList extends LitElement {

    static get properties() {
        return {
            version: { type: String, default: '1.0.0', save: true, category: 'settings' }
        }
    }

    static get styles() {
        return [
            frameworkStyles,
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
			${List.map( item =>
                // html`<div key="1" class="child ${item.type}" @click="${this._handleClick}">
                //     <a href="${item.url}" target="_blank">${item.hide_label ? '' : item.label} </a>
                // </div>`
                html`<div key="1" class="child ${item.type}" @click="${() => window.open(item.url, '_blank')}">
                    <a href="${item.url}" target="_blank">${item.hide_label ? '' : item.label} </a>
                </div>`
            )}
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

customElements.define("framework-list", FrameworkList);