import { css } from 'https://unpkg.com/lit@2.0.0/index.js?module';
export const frameworkStyles = css`

a {
    color: white;
    text-decoration: none;
    width: 100%;
}

.optimized {
    background-color: #FF6347;
    /*#FF6347;*/
}

.todo {
    background-color: #2167FF;
    /*#0EB26D;*/
}

.naive {
    background-color: #EBA636;
    /*rgb(100, 100, 100);*/
}

.odajs {
    background-image: url(../images/odajs.png);
    background-size: cover;
    background-repeat: no-repeat;
}

.child .odajs {
    align-items: flex-end;
}

.odajs>a {
    margin-bottom: 5px;
}

.lit {
    background-image: url(../images/lit.png);
    background-size: cover;
    background-repeat: no-repeat;
}

.child.lit {
    align-items: flex-end;
}

.lit>a {
    margin-bottom: 5px;
}

.angular {
    background-image: url(../images/angular.png);
    background-size: cover;
    background-repeat: no-repeat;
}

.child.angular {
    align-items: flex-end;
}

.angular>a {
    margin-bottom: 5px;
}

.angular-light {
    background-image: url(../images/angular-light.png);
    background-size: cover;
    background-repeat: no-repeat;
}

.child.angular-light {
    align-items: flex-end;
}

.angular-light>a {
    margin-bottom: 5px;
}

.aurelia {
    background-image: url(../images/aurelia.png);
    background-size: cover;
    background-repeat: no-repeat;
}

.child.aurelia {
    align-items: flex-end;
}

.aurelia>a {
    margin-bottom: 5px;
}

.backbone {
    background-image: url(../images/backbone.png);
    background-size: cover;
    background-repeat: no-repeat;
}

.child.backbone {
    align-items: flex-end;
}

.backbone>a {
    margin-bottom: 5px;
}

.backbone-marionette {
    background-image: url(../images/backbone-marionette.png);
    background-size: cover;
    background-repeat: no-repeat;
}

.child.backbone-marionette {
    align-items: flex-end;
}

.backbone-marionette>a {
    margin-bottom: 5px;
}

.d3 {
    background-image: url(../images/d3.png);
    background-size: cover;
    background-repeat: no-repeat;
}

.child.d3 {
    align-items: flex-end;
}

.d3>a {
    margin-bottom: 5px;
}

.riot {
    background-image: url(../images/riot.png);
    background-size: cover;
    background-repeat: no-repeat;
}

.child.riot {
    align-items: flex-end;
}

.riot>a {
    margin-bottom: 5px;
}

.ember {
    background-image: url(../images/ember.png);
    background-size: cover;
    background-repeat: no-repeat;
}

.child.ember {
    align-items: flex-end;
}

.ember>a {
    margin-bottom: 5px;
}

.polymer {
    background-image: url(../images/polymer.png);
    background-size: cover;
    background-repeat: no-repeat;
}

.mithril {
    background-image: url(../images/mithril.png);
    background-size: cover;
    background-repeat: no-repeat;
}

.child.mithril {
    align-items: flex-end;
}

.mithril>a {
    margin-bottom: 5px;
}

.cycle {
    background-image: url(../images/cycle.png);
    background-size: cover;
    background-repeat: no-repeat;
}

.child.cycle {
    align-items: flex-end;
}

.cycle>a {
    margin-bottom: 5px;
}

.ractive {
    background-image: url(../images/ractive.png);
    background-size: cover;
    background-repeat: no-repeat;
}

.child.ractive {
    align-items: flex-end;
}

.cycle>a {
    margin-bottom: 5px;
}

.motorcycle {
    background-image: url(../images/motorcycle.png);
    background-size: cover;
    background-repeat: no-repeat;
}

.child.motorcycle {
    align-items: flex-end;
}

.motorcycle>a {
    margin-bottom: 5px;
}

.react {
    background-image: url(../images/react.png);
    background-size: cover;
    background-repeat: no-repeat;
}

.preact {
    background-image: url(../images/preact.png);
    background-size: cover;
    background-repeat: no-repeat;
}

.child.preact {
    align-items: flex-end;
}

.preact > a {
    margin-bottom: 5px;
}

.vue {
    background-image: url(../images/vue.png);
    background-size: cover;
    background-repeat: no-repeat;
}

.child.vue {
    align-items: flex-end;
}

.vue>a {
    margin-bottom: 5px;
}

.svelte {
    background-image: url(../images/svelte.png);
    background-size: cover;
    background-repeat: no-repeat;
}

.container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    justify-content: flex-start;
}

.child {
    padding: 0px;
    width: 200px;
    height: 200px;
    margin-top: 10px;
    margin-left: 5px;
    margin-right: 5px;
    color: white;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
    display: flex;
    align-items: flex-end;
    cursor: pointer;
}

.child > a {
    margin-bottom: 5px;
}

.child:hover {
    animation-name: blop;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-duration: 2s;
}

.color {
    width: 15px;
    height: 15px;
}

.fw {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 12px;
    color: white;
    width: 120px;
    text-align: right;
}

@keyframes blop {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }

    100% {
        transform: scale(1);
    }
}
`;