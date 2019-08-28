import { API, CarStruct, HouseStruct, JobStruct, Common, MVCSO, Catagory } from '../constants/constants.js'

export default class Car extends Catagory {
  /**
   * 
   * @param {CarStruct} car 
   */
  constructor(car) {
    super(API.CARS)
    this.props = car

    this.addMethod = MVCSO.CAR_METHODS.ADD
    this.deleteMethod = MVCSO.CAR_METHODS.DELETE
    this.bidMethod = MVCSO.CAR_METHODS.BID
  }
}