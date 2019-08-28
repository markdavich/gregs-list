import Controller from './controllers/controller.js'

class App {
  constructor() {
    this.controllers = {
      controller: new Controller()
    }
  }
}

window['app'] = new App()
