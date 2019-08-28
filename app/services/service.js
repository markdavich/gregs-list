import Car from '../models/car.js'
import House from '../models/house.js'
import Job from '../models/job.js'
import { API, CarStruct, HouseStruct, JobStruct, Common, MVCSO } from '../constants/constants.js'

//NOTE Add axios
let _carApi = axios.create({
  baseURL: API.baseURL
})

let _api = axios.create({
  baseURL: API.baseURL
})

let _state = {
  cars: [],
  houses: [],
  jobs: []
}

// Observers
let _subscribers = {
  cars: [],
  houses: [],
  jobs: []
}

function _setState(propertyToSet, newValue) {
  _state[propertyToSet] = newValue
  _subscribers[propertyToSet].forEach(observerFunction => observerFunction())
}

function _addToState(propertyToSet, valueToAdd) {
  _setState(propertyToSet, [valueToAdd, ..._state[propertyToSet]])
}

function _removeFromState(propertyToSet, idToRemove) {
  let itemIndex = _state[propertyToSet].findIndex(item => {
    item._id === idToRemove
  })
  let newState = [..._state[propertyToSet]].splice(itemIndex, 1)
  _setState(propertyToSet, newState)
}

// function _addCarToState(car) {
//   _state.cars.push(car)
//   _setState('cars', _state.cars)
// }

// function _deleteCarFromState(carId) {
//   let carIndex = _state.cars.findIndex(car => {
//     car._id === carId
//   })
//   _state.cars.splice(carIndex, 1)
//   _setState('cars', _state.cars)
// }

function _getCatagoryObject(api, catagoryData) {
  switch (api) {
    case API.CARS:
      return new Car(new CarStruct(catagoryData))
    case API.HOUSES:
      return new House(new HouseStruct(catagoryData))
    case API.JOBS:
      return new Job(new JobStruct(catagoryData))
  }
}

function _getCatagoryStruct(api, catagoryData) {
  switch (api) {
    case API.CARS:
      return new CarStruct(catagoryData)
    case API.HOUSES:
      return new HouseStruct(catagoryData)
    case API.JOBS:
      return new JobStruct(catagoryData)
  }
}

function _getObjectFromEvent(api, event) {
  let catagoryObject = _getCatagoryStruct(api)
  let form = event.target

  Object.keys(catagoryObject).forEach(key => {
    if (form.hasOwnProperty(key)) {
      catagoryObject[key] = form[key].value
    }
  });

  return catagoryObject
}

export default class Service {
  constructor() {

  }

  get Cars() {
    return _state.cars.map(car => new Car(new CarStruct(car.props)))
  }

  get Houses() {
    return _state.houses.map(house => new House(new HouseStruct(house.props)))
  }

  get Jobs() {
    return _state.jobs.map(job => new Job(new JobStruct(job.props)))
  }

  addSubscriber(api, functionToRun) {
    _subscribers[api].push(functionToRun)
  }

  loadApi(api) {
    _api.get(api)
      .then(response => {
        let data = response.data.data.map(data => _getCatagoryObject(api, data))
        _setState(api, data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  add(api, event) {
    event.preventDefault()
    let data = _getObjectFromEvent(api, event)

    _api.post(api, data)
      .then(response => {
        _addToState(api, response.data.data)
        // _addCarToState(response.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  delete(api, Id) {
    //NOTE This is a DELETE request
    _api.delete(`${api}/${Id}`)
      .then(response => {
        _removeFromState(API.CARS, Id)
      })
      .catch(error => {
        console.log(error)
      })
  }

  bid(api, Id, increment) {
    //NOTE This PUT request. PUT requests modify data
    //Find object increas price by $1
    let catagoryObject = _state[api].find(obj => {
      return obj.props._id === Id
    })

    let price = Common.toFloat(catagoryObject.props.price) + increment
    catagoryObject.props.price =  price

    _api.post(`${api}/${Id}`, catagoryObject.props)
      .then(response => {
        _setState('cars', _state.cars)
      })
      .catch(error => {
        console.log(error)
      })
  }
}