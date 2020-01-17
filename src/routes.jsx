import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { renderApp } from './components/App/App'
import TopBarContainer from './components/TopBar/TopBarContainer'
import GroupsToolBar from './components/TopBar/GroupsToolBar'
import SingleGroupToolbar from './components/TopBar/SingleGroupToolBar'
import { HelpToolBar, NewGroupToolBar } from './components/TopBar/GeneralToolBar'

import { ACCOUNTS_APP_LOGIN_URL } from './config/constants'



import GroupsList from './groups/GroupsList'
import GroupDetail from './groups/detail/GroupDetail'
import HelpContainer from './help/HelpContainer'
import NewGroupFormContainer from './groups/detail/NewGroupContainer'
import { validateLogin } from './actions/loadUser'

const topBarWithGroupsToolBar = <TopBarContainer toolbar={ GroupsToolBar } />
const topBarWithSingleGroupToolBar = <TopBarContainer toolbar={ SingleGroupToolbar} />

const newGroupToolBar = <TopBarContainer toolbar={NewGroupToolBar} />
const helpToolBar = <TopBarContainer toolbar={HelpToolBar} />


class Routes extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
    this.redirectToLoginPage = this.redirectToLoginPage.bind(this)
  }

  componentWillMount() {
    this.props.validateLogin()
  }

  redirectToLoginPage() {
    console.log('redirecting to login.')
    window.location = ACCOUNTS_APP_LOGIN_URL
  }

  checkAuth() {

    /*
    getFreshToken().then((res) => {
      console.log('***JSON.stringify(res)-->' + JSON.stringify(res))
      console.log('Fresh Token Success')
      //this.setState({isLoggedIn: true})
      this.props.loadUser()
    }).catch((error) => {
      console.log(error)
      // we have to to redirect to the same page, so we use the whole URL
      const redirectBackToUrl = encodeURIComponent(window.location.href)
      const newLocation = ACCOUNTS_APP_LOGIN_URL + '?retUrl=' + redirectBackToUrl
      console.log('redirecting... ', newLocation)
      console.log(newLocation)

      window.location = newLocation
    })*/
    this.props.validateLogin().then(res => {
      console.log(res)
    })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    //const HelpContainerWithAuth = requiresAuthentication(HelpContainer)
    const { user, isLoggedIn, isLoginFailed } = this.props.loadUser

    //If the user is not logged in and there is no failure
    if (!isLoggedIn && isLoginFailed === false) {
      return (<div>Validating Login...</div>)
    }
    if (isLoginFailed) {
      this.redirectToLoginPage()
      return null
    }
    //If validation successful
    if (user) {
      return (
        <Switch>
          <Route exact path="/" render={renderApp(topBarWithGroupsToolBar, <GroupsList />)} />
          <Route path="/groups/new" render={renderApp(newGroupToolBar, <NewGroupFormContainer />)} />
          <Route path="/groups/:groupId" render={renderApp(topBarWithSingleGroupToolBar, <GroupDetail />)} />
          <Route path="/groups" render={renderApp(topBarWithGroupsToolBar, <GroupsList />)} />
          <Route path="/help" render={renderApp(helpToolBar, <HelpContainer />)} />
        </Switch>
      )
    }
  }
}

const mapStateToProps = ({loadUser}) => {
  return {
    loadUser
  }
}
  
  
const mapDispatchToProps = {
  validateLogin
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes))
