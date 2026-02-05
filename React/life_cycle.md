# React life cycle methods


### 1. componentDidMount

```
class App extends Component {
  constructor(){
    // this will run very first time
    super(); // this will give me the Component thing
  }

  componentDidMount(){
    console.log("this will trigger first time, after repaint");
  }


  render(
    return (
      <>
        <h2> React life cycle methods</h2>
      </>
    );
  );
}
```


### JSX
you can write HTML code in JS, then with the help of transpiler this will convert to browser language.



## If we wanted to use setState, we have two ways
1. We can use arrow function
2. We have to bind this function with this, inside the constructor.

```
class App extends Component {
  constructor() {
    super();

    this.state = {
      count: 0,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    console.log("this will trigger first time, after repaint");
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  // handleClick = () => {
  //   this.setState({ count: this.state.count + 1 });
  // };

  render() {
    return (
      <>
        <h2> React life cycle methods</h2>
        <h2>{this.state.count}</h2>
        <button onClick={this.handleClick}>Click Me</button>
      </>
    );
  }
}
```


## componentDidUpdate()
This method will get trigger whenever this component will get updated.

```
class Counter extends Component {
  constructor() {
    super();

    this.state = {
      name: "Counter APP",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, prevState);
    if (prevProps.number !== this.props.number) {
      console.log("Counter component updated");
    }
  }

  render() {
    return (
      <>
        <h2>{this.props.number}</h2>
      </>
    );
  }
}
```


## componentWillUnMount()

When ever this component will get removed from the UI, this life cycle method will gets trigger automatically.

```
class Counter extends Component {
  constructor() {
    super();

    this.state = {
      name: "Counter APP",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.number !== this.props.number) {
      console.log("Counter component updated");
    }
  }

  componentWillUnmount() {
    console.log("Component gets removed");
  }

  render() {
    return (
      <>
        <h2>{this.props.number}</h2>
      </>
    );
  }
}

```