console.clear();

class State {
  public main() : void {}
}

class HelloState extends State {
  public main() : void {
    console.log("Hello State!");
  }
}

class GoodbyeState extends State {
  public main() : void {    
    console.log("Goodbye State!");
  }
}

class StateMachine {
  private state : State;
  constructor() {
    this.state = new HelloState();
  }
  
  public changeState(state : State) : void {
    this.state = new state();
  }
  
  public onEvent() : void {
    this.state.main();
  }
}

let machine : StateMachine = new StateMachine();
machine.onEvent();
machine.changeState(GoodbyeState);
machine.onEvent();