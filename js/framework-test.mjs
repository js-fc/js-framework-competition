import { LitElement,  html, css } from 'https://unpkg.com/lit@2.0.0/index.js?module';

import { frameworkStyles } from './framework-test-css.js';

class FrameworkTest extends LitElement {

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
    renderInfo = ``
    mutation = 1
    numberTest = 0

    eventSource

    constructor() {
        super();
        this.version = "1.0.0";
        const urlParams = new URLSearchParams(window.location.search);
        console.log(JSON.stringify( urlParams))
        //this.createEventSource();
        //this.getFrameworks();
    }

    render() {
        return html`
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
                <span class="title">Framework Speed Competition</span>
                <div class="legend">
                   <div class="legendChild">
                       <span class="fw">Todo implementation</span>
                        <div class="color todo"></div>
                    </div>
                    <div class="legendChild">
                        <span class="fw">Naive implementation</span>
                        <div class="color naive"></div>
                    </div>
                    <div class="legendChild">
                        <span class="fw">Optimized implementation</span>
                        <div class="color optimized"></div>
                    </div>
                </div>
            </div>
            <div id="render-box">
                <div id="render-info">Total tests ( ${this.numberTest}/${this.list.length}): Running test ( ${this.mutation}/5): ${this.list[this.numberTest].label}</div>
                <iframe id="render-frame" height="1080" width="1920" src ='./frameworks/vue'></iframe>
            </div>
        `;
    }

    _handleClick(e) {
        console.log(e.target);
    }

    firstUpdated() {
        super.firstUpdated();
        window.frames["render-frame"].contentWindow.ENV.mutations(1);
    }

    updated(e) {

    }

    createEventSource() {
        this.eventSource = new EventSource('http://localhost:7000/sse');
        this.eventSource.onmessage = (event) => {
            this.getEvent(event);
        };
        this.eventSource.addEventListener('close', event => {
            const reason = JSON.parse(event.data);
            console.log(reason);
            this.eventSource.close();
        })
    }

    getEvent(event) {
        const test = JSON.parse(event.data);
        test.frameworkId = test._id.split(':')[3];
        this.results.push(test);
        this.requestUpdate();
        console.log(test);
    }

    getFrameworks(){
        fetch(`${this.scheme}://${this.hostname}:${this.port}/api/frameworks`).then(response => response.json())
        .then(frameworks => {
            frameworks.rows.forEach(framework => {
                this.frameworks.set(framework.doc._id.split(':')[1], framework.doc)
            });
            this.frameworks.forEach((value, key) => console.log(`${key} : ${JSON.stringify(value)}`))
        });
    }

    getResults(){
        fetch(`${this.scheme}://${this.hostname}:${this.port}/api/frameworks`).then(response => response.json())
        .then(frameworks => {
            frameworks.rows.forEach(framework => {
                this.frameworks.set(framework.doc._id.split(':')[1], framework.doc)
            });
            this.frameworks.forEach((value, key) => console.log(`${key} : ${JSON.stringify(value)}`))
        });
    }

    async init() {

    }
}

customElements.define("framework-test", FrameworkTest);