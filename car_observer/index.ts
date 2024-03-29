import $ from "jquery";

interface Observer {
    update(event: string): void;
}

class Car implements Observer {

    private eng: PowerSource | Source;


    public setEng(e: PowerSource | Source): void {
        this.eng = e;
        (this.eng as Source).register(this);
    }

    public run(): void {
        (this.eng as PowerSource).start();
    }

    public turnOff(): void {
        (this.eng as PowerSource).stop();
    }

    // Auto ilman moottoria on turha
    constructor(eng: PowerSource | Source) {
        this.eng = eng;
        (this.eng as Source).register(this);
    }

    update(event: string): void {
        console.log('Engine has sent an event:', event);
        $("#messages").append(`<li><p>New event received: ${event}</p></li>`);
    }
}

interface PowerSource {
    start(): void;
    temperature(): Number;
    stop(): void;
}

interface Source {
    register(observer: Observer): void;
    unregister(observer: Observer): void;
}

class Engine implements PowerSource, Source {

    private observers: Observer[] = [];

    register(observer: Observer): void {
        this.observers.push(observer);
    }

    unregister(observer: Observer): void {
        const index = this.observers.indexOf(observer, 0);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    private isStarted: boolean = false;

    public start(): void {
        this.isStarted = true;

        this.sendUpdateEvent('The engine has started');

        setTimeout(() => this.sendUpdateEvent('Engine temperature is now at ' + this.temperature()), 2000);
    }

    sendUpdateEvent(message: string) {
        this.observers.forEach(observer => observer.update(message));
    }

    public temperature(): Number {
        return this.isStarted ? 70 : 0; // Binäärinen moottori...
    }

    public stop(): void {
        this.isStarted = false;
        this.sendUpdateEvent('The engine has stopped');

        setTimeout(() => this.sendUpdateEvent('Engine cooling and temperature is now at ' + this.temperature()), 2000);
    }
}



$(document).ready(function () {
    start();
});

export function start(): void {
    const car: Car = new Car(new Engine());

    $("#start").on("click", function () {
        car.run();
    });

    $("#stop").on("click", function () {
        car.turnOff();
    });
}