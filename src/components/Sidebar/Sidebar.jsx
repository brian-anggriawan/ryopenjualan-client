import React from "react";
import { NavLink } from "react-router-dom";
import { Nav , Collapse } from "reactstrap";
import PerfectScrollbar from "perfect-scrollbar";

import logo from "Ryo.jpg";

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      setup: false,
      transaksi: false
    }
    this.activeRoute.bind(this);
    this.setup = this.setup.bind(this);
    this.transaksi = this.transaksi.bind(this)

  }

  setup() {
    this.setState({ setup: !this.state.setup , transaksi: false });
  }

  transaksi() {
    this.setState({ transaksi: !this.state.transaksi , setup: false });
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }

  dropdownToggle = e => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };
 
  render() {
    return (
      <div className="sidebar" data-color={this.props.backgroundColor}>
        <div className="logo">
          <a
            href="https://www.ryopercetakan.com/"
            className="simple-text logo-mini"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="logo-img">
              <img src={logo} alt="react-logo" />
            </div>
          </a>
          <a
            href="https://www.ryopercetakan.com/"
            className="simple-text logo-normal"
            rel="noopener noreferrer"
            target="_blank"
          >
            Ryo Percetakan
          </a>
        </div>
        <div className="sidebar-wrapper" ref="sidebar">
          <Nav>
            <li className='active'>
                <NavLink
                    className="nav-link"
                    activeClassName="text-dark"
                  >
                    <i className={"now-ui-icons design_app"} />
                    <p>Dashboard</p>
                  
                </NavLink>
            </li>
            <li className='active'>
                <NavLink
                    className="nav-link"
                    activeClassName="text-dark"
                    onClick={this.setup}
                  >
                    <i className={"now-ui-icons design_app"} />
                    <p>Setup</p>
                    <Collapse isOpen={this.state.setup} className='ml-4'>
                    <NavLink
                        className="nav-link text-dark"
                        to='/admin/test'          
                      >
                        <p>Anggota</p>
                      </NavLink>
                      <NavLink
                        className="nav-link text-dark"
                        to='/admin/dashboard'
                        
                      >
                        <p>Harga</p>
                      </NavLink>
                    </Collapse>
                </NavLink>
              </li>

              <li className='active'>
                <NavLink
                    className="nav-link"
                    activeClassName="text-dark"
                    onClick={this.transaksi}
                  >
                    <i className={"now-ui-icons design_app"} />
                    <p>Transaksi</p>
                    <Collapse isOpen={this.state.transaksi} className='ml-4'>
                    <NavLink
                        className="nav-link text-dark"
                        to='/admin/test'          
                      >
                        <p>Penjualan</p>
                      </NavLink>
                      <NavLink
                        className="nav-link text-dark"
                        to='/admin/dashboard'
                        
                      >
                        <p>Pembelian</p>
                      </NavLink>
                    </Collapse>
                </NavLink>
              </li>
              <li className='active'>
                <NavLink
                    className="nav-link"
                    activeClassName="text-dark"
                  >
                    <i className={"now-ui-icons design_app"} />
                    <p>Report</p>
                </NavLink>
            </li>
            <li className='active'>
                <NavLink
                    className="nav-link"
                    activeClassName="text-dark"
                  >
                    <i className={"now-ui-icons design_app"} />
                    <p>Config</p>
                  
                </NavLink>
            </li>
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
