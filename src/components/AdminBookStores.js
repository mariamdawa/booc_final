import React, { Component } from 'react';
import axios from 'axios';
import ImageUploader from 'react-images-upload';
const cities= ["Cairo","Alexandria","Giza","Port Said","Suez","Luxor","al-Mansura","Damanhur","6th of October City","Kafr el-Dawwar"]
class AddStory extends Component {
    constructor(props) {

        super(props);
        this.state = {
            errors: {},
            //Fatma
            StoreTitle: "",
            BookStoreCover: "",
            StorePhone:"",
            StoreAddress:"",
            StoreCity:"",
            StoreStreet:"",
            //admin Registeration
            AdminEmail:"",
            AdminPassword:"",
            ReAdminPassword:"",

        }
        this.inputReference = React.createRef();
        let activeError = false;
    }
    
    /******************* add cover for Store ********************/
    handleStoreCover = (e) => {
        const file = URL.createObjectURL(e.target.files[0]);
        this.setState({ BookStoreCover: file });
    }
    // Action of cover uploaded 
    fileUploadAction = () => this.inputReference.current.click();
    /******************* End add cover for Store ********************/
    
    /******************* Change value of Radio button belong to type of store*****************************/
    onValueChange= (event) => {
        this.setState({
          selectedOption: event.target.value
        });
    } 
    /******************* End Change value of Radio button belong to type of store*****************************/
    
    clearDataAfterSumbit = () =>{
        this.setState({
            StoreTitle: "",
            BookStoreCover: "",
            StorePhone:"",
            StoreAddress:"",
            StoreCity:"",
            StoreStreet:"",
          });
    }

    handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData(e.target);
        const errors = this.validate();

