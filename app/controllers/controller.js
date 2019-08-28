import Service from '../services/service.js'
import Car from '../models/car.js'
import House from '../models/house.js'
import Job from '../models/job.js'
import { API, CarStruct, HouseStruct, JobStruct, Common, MVCSO } from '../constants/constants.js'

let _service = new Service()
let _api = API.CARS

function _getFormTemplate() {
  switch (_api) {
    case API.CARS:
      return (new Car(new CarStruct())).Form
    case API.HOUSES:
      return (new House(new HouseStruct())).Form
    case API.JOBS:
      return (new Job(new JobStruct())).Form
  }
}

function _getCards() {
  switch (_api) {
    case API.CARS:
      return _service.Cars
    case API.HOUSES:
      return _service.Houses
    case API.JOBS:
      return _service.Jobs
  }
}

function _drawForm() {
  document.getElementById('form').innerHTML = _getFormTemplate()
}

function _drawCards() {
  let template = ''
  let cards = _getCards()
  cards.forEach(card => {
    template += card.Card
  })
  document.getElementById('cards').innerHTML = template
}

function _draw() {
  _drawForm()
  _drawCards()
}

export default class Controller {
  constructor() {
    //NOTE Add Observers/Subscribers
    _service.addSubscriber(API.CARS, _draw)
    _service.addSubscriber(API.HOUSES, _draw)
    _service.addSubscriber(API.JOBS, _draw)

    this.loadApi(_api)
  }

  addCar(event) {
    _service.add(API.CARS, event)
  }

  addHouse(event) {
    _service.add(API.HOUSES, event)
  }

  addJob(event) {
    _service.add(API.JOBS, event)
  }

  deleteCar(Id) {
    _service.delete(API.CARS, Id)
  }

  deleteHouse(Id) {
    _service.delete(API.HOUSES, Id)
  }

  deleteJob(Id) {
    _service.delete(API.JOBS, Id)
  }

  bidOnCar(Id, increment) {
    _service.bid(API.CARS, Id, increment)
  }

  bidOnHouse(Id, increment) {
    _service.bid(API.HOUSES, Id, increment)
  }

  bidOnJob(Id, increment) {
    _service.bid(API.JOBS, Id, increment)
  }

  loadApi(api) {
    _service.loadApi(api)
  }

  changeApi(event) {
    event.preventDefault()
    let api = event.target
    _api = api.value
    this.loadApi(_api)
  }

  search(event) {
    event.preventDefault()
  }
}

