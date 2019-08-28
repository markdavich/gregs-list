import { API, CarStruct, HouseStruct, JobStruct, Common, MVCSO, Catagory } from '../constants/constants.js'

export default class Job extends Catagory {
  /**
   * 
   * @param {JobStruct} job 
   */
  constructor(job) {
    super(API.JOBS)
    this.props = job

    this.addMethod = MVCSO.JOB_METHODS.ADD
    this.deleteMethod = MVCSO.JOB_METHODS.DELETE
    this.bidMethod = MVCSO.JOB_METHODS.BID
  }
}