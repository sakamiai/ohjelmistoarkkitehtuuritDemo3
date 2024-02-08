"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const jquery_1 = __importDefault(require("jquery"));
class Car {
    setEng(e) {
        this.eng = e;
    }
    run() {
        this.eng.start();
    }
    turnOff() {
        this.eng.stop();
    }
    // Auto ilman moottoria on turha
    constructor(eng) {
        this.eng = eng;
    }
}
class Engine {
    constructor() {
        this.isStarted = false;
    }
    start() {
        console.log('The engine has started');
        this.isStarted = true;
    }
    temperature() {
        return this.isStarted ? 70 : 0; // Binäärinen moottori...
    }
    stop() {
        console.log('The engine has stopped');
        this.isStarted = false;
    }
}
(0, jquery_1.default)(document).ready(function () {
    start();
});
function start() {
    const car = new Car(new Engine());
    (0, jquery_1.default)("#start").on("click", function () {
        car.run();
    });
    (0, jquery_1.default)("#stop").on("click", function () {
        car.turnOff();
    });
}
exports.start = start;
