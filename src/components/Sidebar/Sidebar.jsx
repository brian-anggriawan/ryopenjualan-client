import React from "react";
import { NavLink } from "react-router-dom";
import { Nav , Dropdown , DropdownItem , DropdownToggle , DropdownMenu , Collapse , Button , Card , CardBody } from "reactstrap";
import PerfectScrollbar from "perfect-scrollbar";

import logo from "Ryo.jpg";

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      collapse: false
    }
    this.activeRoute.bind(this);
    this.toggle = this.toggle.bind(this)

  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
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
          >
            <div className="logo-img">
              <img src={logo} alt="react-logo" />
            </div>
          </a>
          <a
            href="https://www.ryopercetakan.com/"
            className="simple-text logo-normal"
            target="_blank"
          >
            Ryo Percetakan
          </a>
        </div>
        <div className="sidebar-wrapper" ref="sidebar">
          <Nav>
            {this.props.routes.map((prop, key) => {
              if (prop.redirect) return null;
              return (
                <li
                  className={
                    this.activeRoute(prop.layout + prop.path) +
                    (prop.pro ? " active active-pro" : "")
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={"now-ui-icons " + prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            })}

           
                <NavLink
                    className="nav-link"
                    activeClassName="active"
                    onClick={this.toggle}
                  >
                    <i className={"now-ui-icons design_app"} />
                    <p className='text-light'>Brian</p>
                  </NavLink>
                <Collapse isOpen={this.state.collapse} className='ml-5 text-light'>
                <NavLink
                    className="nav-link"
                    activeClassName="active ml-5 text-light"
                    to='/admin/dashboard'
                    
                  >
                    <i className={"now-ui-icons design_app"} />
                    <p>1</p>
                  </NavLink>
                  <NavLink
                    className="nav-link ml-5 text-light"
                    activeClassName="active"
                    to='/admin/test'
                    
                  >
                    <i className={"now-ui-icons design_app"} />
                    <p>2</p>
                  </NavLink>
                  
                </Collapse>
              <Dropdown  nav
                isOpen={this.state.dropdownOpen}
                toggle={e => this.dropdownToggle(e)}>
                <DropdownToggle caret nav>
                <i className={"now-ui-icons design_app"} />
                 haloo
                </DropdownToggle>
                <DropdownMenu  right>
                  <DropdownItem tag="a">My Profile jhjgjgjgjgjs</DropdownItem>
                  <DropdownItem tag="a">Logout</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
