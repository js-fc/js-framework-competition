import { LitElement,  html, css } from 'https://unpkg.com/lit@2.0.0/index.js?module';

import { frameworkStyles } from './framework-list-css.js';

class FrameworkEvent extends LitElement {

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
                    padding: 0;
                    margin: 20px 0 0;
                    position: relative;
                    box-sizing: border-box;
                    color: white;
                }
                table {
                    width: 100%;
                }
                tr {
                   text-align: center;
                }
            `
        ]
    }

    list = [{name: "Lit", 0: 10.1}]

    events

    constructor() {
        super();
        this.version = "1.0.0";
    }

    render() {
        return html`
            <table id="ranking">
                <thead>
                    <tr>
                        <th style="min-width:25px"></th>
                        <th style="min-width:250px">Name</th>
                        <th style="min-width:100px">1%</th>
                        <th style="min-width:100px">25%</th>
                        <th style="min-width:100px">50%</th>
                        <th style="min-width:100px">75%</th>
                        <th data-sort-default aria-sort="descending" style="min-width:100px">100%</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.list.map( (item, index) =>
                        html`
                        <tr>
                            <td>${index}</td>
                            <td>${item.name}</td>
                            <td>${item[0]}</td>
                        </tr>
                        `
                    )}
                </tbody>
            </table>
        `;
    }

    _handleClick(e) {
        console.log(e.target);
    }

    firstUpdated() {
        super.firstUpdated();
        this.events = new EventSource('http://localhost:7000/sse');
        this.events.onmessage = (event) => {
            this.getEvent(event);
        };
    }

    updated(e) {

    }

    getEvent(event) {
        const parsedData = JSON.parse(event.data);
        console.log(parsedData);
    }

    async init() {

    }
}

customElements.define("framework-event", FrameworkEvent);