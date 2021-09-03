import React from "react";
import './App.css';

// custom component
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";


//we converted the function into the class so we can access methods an properties
class App extends React.Component {

  constructor() {
    super();
    console.log('this', this)
    this.state = {
      monsters: [],
      searchfield: ''
    }
    // when you create a custom method in a class you need to pass it the scope of this(using bind method)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({ searchfield: e.target.value })
  }

  //its called when react puts the component in the page and its rendered for the first time
  componentDidMount() {

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(monsters => this.setState({ monsters: monsters }))
  }

  render() {

    const { monsters, searchfield } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchfield.toLowerCase())
    );

    return (
      <div className="App">

        <h1>Monsters Rolodex </h1>

        <SearchBox
          placeholder='search a monster'
          handleChange={this.handleChange} />

        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}
export default App;
