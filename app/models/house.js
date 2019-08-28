import { API, CarStruct, HouseStruct, JobStruct, Common, MVCSO, Catagory } from '../constants/constants.js'

export default class House extends Catagory {
  /**
   * 
   * @param {HouseStruct} house 
   */
  constructor(house) {
    super(API.HOUSES)
    this.props = house

    this.addMethod = MVCSO.HOUSE_METHODS.ADD
    this.deleteMethod = MVCSO.HOUSE_METHODS.DELETE
    this.bidMethod = MVCSO.HOUSE_METHODS.BID
  }
}