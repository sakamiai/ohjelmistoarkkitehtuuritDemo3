import $ from "jquery";

interface PowerSource {
    start(): void;
    temperature(): Number;
    stop(): void;
}

class Car {
    
    private eng: PowerSource;
    
    public setEng(e: PowerSource): void {
        this.eng = e;
    }

    public run(): void {
        this.eng.start();
    }

    public turnOff(): void {
        this.eng.stop();
    }

    // Auto ilman moottoria on turha
    constructor(eng: PowerSource) {
        this.eng = eng;
    }
}

class Engine implements PowerSource {

    private isStarted: boolean = false;
   
    public start(): void {
        console.log('The engine has started');
        this.isStarted = true;
    }

    public temperature(): Number {
        return this.isStarted ? 70 : 0; // Binäärinen moottori...
    }

    public stop(): void {
        console.log('The engine has stopped')
        this.isStarted = false;
    }
}


$( document ).ready(function() {
    start();
});

export function start(): void {
    const car: Car = new Car(new Engine());
    
    $("#start").on( "click", function() {
        car.run();
    });
    
    $("#stop").on( "click", function() {
        car.turnOff();
    } );
}