import {Component} from 'react'
import Loader from 'react-loader-spinner'

import MainHeading from '../MainHeading/index'

import Items from '../ItemDetails'

import Header from '../Header'

import './index.css'

class Home extends Component {
  state = {apiData: '', showHeading: false, activeId: ''}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const respose = await fetch(
      'https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099',
    )
    const data = await respose.json()
    // console.log(data)
    this.setState({
      apiData: data[0],
      showHeading: true,
      activeId: data[0].table_menu_list[0].menu_category_id,
    })
  }

  changeMain = id => {
    console.log(id)
    this.setState({activeId: id})
  }

  render() {
    const {apiData, showHeading, activeId} = this.state
    console.log(apiData)
    const filterDetails =
      showHeading &&
      apiData.table_menu_list.filter(each => each.menu_category_id === activeId)
    console.log(activeId, filterDetails)
    return showHeading ? (
      <div>
        <Header />
        <hr />
        <div className="category-container">
          <ul className="ul category-wrapper">
            {apiData.table_menu_list.map(each => (
              <MainHeading
                key={each.menu_category_id}
                list={each}
                changeMain={this.changeMain}
                activeId={activeId}
              />
            ))}
          </ul>
        </div>
        <ul>
          {filterDetails[0].category_dishes.map(each => (
            <Items key={each.dish_id} list={each} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="loader">
        <Loader type="spinner" color="blue" height="50" width="50" />
      </div>
    )
  }
}

export default Home
