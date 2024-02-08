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
        this.eng.register(this);
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
        this.eng.register(this);
    }
    update(event) {
        console.log('Engine has sent an event:', event);
        (0, jquery_1.default)("#messages").append(`<li><p>New event received: ${event}</p></li>`);
    }
}
class Engine {
    constructor() {
        this.observers = [];
        this.isStarted = false;
    }
    register(observer) {
        this.observers.push(observer);
    }
    unregister(observer) {
        const index = this.observers.indexOf(observer, 0);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }
    start() {
        this.isStarted = true;
        this.sendUpdateEvent('The engine has started');
        setTimeout(() => this.sendUpdateEvent('Engine temperature is now at ' + this.temperature()), 2000);
    }
    sendUpdateEvent(message) {
        this.observers.forEach(observer => observer.update(message));
    }
    temperature() {
        return this.isStarted ? 70 : 0; // Binäärinen moottori...
    }
    stop() {
        this.isStarted = false;
        this.sendUpdateEvent('The engine has stopped');
        setTimeout(() => this.sendUpdateEvent('Engine cooling and temperature is now at ' + this.temperature()), 2000);
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
