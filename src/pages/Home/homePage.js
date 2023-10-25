import React, { Component, useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import NavBar from '../../components/NavBar';
import LeftBar from '../../components/LeftBar';
import PropTypes from 'prop-types';
import Home from './Home/Home';
import Chat from './Chat/chat';
import Social from './Social/Social';
import Calculator from './Calculator/Calculator';
import Education from './Education/Education';
import AIdf from './AIDF/AIdf';
import Ca from './CA/Ca';
import CompanyUFB from './CompanyUFB/CompanyUFB';
import RankingList from './RankingList/RankingList';
class homePage extends Component {

  render() {
    // 主页内容
    return (
      <div className="row">
      <NavBar />
        <div className='col-md-3'>
        <LeftBar />
        </div>
        <div className='col-md-6'>
          <Switch>
            <Route path="/home/Home" component={Home}></Route>
            <Route path="/home/chat" component={Chat}></Route>
            <Route path="/home/social" component={Social}></Route>
            <Route path="/home/calculator" component={Calculator}></Route>
            <Route path="/home/education" component={Education}></Route>

            <Route path="/home/AIDemandForecast" component={AIdf}></Route>
            <Route path="/home/consumptionAnalysis" component={Ca}></Route>
            <Route path="/home/uereFeedback" component={CompanyUFB}></Route>
            <Route path="/home/rankinglist" component={RankingList}></Route>
            <Redirect from="/home" to="/home/Home"></Redirect>
          </Switch>
        </div>
        <div className='col-md-3'></div>
      </div>
    );
  }
}

export default homePage;