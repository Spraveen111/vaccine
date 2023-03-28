// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

import VaccinationCoverage from '../VaccinationCoverage'

import VaccinationByAge from '../VaccinationByAge'

import VaccinationByGender from '../VaccinationByGender'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class CowinDashboard extends Component {
  state = {apiStatus: apiStatusConstants.initial, vaccinationData: {}}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(vaccinationDataApiUrl)
    console.log(response.ok)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updateData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(eachOne => ({
          vaccineData: eachOne.vaccine_date,
          dose1: eachOne.dose_1,
          dose2: eachOne.dose_2,
        })),
        vaccinationByAge: data.vaccination_by_age.map(type => ({
          age: type.age,
          count: type.count,
        })),
        vaccinationByGender: data.vaccination_by_gender.map(allOne => ({
          count: allOne.count,
          gender: allOne.gender,
        })),
      }
      this.setState({
        vaccinationData: updateData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  successView = () => {
    const {vaccinationData} = this.state
    console.log(vaccinationData.last7DaysVaccination)
    return (
      <>
        <VaccinationCoverage details={vaccinationData.last7DaysVaccination} />
        <VaccinationByGender
          detailsGender={vaccinationData.vaccinationByGender}
        />
        <VaccinationByAge vaccineDetails={vaccinationData.vaccinationByAge} />
      </>
    )
  }

  failureView = () => (
    <div className="failure-view">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-text">Something went wrong</h1>
    </div>
  )

  allInProgress = () => (
    <div className="loading-view" data-testid="loader">
      <Loader color="#ffffff" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderAll = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()

      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.inProgress:
        return this.allInProgress()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="container">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="website"
          />
          <h1>Co-WIN</h1>
        </div>
        <h1>CoWIN Vaccination In India</h1>
        {this.renderAll()}
      </div>
    )
  }
}

export default CowinDashboard
