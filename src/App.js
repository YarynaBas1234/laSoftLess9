import React from 'react';
import './App.css';
import LoginForm from './loginForm/LoginForm';
import TodoApp from './todoApp/TodoApp';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      text: "Увійдіть в систему",
      textError: "Заповніть всі поля з *",
      userCurrent: {
        name: "",
        login: "",
        password: "",
        textarea: ""
      },
      isEnter: false
    }
  }

  componentDidMount() {
    localStorage.getItem('users') && this.setState({
      users: JSON.parse(localStorage.getItem('users')),
    })
    localStorage.getItem('userCurrent') && this.setState({
      userCurrent: JSON.parse(localStorage.getItem('userCurrent')),
    })
    localStorage.getItem('text') && this.setState({
      text: JSON.parse(localStorage.getItem('text')),
    })
    localStorage.getItem('isEnter') && this.setState({
      isEnter: JSON.parse(localStorage.getItem('isEnter')),
    })
  }

  public = (myEvent) => {
    myEvent.preventDefault();
    const { login, name, password, textarea } = myEvent.target;
    const currentID = +new Date();

    if (name.value === "" || login.value === "" || password.value === "") {
      this.setState({ textError: "Ви заповнили не всі поля" }, console.log(this.state));
    }
    else if (password.value.length <= 6) {
      this.setState({ textError: "Пароль має бути > 6 символів" }, console.log(this.state));
    }
    else {
      const registration = () => {
        this.setState({
          users: [...this.state.users, {
            id: currentID,
            name: name.value,
            login: login.value,
            password: password.value,
            textarea: textarea.value
          }],
          text: "Реєстрація пройшла успішно",
          textError: ""
        }, () => {
          localStorage.setItem('users', JSON.stringify(this.state.users));
        });
      }

      if (this.state.users.length > 0) {
        let isUser = this.state.users.some(user => (user.login === login.value) && (user.password === password.value) && (user.name === name.value))
        if (isUser) {
          this.setState({
            userCurrent: {
              name: name.value,
              login: login.value,
              password: password.value,
              textarea: textarea.value
            },
            isEnter: true,
            text: "Ви увійшли в систему як " + name.value,
          }, () => {
            localStorage.setItem('userCurrent', JSON.stringify(this.state.userCurrent));
            localStorage.setItem('text', JSON.stringify(this.state.text));
            localStorage.setItem('isEnter', JSON.stringify(this.state.isEnter));
          });
        } else {
          if (!this.state.users.some(user => user.login === login.value)) {
            registration();
          }
          else{
            this.setState({
              text: "Користувач з логіном " + login.value + " вже зареєстрований"
            })
          }
        }
      } else {
        registration();
      }
    }
  }
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <ul>
              <li><NavLink to="/login">Login Form</NavLink></li>
              <li><NavLink to="/todo">Todo app</NavLink></li>
            </ul>
            <Switch>
              <Route exact path="/login" component={() => <LoginForm text={this.state.text} textError={this.state.textError} public={this.public} />} />
              <Route exact path="/todo" component={() => <TodoApp users={this.state.users} userCurrent={this.state.userCurrent} isEnter={this.state.isEnter} />} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
export default App;











// const registration = () => {
//   this.state.users.map(elem =>{
//     if(login.value){
//       this.setState({
//         users: [...this.state.users, {
//           id: currentID,
//           name: name.value,
//           login: login.value,
//           password: password.value,
//           textarea: textarea.value
//         }],
//         text: "Реєстрація пройшла успішно",
//         textError: ""
//       }, () => {
//         localStorage.setItem('users', JSON.stringify(this.state.users));
//       });
//     }
//   }) 
// }