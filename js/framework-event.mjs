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

    scheme = "http";
    hostname = "localhost"
    port = 7000
    frameworks = new Map()
    results = []

    eventSource

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
                    ${this.results.map( (task, index) =>
                        html`
                        <tr>
                            <td>${index}</td>
                            <td>${task._id}</td>
                            <td>${task._id}</td>
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
        this.eventSource = new EventSource('http://localhost:7000/sse');
        this.eventSource.onmessage = (event) => {
            this.getEvent(event);
        };
        this.eventSource.addEventListener('close', event => {
            const reason = JSON.parse(event.data);
            console.log(reason);
            this.eventSource.close();
        })
        fetch(`${this.scheme}://${this.hostname}:${this.port}/api/frameworks`).then(response => response.json())
            .then(frameworks => {
                frameworks.rows.forEach(framework => {
                    this.frameworks.set(framework.doc._id, framework.doc)
                });
                this.frameworks.forEach((value, key) => console.log(`${key} : ${JSON.stringify(value)}`))

            });
    }

    updated(e) {

    }

    getEvent(event) {
        const test = JSON.parse(event.data);
        test.frameworkId = test._id.split(':')[3];
        this.results.push(test);
        this.requestUpdate();
        console.log(test);
    }

    async init() {

    }
}

customElements.define("framework-event", FrameworkEvent);