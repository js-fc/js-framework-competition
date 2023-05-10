import { LitElement,  html, css } from 'https://unpkg.com/lit@2.0.0/index.js?module';

//import { frameworkStyles } from './framework-list-css.js';
import { eventFrameworkStyles } from './framework-event-css.mjs';

class FrameworkEvent extends LitElement {

    static get properties() {
        return {
            version: { type: String, default: '1.0.0', save: true, category: 'settings' }
        }
    }

    static get styles() {
        return [
            eventFrameworkStyles,
            css`
                :host {
                    padding: 0;
                    //margin: 20px 0 0;
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
                .sort {
                    background-color: #EBA636;
                }
            `
        ]
    }

    list = [{name: "Lit", 0: 10.1}]
    mainColor = 'red';

    scheme = "http";
    hostname = "localhost"
    port = 7000
    frameworks = new Map()
    results = []
    testId
    sortColumn = 4
    sortDirection = false

    eventSource

    constructor() {
        super();
        this.version = "1.0.0";
        this.createEventSource();
        this.getFrameworks();
        this.getMyResult('01GZY1QDQ1VV3BBK5R72FZ7HR8', '01GJFRHJ6M5DQX9AE0CXXC6H05')
        this.getMyResult('01GZY1QDQ1VV3BBK5R72FZ7HR8', '01GXVG6BDA4JP0ZWH9CT832BAN')
    }

    render() {
        return html`
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
                <span class="title">Framework Speed Competition</span>
            </div>
            <table id="ranking">
                <thead>
                    <tr>
                        <th style="width:25px"></th>
                        <th style="width:250px" class=${this.sortColumn == -1 ? "sort" : ""} @click=${ () => this.sortName(-1) }>Name</th>
                        <th style="width:100px" class=${this.sortColumn == 0 ? "sort" : ""} @click=${ () => this.sortTable(0) }>1%</th>
                        <th style="width:100px" class=${this.sortColumn == 1 ? "sort" : ""} @click=${ () => this.sortTable(1) }>25%</th>
                        <th style="width:100px" class=${this.sortColumn == 2 ? "sort" : ""} @click=${ () => this.sortTable(2) }>50%</th>
                        <th style="width:100px" class=${this.sortColumn == 3 ? "sort" : ""} @click=${ () => this.sortTable(3) }>75%</th>
                        <th data-sort-default class=${this.sortColumn == 4 ? "sort" : ""} aria-sort="descending" style="min-width:100px" @click=${ () => this.sortTable(4) }>100%</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.results.map( (task, index) =>
                        html`
                        <tr>
                            <td>${index+1}</td>
                            <td>${task.label}</td>
                            <td>${(task.result[0]).toFixed(2)}</td>
                            <td>${(task.result[1]).toFixed(2)}</td>
                            <td>${(task.result[2]).toFixed(2)}</td>
                            <td>${(task.result[3]).toFixed(2)}</td>
                            <td>${(task.result[4]).toFixed(2)}</td>
                        </tr>
                        `
                    )}
                </tbody>
            </table>
        `;
    }

    //<td>${this.frameworks.get(task._id.split(':')[3]).label}</td>
    _handleClick(e) {
        console.log(e.target);
    }

    firstUpdated() {
        super.firstUpdated();
    }

    updated(e) {

    }

    sortName(sortColumn) {
        this.sortDirection = sortColumn === this.sortColumn? !this.sortDirection : false;
        this.sortColumn = sortColumn
        this.results.sort( (a, b) => this.sortDirection ?
            (this.frameworks.get(a._id.split(':')[2]).label > this.frameworks.get(b._id.split(':')[2]).label ? 1 : this.frameworks.get(a._id.split(':')[2]).label === this.frameworks.get(b._id.split(':')[2]).label ? 0 : -1) :
            (this.frameworks.get(a._id.split(':')[2]).label < this.frameworks.get(b._id.split(':')[2]).label ? 1 : this.frameworks.get(a._id.split(':')[2]).label === this.frameworks.get(b._id.split(':')[2]).label ? 0 : -1)
        )
        this.requestUpdate();
    }

    sortTable(sortColumn){
        this.sortDirection = sortColumn === this.sortColumn? !this.sortDirection : false;
        this.sortColumn = sortColumn
        this.results.sort( (a, b) =>
            this.sortDirection ? a.rate[sortColumn] - b.rate[sortColumn] : b.rate[sortColumn] - a.rate[sortColumn]
        )
        this.requestUpdate();
    }

    resortTable(){
        if (this.sortColumn === -1) {
            this.results.sort( (a, b) =>
                this.frameworks.get(a._id.split(':')[2]).label > this.frameworks.get(b._id.split(':')[2]).label ? 1 : this.frameworks.get(a._id.split(':')[2]).label == this.frameworks.get(b._id.split(':')[2]).label ? -1 : 0
            )
        }
        else {
            this.results.sort( (a, b) =>
                this.sortDirection ? a.rate[this.sortColumn] - b.rate[this.sortColumn] : b.rate[this.sortColumn] - a.rate[this.sortColumn]
            )
        }
    }

    createEventSource() {
        this.eventSource = new EventSource('http://localhost:7000/sse');
        this.eventSource.onmessage = (event) => {
            this.getEvent(event);
        };
        this.eventSource.addEventListener('result', event => {
            const frameworkId = event.data;
            this.getResult(this.testId, frameworkId)
            console.log(frameworkId);
        })

        this.eventSource.addEventListener('test', event => {
            const testId = event.data;
            this.testId = testId
            console.log(testId);
        })

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
        //this.requestUpdate();
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

    getResult(resultId, frameworkId){
        fetch(`${this.scheme}://${this.hostname}:${this.port}/api/result/${resultId}/framework/${frameworkId}`).then(response => response.json())
        .then(framework => {
            console.log(framework)
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

    getMyResult(resultId, frameworkId) {
        fetch(`${this.scheme}://${this.hostname}:${this.port}/api/result/${resultId}/framework/${frameworkId}`).then(response => response.json())
        .then(framework => {
            framework.result = [];
            framework.mutation.forEach( (mutation, index) => {
                framework.result.push(framework.rate[index]/framework.base[index])
            });

            if (this.frameworks.has(frameworkId) )
            {
                framework.label = this.frameworks.get(frameworkId).label
                this.results.push(framework);
                this.resortTable();
                this.requestUpdate();
            }
            else {
                fetch(`${this.scheme}://${this.hostname}:${this.port}/api/framework/${frameworkId}`).then( response => response.json())
                .then( res => {
                    framework.label = res.label
                    this.results.push(framework);
                    this.resortTable();
                    this.requestUpdate();
                    console.log(framework);
                    console.log(res);
                })
            }
        })

    }
}

customElements.define("framework-event", FrameworkEvent);