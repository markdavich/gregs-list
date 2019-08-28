import { API, CarStruct, HouseStruct, JobStruct, Common, MVCSO, Catagory } from '../constants/constants.js'

export default class Job extends Catagory {
  /**
   * 
   * @param {JobStruct} job 
   */
  constructor(job) {
    super()
    this.props = job

    this.addMethod = MVCSO.JOB_METHODS.ADD
    this.deleteMethod = MVCSO.JOB_METHODS.DELETE
    this.bidMethod = MVCSO.JOB_METHODS.BID
  }

  getTitle() {


    return `${year} - ${levels} story ${bed} bed ${bath}`
  }

  get Card() {
    return `
        <div class="col-3">
            <div class="card">
                <img class="card-img-top" src="${this.props.imgUrl}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${this.props.jobTitle}</h5>
                    <p class="card-text">${this.props.description}</p>
                    <p><sm>${Common.toDollars(this.props.price)}</sm></p>
                    ${this.getButtonGroup()}
                </div >
            </div >
        </div >
    `
  }
}