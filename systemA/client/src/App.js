import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as statActions from "./actions/statAction";
import ResultSection from "./components/ResultSection";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { csv: "" };
    this.inpVal = React.createRef();
    this.spChar=/[!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?]+/;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCalcStats = this.handleCalcStats.bind(this);
    this.handleGenRand = this.handleGenRand.bind(this);
  }
  handleInputChange(e) {
    this.setState({ csv: e.target.value });
    if(Object.keys(this.props.stats).length>0)
    {
      this.props.setData("stats",{});
    }
    if(this.props.msg!="")
    {
      this.props.setData("msg","");
    }
  }
  handleGenRand(){
    this.props.genRand({ts:Date.now()})
    .then(res=>{
      this.inpVal.current.value=res.data.join();
      this.setState({csv:res.data.join()});
    }).catch(err=>{
      this.inpVal.current.value="";
      this.setState({csv:""});
    })
  }
  handleCalcStats() {
    let entry = this.state.csv.split(",").map(c => {
      return this.spChar.test(c) ? "sp" : (isNaN(parseFloat(c)) ? c : parseFloat(c));
    });
    const params = {
      payload: { entry },
      ts: Date.now()
    };
    this.props.calcStats(params);
  }
  render() {
    return (
      <div className="container">
        <br />
        <div className="row">
          <div className="col-md-2">
            <h2>Enter List</h2>
            <h6>Enter comma seperated list of numbers</h6>
          </div>
          <div className="col-md-6">
            {" "}
            <input
              type="text"
              className="form-control"
              onChange={this.handleInputChange}
              ref={this.inpVal}
            />
            <br />
            <div className="row">
              <button type="button" className="btn btn-light" onClick={this.handleGenRand}>
                Generate Random Numbers
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleCalcStats}
              >
                Calculate Statistics
              </button>
            </div>
          </div>
        </div><br/>
        {this.props.msg ? (
          <div className="alert alert-danger" role="alert">
            {this.props.msg}
          </div>
        ) : null}
        <hr />
        <ResultSection origData={this.state.csv} stats={this.props.stats}/>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return state.statistics;
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...statActions
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
