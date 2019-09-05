import Controller from './controllers/controller.js'

class App {
  constructor() {
    this.controllers = {
      controller: new Controller()
    }
  }
}

window['app'] = new App()

function windowResize() {
  let navBar = document.getElementById('nav-bar')
  
  document.body.style.paddingTop = `${navBar.clientHeight + 20}px`
}

window.onresize = windowResize;

windowResize()
