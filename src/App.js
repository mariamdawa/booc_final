import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Map from './components/Map';
import Community from './components/Community';
import Writer from './components/Writer';
import Admin from './components/Admin';
import MyStories from './components/MyStories';
import AddStory from './components/AddStory';
import SearchResults from './components/SearchResults';
import UserProfile from './components/UserProfile';
import BookDetails from './components/BookDetails';
import Genre from './components/Genre';
import BookStoreBooks from './components/BookStoreBooks';
import AddBook from './components/AddBook';

import WriterStories from './components/WriterStories';
import NotificationsPage from './components/NotificationsPage';

import AdminBookStores from './components/AdminBookStores';


import GoogleAPI from './classes/GoogleAPI';
import FavoritesPage from "./components/FavoritesPage";
import BookShelf from "./components/BookShelf";
import DownloadsPage from "./components/DownloadsPage";
import UserPage from "./components/UserPage";
import Favr from "./components/Favr";
import ShortStoryDetails from './components/ShortStoryDetails';
import BookRowSlide from './components/BookRowSlide';
import FreeBook from './components/FreeBook';
import ReactDOM from 'react-dom';
import { ActionCableProvider, ActionCableConsumer } from 'react-actioncable-provider';
import Registration from './components/auth/Registration';
import Login from './components/auth/Login'
import axios from 'axios';
import NotFound from './components/NotFound';
import React, { Component } from 'react';
import { PRODUCTION_BACKEND_URL, PRODUCTION_FRONTEND_URL} from './constants';




