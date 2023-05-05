import { LitElement,  html, css } from 'https://unpkg.com/lit@2.0.0/index.js?module';

import { frameworkStyles } from './framework-test-css.js';

class FrameworkTest extends LitElement {

    static get properties() {
        return {
            version: { type: String, default: '1.0.0', save: true, category: 'settings' },
            testSource: { type: String, default: '1.0.0', save: false, category: 'settings' }
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
    frameworkId
    testId
    baseId


    eventSource

    constructor() {
        super();
        this.version = "1.0.0";
        const urlParams = new URLSearchParams(window.location.search);
        this.frameworkId = urlParams.get('framework');
        this.testId = urlParams.get('test');
        this.baseId = '01GXVG6BDA4JP0ZWH9CT832BAN';
        this.getFramework()
        this.getBase()

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
                <iframe id="render-frame" height="1080" width="1920" src = "${this.testSource}"></iframe>
            </div>
        `;
    }

    _handleClick(e) {
        console.log(e.target);
    }

    firstUpdated() {
        super.firstUpdated();
       // window.frames["render-frame"].contentWindow.ENV.mutations(1);
    }

    updated(e) {

    }

    change() {
	    for (var i = 0; i < List.length; i++) {
		    var rateByMutation = [];
		    for (var k = 0; k <= 4; k++) {
			    this.mutation = k == 0 ? 0.01 : k * .25;

			window.frames["render-frame"].contentWindow.ENV.mutations(this.mutation);
			var rateData = [];

			var sumRate = 0;
			for (var j = 0; j < rateData.length; j++) {
				sumRate += rateData[j];
			}
			var averageRate = sumRate / rateData.length;

			// var memory = 0;
			// if (window.frames["render-frame"].contentWindow.Monitoring) {
			//	 memory = window.frames["render-frame"].contentWindow.Monitoring.memoryStats.memory();
			// }
			rateByMutation.push(averageRate);
		}
		var tr = document.createElement('tr');

		switch (List[i].type) {
			case 'naive':
				tr.setAttribute('class', 'color naive');
				break;
			case 'optimized':
				tr.setAttribute('class', 'color optimized');
				break;
		}


		var td0 = document.createElement('td');
		td0.innerText = i + 1;
		tr.appendChild(td0);
		var td1 = document.createElement('td');
		td1.innerText = List[i].label;
		tr.appendChild(td1);
		for (var k = 0; k < rateByMutation.length; k++) {

			var td2 = document.createElement('td');
			td2.innerText = rateByMutation[k].toFixed(2);
			tr.appendChild(td2);
		}
		// var td3 = document.createElement('td');
		// td3.innerText = memory;
		// tr.appendChild(td3);
		document.getElementById("ranking-body").appendChild(tr);

		if (!tableSort) {
			tableSort = new Tablesort(document.getElementById('ranking'));
		}
		tableSort.refresh();

		// update number after sort
		var trs = document.getElementById('ranking').getElementsByTagName('tr')
		for (var k = 1; k < trs.length; k++) {
			trs[k].getElementsByTagName('td')[0].innerText = k;
		}
	}
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

    getTest(){
        fetch(`${this.scheme}://${this.hostname}:${this.port}/api/test/${this.testId}`).then(response => response.json())
        .then(test => {
            this.list[0] = test

        });
    }

    getFramework(){
        fetch(`${this.scheme}://${this.hostname}:${this.port}/api/framework/${this.frameworkId}`).then(response => response.json())
        .then( framework =>
            this.list[1] = framework
        );
    }

    getBase(){
        fetch(`${this.scheme}://${this.hostname}:${this.port}/api/framework/${this.baseId}`).then(response => response.json())
        .then( framework => {
            this.list[0] = framework;
            this.testSource = framework.url
        });
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