        if (errors === null) {
            const obj = {
                ///Store///
                StoreTitle: this.state.StoreTitle,
                StorePhone: this.state.StorePhone,
                StoreAddress: this.state.StoreAddress,
                StoreCity: this.state.StoreCity,
                StoreStreet: this.state.StoreStreet,
                selectedOption: this.state.selectedValue,
                //Admin///
                AdminEmail: this.state.selectedValue,
                AdminPassword: this.state.AdminPassword,
                ReAdminPassword: this.state.ReAdminPassword,
            }
            console.log(obj);
            Object.keys(obj).forEach((key, value) => {
                return data.append(key, this.state[key])
            })
            
            console.log("submit");
            const res = await axios.post("http://localhost:3000/admin/BookStores",data, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT",
                    "Access-Control-Allow-Headers": "Content-Type",
                }
            });
            console.log(res);
            //window.location.reload();
           
        }
        else {
           console.log('no submit');
           this.activeError = true;
        }

    }

    validate = () => {
        const errors = {};
        //console.log(this.state.StoreTitle, this.state.shortStoryGenre)
        if (this.state.StoreTitle.trim() === "")
            errors.name = "Please enter Store name."
        if (this.state.StorePhone.trim() === "")
            errors.phone = "Please enter Store phone."
        if (this.state.StoreAddress.trim() === "")
           errors.address = "Please enter Store address"
        if (this.state.StoreCity.trim() === "")
           errors.city = "Please enter Store city"
        if (this.state.StoreStreet.trim() === "")
            errors.street= "Please enter Store street"
        //if (this.state.selectedValue  !== "Libraries" || this.state.selectedValue  !== "Bookstores")
        //   errors.kind= "Please select type of store"

        // Admin Section 
        if (this.state.AdminEmail.trim() === "")
            errors.email= "Please enter Admin store name"
        if (this.state.AdminPassword.trim() === "")
            errors.password= "Please enter password of admin "
        if (this.state.ReAdminPassword.trim() === "")
            errors.repassword= "Please Confirm password of admin "
        
        this.setState({ errors });
        return Object.keys(errors).length === 0 ? null : errors;
    }

   
    
    render() {
        return (
            <React.Fragment>
                <form className='my-2 mx-5 p-5 row' style={{ width: '100%' }} onSubmit={this.handleSubmit} enctype="multipart/form-data">
                    {/************************* Cover of Store****************************** */}
                    {this.state.BookStoreCover && <img className='col-lg-3 col-sm-6 col-xs-12' style={{ width: '100%' }} src={this.state.BookStoreCover} alt="image of store" />}
                    {/* if there is no cover for store */}
                    {!this.state.BookStoreCover &&
                        <div className='col-lg-3 col-md-4 col-xs-12 ' style={{ width: '100%', backgroundColor: '#ADB4C3'}}>
                                {/* save uploaded Cover to our state */}
                            <input className='col-lg-1 col-md-2  col-sm-4 align-self-center' type="file" hidden ref={this.inputReference}
                                onChange={this.handleStoreCover} />
                                {/* Cover Upload Action */}
                            <div className="btn mx-5 center" style={{ textAlign: 'center', borderColor: '#F8A488', borderWidth: '3px', marginTop: '70%', backgroundColor: '#ADB4C3', display: 'block', position: 'relative' }} onClick={this.fileUploadAction}>
                                <i className="fa fa-image" style={{ float: 'center' }}> Upload Cover</i>
                            </div>
                        </div>
                    }
                    {/************************* End of Cover of Store****************************** */}

                    <div className='col col-1'></div>
                    <div className='col col-7 col-lg-7 col-md-9 col-sm-11 col-xs-11'>
                        <label className="formLabel heading" style={{ display: 'block' }}><h3><strong>Information About Store</strong></h3></label><hr style={{borderColor: '#F8A488',}}/>
                        {/* Name of Your Store */}
                        <label className="formLabel heading" style={{ display: 'block' }} htmlFor='StoreTitle'><h5><strong>Store Name</strong></h5></label>
                        <input type="text"  style={{ borderRadius: '4px' }} className="form-control" placeholder=" your store's name.." aria-label=" your store's name.." aria-describedby="basic-addon1" id='StoreTitle' value={this.state.StoreTitle}
                            onChange={(e) => this.setState({StoreTitle: e.currentTarget.value })}></input>
                        {/*Show Error If Exit related to Name Of Store */}
                        {this.state.errors.name && (<div className="alert alert-danger" role="alert">{this.state.errors.name}</div>)}

                        {/* Phone */}
                        <br/>
                        <label className="formLabel heading" style={{ display: 'block' }} htmlFor='StorePhone'><h5><strong>Phone</strong></h5></label>
                        <input type="text"   pattern="[0-9]*" style={{ borderRadius: '4px' }} className="form-control" placeholder=" your store's phone.." aria-label=" your store's phone.." aria-describedby="basic-addon1" id='StorePhone' value={this.state.StorePhone}
                            onChange={(e) => this.setState({StorePhone: e.currentTarget.value })}></input>
                        {/* Show Error If Exit related to Phone Of Store */}
                        {this.state.errors.phone && (<div className="alert alert-danger" role="alert">{this.state.errors.phone}</div>)}
                {/************************************************************************************************/}
                        {/* Address Of Store  */}
                        <br/>
                        <label className="formLabel heading" style={{ display: 'block' }} htmlFor='StoreAdress'><h5><strong>Address</strong></h5></label>
                        <input type="text"  style={{ borderRadius: '4px' }} className="form-control" placeholder=" your store's phone.." aria-label=" your store's name.." aria-describedby="basic-addon1" id='StoreAddress' value={this.state.StoreAddress}
                            onChange={(e) => this.setState({StoreAddress: e.currentTarget.value })}></input>
                        {/* Show Error If Exit related to Phone Of Store */}
                        {this.state.errors.address && (<div className="alert alert-danger" role="alert">{this.state.errors.address}</div>)}

                        <br/>
                        <div class="form-row">

                            <div class="form-group col-md-6">
                                <label className="formLabel heading" style={{ display: 'block' }} htmlFor='city'><h5><strong>City</strong></h5></label>
                                <div className="form-outline">
                                    <select className="custom-select" id="inputGroupSelect03" value={this.state.StoreCity}
                                        onChange={(e) => this.setState({StoreCity: e.currentTarget.value })}>
                                        <option>pick a city </option>
                                        {cities.map(str => {return(<option value={str}>{str}</option>)})} 
                                    </select> 
                                    {this.state.errors.city && (<div className="alert alert-danger" role="alert">{this.state.errors.city}</div>)}
                                </div>
                            </div>

                            {/* street */}
                            <div class="form-group col-md-6">
                                <label className="formLabel heading" style={{ display: 'block' }} htmlFor='street'><h5><strong>Street</strong></h5></label>
                                <input type="text" className="form-control" id="StoreStreet" placeholder="Street"  value={this.state.StoreStreet} onChange={(e) => this.setState({StoreStreet: e.currentTarget.value })} />
                                {this.state.errors.street && (<div className="alert alert-danger" role="alert">{this.state.errors.street}</div>)}
                            </div>
                        </div> 
                {/************************************************************************************************/}
                        {/* Type Of Store Radio Button  */}
                        <div  className="float-left">
                                <label className="formLabel heading" style={{ display: 'block' }} htmlFor='StoreAdress'><h5><strong>Type of Store</strong></h5></label>                     
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" className="custom-control-input" id="customRadio" name="example" style={{background : '#FEC7B5'}} value="Bookstores" checked={this.state.selectedOption === "Bookstores"}
                                    onChange={this.onValueChange}  />
                                    <label className="custom-control-label" htmlFor="customRadio">Bookstores</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" className="custom-control-input" id="customRadio2" name="example" value="Libraries" checked={this.state.selectedOption === "Libraries"}
                                    onChange={this.onValueChange}  />
                                    <label className="custom-control-label" htmlFor="customRadio2">Libraries</label>
                                </div>
                                {/* {this.state.errors.kind && (<div className="alert alert-danger" role="alert">{this.state.errors.kind}</div>)}       */}
                        </div><br/><br/>
                        
                {/*******************************************************************************************/}
                <br/><br/><br/><br/>
                {/************************* Store Admin *****************************/}
                <label className="formLabel heading" style={{ display: 'block' }}><h3><strong>Store Admin</strong></h3></label><hr style={{borderColor: '#F8A488',}}/>
                {/* Name of Your Admin Store */}
                <label className="formLabel heading" style={{ display: 'block' }} htmlFor='AdminEmail'><h5><strong>Store Name</strong></h5></label>
                <input type="text"  style={{ borderRadius: '4px' }} className="form-control" placeholder=" Admin's name.." aria-label=" Admin's name.." aria-describedby="basic-addon1" id='AdminEmail' value={this.state.AdminEmail}
                    onChange={(e) => this.setState({AdminEmail: e.currentTarget.value })}></input>
                {/*Show Error If Exit related to Name Of Admin Store */}
                {this.state.errors.email && (<div className="alert alert-danger" role="alert">{this.state.errors.email}</div>)}


                <br/>
                {/* password of  Admin Store */}
                <label className="formLabel heading" style={{ display: 'block' }} htmlFor='AdminEmail'><h5><strong>Password</strong></h5></label>
                <input type="text"  style={{ borderRadius: '4px' }} className="form-control" placeholder=" Admin's password.." aria-label=" Admin's password.." aria-describedby="basic-addon1" id='AdminPassword' value={this.state.AdminPassword}
                    onChange={(e) => this.setState({AdminPassword: e.currentTarget.value })}></input>
                {/*Show Error If Exit related to password */}
                {this.state.errors.password && (<div className="alert alert-danger" role="alert">{this.state.errors.password}</div>)}

                <br/>
                {/* repassword of  Admin Store */}
                <label className="formLabel heading" style={{ display: 'block' }} htmlFor='ReAdminPassword'><h5><strong>Confirm Password</strong></h5></label>
                <input type="text"  style={{ borderRadius: '4px' }} className="form-control" placeholder=" Confirm Password.." aria-label="Confirm Password.." aria-describedby="basic-addon1" id='ReAdminPassword' value={this.state.ReAdminPassword}
                    onChange={(e) => this.setState({ReAdminPassword: e.currentTarget.value })}></input>
                {/*Show Error If Exit related to confirm password */}
                {this.state.errors.repassword && (<div className="alert alert-danger" role="alert">{this.state.errors.repassword}</div>)}

                {/************************************************************************/}
                </div>
                    <div className="d-flex justify-content-end" style={{ width: '90%' }}>
                        <button className="py-2 px-5 m-3 btn btn-lg" style={{ backgroundColor: 'white', borderColor: '#F8A488' }}>cancel</button>
                        <button className="py-2 px-5  my-3 ml-3 btn btn-lg" style={{ backgroundColor: '#F8A488', borderColor: '#F8A488' }} type='submit'>start</button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}


export default AddStory;