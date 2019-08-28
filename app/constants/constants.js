export const API = {
  baseURL: 'http://bcw-sandbox.herokuapp.com/api/',
  CARS: 'cars',
  HOUSES: 'houses',
  JOBS: 'jobs'
}

export const MVCSO = {
  CONTROLLER: {
    ROUTE: 'app.controllers.controller.'
  },
  CAR_METHODS: {
    ADD: 'addCar',
    DELETE: 'deleteCar',
    BID: 'bidOnCar'
  },
  HOUSE_METHODS: {
    ADD: 'addHouse',
    DELETE: 'deleteHouse',
    BID: 'bidOnHouse'
  },
  JOB_METHODS: {
    ADD: 'addJob',
    DELETE: 'deleteJob',
    BID: 'bidOnJob'
  }
}

export class Catagory {
  constructor(api) {
    this.api = api
    this.route = MVCSO.CONTROLLER.ROUTE
    this.props = {}
    this.addMethod = ''
    this.bidMethod = ''
    this.deleteMethod = ''
  }

  get Form() {
    function getInputs(properties) {
      let inputs = ''

      Object.keys(properties).forEach(key => {
        if (!(key.charAt(0) === '_')) {
          inputs += `
            <div class="input-group m-3">
              <div class="input-group-prepend">
                <span class="input-group-text">${Common.properCase(key)}</span>
              </div>
              <input type="text" class="form-control" name="${key}">
            </div>
          `
        }
      })
      return inputs
    }
    return `
      <form onsubmit='${this.route}${this.addMethod}(event)' class="p-3">
      ${getInputs(this.props)}
      <div class="row">
        <div class="col text-center">
          <button type="submit" class="btn btn-success m-3">
            Add ${Common.properCase(this.api)}
          </button>
        </div>
      </div>
      </form>
    `
  }

  getImageUrl(url) {
    return url === '' ?
      '' :
      `<div class="image card-img-top" style="background-image:url('${url}')"></div>`
  }

  getColumnTag() {
    return '<div class="col-6">'
  }

  getCardTag() {
    return '<div class="card mb-3">'
  }

  getHouseTitle() {
    let levels = this.props.levels
    let beds = this.props.bedrooms
    let baths = this.props.bathrooms
    let year = this.props.year

    // @ts-ignore
    let bed = beds > 1 ? beds += ' bedrooms' : beds += ' bedroom'
    // @ts-ignore
    let bath = baths > 1 ? baths += ' baths' : baths += ' bath'

    return `${year} - ${levels} story ${bed} ${bath}`
  }

  getCarTitle() {
    return `${this.props.year} - ${this.props.make} - ${this.props.model}`
  }

  getJobTitle() {

  }

  getButtonGroup() {
    let route = this.route
    let id    = this.props._id
    let bid   = this.bidMethod
    let del   = this.deleteMethod

    return `
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-info  " onclick="${route}${bid}('${id}',  1)">Bid +</button>
        <button type="button" class="btn btn-info  " onclick="${route}${bid}('${id}', -1)">Bid -</button>
        <button type="button" class="btn btn-danger" onclick="${route}${del}('${id}')">Remove</button>
      </div>
    `
  }

  getTitle() {
    switch (this.api) {
      case API.CARS:
        return this.getCarTitle()
      case API.HOUSES:
        return this.getHouseTitle()
      case API.JOBS:
        return this.getJobTitle()
    }
  }

  get Card() {
    return `
        ${this.getColumnTag()}
            ${this.getCardTag()}
                ${this.getImageUrl(this.props.imgUrl)}
                <div class="card-body">
                    <h5 class="title card-title">${this.getTitle()}</h5>
                    <div class="description card-text">${this.props.description}</div>
                    <p><sm>${Common.toDollars(this.props.price)}</sm></p>
                    ${this.getButtonGroup()}
                </div>
            </div>
        </div>
    `
  }
}

export class CarStruct {
  constructor(
    {
      _id = '',
      make = '',
      model = '',
      imgUrl = '',
      year = 0,
      price = 0,
      description = '',
      __v = 0
    } = { }
  ) {
    this._id = _id,
    this.make = make,
    this.model = model,
    this.imgUrl = imgUrl,
    this.year = year,
    this.price = price,
    this.description = description,
    this.__v = __v
  }
}


export class HouseStruct {
  constructor(
    {
      _id = '',
      bedrooms = 0,
      bathrooms = 0,
      imgUrl = '',
      levels = 0,
      year = 0,
      price = 0,
      description = '',
      __v = 0
    } = { }
  ) {
    this._id = _id,
    this.bedrooms = bedrooms,
    this.bathrooms = bathrooms,
    this.imgUrl = imgUrl,
    this.levels = levels,
    this.year = year,
    this.price = price,
    this.description = description,
    this.__v = __v
  }
}

export class JobStruct {
  constructor(
    {
      _id = '',
      company = '',
      jobTitle = '',
      hours = 0,
      rate = 0,
      description = '',
      __v = 0
    } = { }
  ) {
    this._id =_id,
    this.company =company,
    this.jobTitle =jobTitle,
    this.hours =hours,
    this.rate =rate,
    this.description =description,
    this.__v =__v
  }
}

export const Common = {
  properCase: function (str) {
    return str.split(/(?=[A-Z])/).map(word => {
      return word.charAt(0).toUpperCase() + word.substring(1)
    }).join(' ')
  },

  /**
   * 
   * @param {number} amount A dollar amount
   */
  toDollars: function (amount) {
    return '$' + this.toFloat(amount).toFixed(2)
  },

  toFloat: function (numStr, precision) {
    let parts = (numStr * 1.00).toString().split('.')
    let whole = parts[0]
    let change = parts.length == 1 ? 0 : parts[1].substr(0, precision + 5)

    let unrounded = Number.parseFloat(whole + '.' + change)

    // Thanks MDN
    let y = +unrounded + (precision === undefined ? 0.5 : precision / 2)
    unrounded = y - (y % (precision === undefined ? 1 : +precision))

    return unrounded * 1.00
  }
}


class Job{
  constructor({ 
    _id = "", 
    company,
    jobTitle,
    hours
  }) {
    this._id = _id
  }
}

class XX {
  constructor({ name = "", id = "" }) {
    this.name = name
    this.id = id
  }
}


class XXY {
  constructor({ name = "", id = "" } = {}) {
    this.name = name
    this.id = id
  }
}