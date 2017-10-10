import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import * as todoUsers from '../actions/usersActions';
import * as todoAirplane from '../actions/airplaneActions';
import { connect } from 'react-redux';

import sass from '../../public/css/admin.scss';

import Menu from '../components/menu';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: 'none'
        }
    }

    componentDidMount() {
        // this.props.actions.todoAirplane.cek()
    }

    render() {
        return (
            <div>
                <Menu />

                <div className="content">
                    <button onClick={() => this.setState({ modal: 'block' })} style={{ width: 'auto' }} >Sign Up</button>

                    <div id="id01" style={{ display: this.state.modal }} className="modal">
                        <span onClick={() => this.setState({ modal: 'none' })} className="close" title="Close Modal">×</span>
                        <form className="modal-content animate" >
                            <div className="container">
                                <label><b>Email</b></label>
                                <input type="text" placeholder="Enter Email" name="email" required />

                                <label><b>Password</b></label>
                                <input type="password" placeholder="Enter Password" name="psw" required />

                                <label><b>Repeat Password</b></label>
                                <input type="password" placeholder="Repeat Password" name="psw-repeat" required />
                                <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

                                <div className="clearfix">

                                    <button type="submit" className="button">Submit</button>
                                    <button onClick={() => this.setState({ modal: 'none' })} className="button button3">Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>



                    <h2>Responsive Sidenav Example</h2>
                    <p>This example use media queries to transform the sidenav to a top navigation bar when the screen size is 900px or less.</p>
                    <p>We have also added a media query for screens that are 400px or less, which will vertically stack and center the navigation links.</p>
                    <p>You will learn more about media queries and responsive web design later in our CSS Tutorial.</p>
                    <h3>Resize the browser window to see the effect.</h3>

                    <h2>Responsive Image Gallery</h2>
                    <h4>Resize the browser window to see the effect.</h4>

                    <div className="responsive">

                        <button className="button">Green</button>
                        <button className="button button2">Blue</button>
                        <button className="button button3">Red</button>
                        <button className="button button4">Gray</button>
                        <button className="button button5">Black</button>
                    </div>
                    <div className="responsive">

                        <form >
                            <label htmlFor="fname"  >First Name</label>
                            <input type="text" id="fname" name="firstname" placeholder="Your name.." />

                            <label htmlFor="lname">Last Name</label>
                            <input type="text" id="lname" name="lastname" placeholder="Your last name.." />

                            <label htmlFor="country">Country</label>
                            <select id="country" name="country">
                                <option value="australia">Australia</option>
                                <option value="canada">Canada</option>
                                <option value="usa">USA</option>
                            </select>

                            <input type="submit" value="Submit" />
                        </form>
                    </div>


                    <div className="responsive">

                        <table>
                            <thead>
                                <tr>
                                    <th>Firstname</th>
                                    <th>Lastname</th>
                                    <th>Savings</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Peter</td>
                                    <td>Griffin</td>
                                    <td>$100</td>
                                </tr>
                                <tr>
                                    <td>Lois</td>
                                    <td>Griffin</td>
                                    <td>$150</td>
                                </tr>
                                <tr>
                                    <td>Joe</td>
                                    <td>Swanson</td>
                                    <td>$300</td>
                                </tr>
                                <tr>
                                    <td>Cleveland</td>
                                    <td>Brown</td>
                                    <td>$250</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="responsive">
                        <div className="gallery">
                            <a target="_blank" >
                                {/* <img src="img_lights.jpg" alt="Northern Lights" width="600" height="400" /> */}
                            </a>
                            <div className="desc">Add a description of the image here</div>
                        </div>
                    </div>

                    <div className="responsive">

                        <div className="clearfix">
                            {/* <img className="img2" src="pineapple.jpg" alt="Pineapple" width="170" height="170" /> */}
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum...</div>
                    </div>

                    <div className="clearfix"></div>

                    <div style={{ padding: '6px' }}>
                        <p>This example use media queries to re-arrange the images on different screen sizes: for screens larger than 700px wide, it will show four images side by side, for screens smaller than 700px, it will show two images side by side. For screens smaller than 500px, the images will stack vertically (100%).</p>
                        <p>You will learn more about media queries and responsive web design later in our CSS Tutorial.</p>
                    </div>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state: {
            users: state.users,
            airplane: state.airplane
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            todoUsers: bindActionCreators(todoUsers, dispatch),
            todoAirplane: bindActionCreators(todoAirplane, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);