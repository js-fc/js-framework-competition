import { css } from 'https://unpkg.com/lit@2.0.0/index.js?module';
export const frameworkStyles = css`

#render-frame {
    background-color: white;
}

#render-info {
    color: white;
}

#ranking {
    color: white;
}

.title {
    color: rgb(102, 102, 102);
    font-weight: bold;
}

@media(min-width: 1025px) {
    .title {
    font-size: 80px;
    }
}

@media(max-width: 1024px) {
    .title {
    font-size: 40px;
    }
}

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

.container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    justify-content: flex-start;
}

.legend {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
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
    align-items: center;
    cursor: pointer;
}

.child:hover {
    animation-name: blop;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-duration: 2s;
}

.legendChild {
    width: 200px;
    margin-top: 5px;
    color: white;
    text-align: center;
    display: flex;
    align-items: center;
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

tr {
    text-align: center;
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