import {
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { isConstructorDeclaration } from 'typescript';
import AllStories from './components/AllStories';



// const api=new GoogleAPI();
// api.getByAuthor("conan doyle").then(res=>{
//   console.log(res)
// })
// api.getByCategory("fiction").then(res=>{
//     console.log(res)
// })

// api.getFilteredBooks({
//   'inauthor':'conan',
//   'subject':'foction',
//   'filter':'free-ebooks'
// }).then(res=>{
//   console.log(res)
// })

// /<<<<<<< HEAD
// function App() {

//   return (
//     <div>
//       <Header></Header>

//       <div style={{ minHeight: 400 }}>
//         <Switch>
//           <Route path="/" exact component={Home} />
//           <Route path="/genre/:id" exact component={Genre} />
//           <Route path="/map" component={Map} />
//           <Route path="/writer" component={Writer} />
//           <Route path="/community" component={Community} />
//           <Route path="/mystories" component={MyStories} />
//           <Route path="/addstory" component={AddStory} />
//           <Route path="/bookdetails/:isbn" render={(props) => <BookDetails {...props} />} />
//           <Route path="/userprofile" component={UserProfile} />
//           <Route path="/admin" component={Admin} />
// =======
class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},

      avatar: "",
      bookstore_id:""

    }
    this.handleLogin = this.handleLogin.bind(this);
    this.is_logged_in = this.is_logged_in.bind(this);
    // this.handleRedirect=this.handleRedirect.bind(this);
    // this.handleLogout=this.handleLogout.bind(this);
  }
  is_logged_in(user_id) {
    axios.post(`${PRODUCTION_BACKEND_URL}:3000/logged_in`,
      {
        member: {
          id: user_id
        }
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      }
      // {headers:
      //    {
      //    "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Methods": "GET, POST, PUT",
      //   "Access-Control-Allow-Headers": "Content-Type",
      // "Access-Control-Allow-Credentials":"true"}},
      // {withCredentials:true}
    )
      .then(response => {
        if (Object.keys(response.data.user).length > 0) {
          console.log(response);
          this.setState({
            user: response.data.user,
            avatar: response.data.avatar,
            loggedInStatus: 'LOGGED_IN',
            bookstore_id:response.data.bookstore_id
          })
        }
      })
      .catch(error => {
        console.log(error);
      })

  }

  handleLogin(data) {
    console.log(data);
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user,
      avatar: data.avatar
    });
    localStorage.setItem("user_id", data.user.id);
  }


  // handleRedirect(){
  //       this.props.history.push('/login');
  // }

  componentDidMount() {
    if (localStorage.getItem("user_id")) {
      this.is_logged_in(localStorage.getItem("user_id"))
    }
  }

 
  render(){
  return (
    <div>
      <Header
        loggedInStatus={this.state.loggedInStatus} user={this.state.user} bookstore_id={this.state.bookstore_id} avatar={this.state.avatar} handleRedirect={this.handleRedirect} is_logged_in={this.is_logged_in} role={this.state.user.role} >
      </Header>
      <div style={{minHeight:400}}>
      <Switch>
   
          <Route 
          path="/"
          exact 
          render={props => (
            <Home { ... props} loggedInStatus={this.state.loggedInStatus} />
          )}
          /> 
           
          <Route path="/genre/:id" exact component={Genre}/>
    
            <Route path="/map" component={Map}/>
          
          
          
            <Route path="/community" render={(props) =><Community  is_logged_in = {this.state.loggedInStatus} />}/>
          
          { this.state.loggedInStatus == 'LOGGED_IN' &&
             (<Route path="/writer" component={ MyStories}/> )
          }  
          { this.state.loggedInStatus == 'NOT_LOGGED_IN' &&
             (<Route path="/writer" render={(props) =><Login {...props} loggedInStatus={this.state.loggedInStatus} handleLogin={this.handleLogin} />}/> )
          } 
          { this.state.loggedInStatus == 'LOGGED_IN' &&
            <Route path="/mystories" component={MyStories}/>
          }

          { this.state.loggedInStatus == 'NOT_LOGGED_IN' &&
            <Route path="/mystories" render={(props) => <Login {...props} loggedInStatus={this.state.loggedInStatus} handleLogin={this.handleLogin} />}/>

          }
          { this.state.loggedInStatus == 'LOGGED_IN' &&
            <Route path="/addstory" component={AddStory}/>
          }
          {  this.state.loggedInStatus == 'NOT_LOGGED_IN' &&
            <Route path="/addstory" render={(props) => <Login {...props} loggedInStatus={this.state.loggedInStatus} handleLogin={this.handleLogin} />}/>
          }
          
            <Route path="/writerStories/:id" render={(props) => <WriterStories {...props} />} />
          
            <Route path="/AllStories" component={AllStories} />
            <Route path="/shortStory/:id" component={ShortStoryDetails} />
         
            
         
          <Route path="/bookdetails/:isbn" render={(props) => <BookDetails {...props} />} />
          
          <Route path="/userprofile" component={UserProfile}/>
          
        
          <Route path="/FavoritesPage" component={FavoritesPage}/>
         
          <Route path="/BookShelf" component={BookShelf}/>
          
          
          <Route path="/DownloadsPage" component={DownloadsPage}/>
          
        
          <Route path="/UserPage" component={UserPage}/>
          
         
          <Route path="/FreeBook" component={FreeBook} />
          

            <Route path="/shortStory/:id" component={ShortStoryDetails} />
         
          <Route
              path="/sign_up"
              render={props => (
                <Registration {...props} loggedInStatus={this.state.loggedInStatus} handleLogin={this.handleLogin} />
              )}
            />

            <Route
              path="/login"
              render={props => (
                <Login {...props} loggedInStatus={this.state.loggedInStatus} handleLogin={this.handleLogin} />
              )}
            />
          
          <Route path="/404" component={NotFound} />
          
              
          <Route 
              path="/shortStory/:id"
              exact
              render={props => (
                <ShortStoryDetails {...props}  user={this.state.user}  />
              )}
            />
            {/* <Route path="/shortStory/:id" component={ShortStoryDetails} /> */}
            { this.state.user.role == 'admin' &&

             <Route 
              path="/admin"
              exact
              render={props => (
                <Admin {...props} loggedInStatus={this.state.loggedInStatus} user={this.state.user} avatar={this.state.avatar} handleRedirect={this.handleRedirect} />
              )}
            />}
             {/* { this.state.user.role == 'seller' &&
          <Route path="/bookstorebooks/:id" component={BookStoreBooks} />} */}
          <Route path="/addbook/:id" component={AddBook} />
          <Route
              path="/notifications"
              render={props => (
                <NotificationsPage {...props} user={this.state.user} />
              )}
            />
              
            {this.state.user.role == 'seller' && 
            <Route path="/create/BookStores" component={AdminBookStores} />
            }      

            {this.state.user.role == 'seller' &&
              <Route path="/bookstorebooks/:id" component={BookStoreBooks} />}
            <Route path="/create/BookStores" component={AdminBookStores} />
            <Route path="*" component={NotFound} />
          </Switch >
        </div >
        <Footer></Footer>
      </div >

    )
  }
}


export default App;