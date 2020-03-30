import React, { Component } from "react";
import { connect } from "react-redux";
import { createAdvert } from "../../actions/advert";
import AdvertForm from "./AdvertForm";

const initialState = {
  description: "",
  isForSale: false,
  isForRent: false,
  price: 0,
  address: "",
  city: "",
  postcode: "",
  sqrMeter: 0,
  cubicMeter: 0,
  nrOfRooms: 0,
  nrOfBathrooms: 0,
  nrOfFloors: 0,
  locatedOnFloor: 0,
  advertStatus: "published",
  monthlyContribution: 0,
  constructionYear: 2010,
  renovationYear: 2010,
  energyLabel: "",
  heating: "",
  warmWater: "",
  storage: "",
  parking: "",
  showAddForm: false
};

class AddNewAdvert extends Component {
  state = initialState;

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitNewAdvert = e => {
    e.preventDefault();
    this.props.createAdvert(this.state);
    this.setState(initialState);
  };

  forRentForSale = action => {
    if (action === "sale") {
      this.setState({
        ...this.state,
        isForSale: true,
        isForRent: false
      });
    }
    if (action === "rent") {
      this.setState({
        ...this.state,
        isForSale: false,
        isForRent: true
      });
    }
  };

  showAdvertForm = () => {
    this.setState({
      showAddForm: !this.state.showAddForm
    });
  };

  render() {
    return (
      <div className="card">
        {this.state.showAddForm ? (
          <div className="card-body">
            <button
              className="btn btn-md brn btn-warning"
              type="button"
              onClick={this.showAdvertForm}
            >
              Hide Advert Form
            </button>
            <hr />
            <h4>Add New advertisement</h4>
            <AdvertForm
              submitNewAdvert={this.submitNewAdvert}
              handleChange={this.handleChange}
              formValues={this.state}
              forRentForSale={this.forRentForSale}
            />
          </div>
        ) : (
          <div className="col-4 my-3">
            <button
              className="btn btn-sm btn-info"
              type="button"
              onClick={this.showAdvertForm}
            >
              Add New Advert
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createAdvert })(AddNewAdvert);
