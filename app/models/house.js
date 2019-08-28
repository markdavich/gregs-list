import { API, CarStruct, HouseStruct, JobStruct, Common, MVCSO, Catagory } from '../constants/constants.js'

export default class House extends Catagory {
  /**
   * 
   * @param {HouseStruct} house 
   */
  constructor(house) {
    super()
    this.props = house

    this.addMethod = MVCSO.HOUSE_METHODS.ADD
    this.deleteMethod = MVCSO.HOUSE_METHODS.DELETE
    this.bidMethod = MVCSO.HOUSE_METHODS.BID
  }

  get Card() {
    return `
        ${this.getColumnTag()}
            ${this.getCardTag()}
                ${this.getImageUrl(this.props.imgUrl)}
                <div class="card-body">
                    <h5 class="title card-title">
                      ${this.getHouseTitle()}
                    </h5>
                    <div class="description card-text">${this.props.description}</div>
                    <p><sm>${Common.toDollars(this.props.price)}</sm></p>
                    ${this.getButtonGroup()}
                </div >
            </div >
        </div >
    `
  }
}