import { Component, RenderableProps, h, render } from 'preact';

interface AppProps {
  name: string;
}

interface AppState {
  count: number;
}

export class App extends Component<AppProps, AppState> {
  state: AppState = { count: 0 };

  clicky(name: string) {
    const newCount = this.state.count + 1;
    alert(`Hello, ${name}! You clicked ${newCount} times.`);
    this.setState({count: newCount});
  }

  render(props: AppProps) {
    return (
      <div>
        <button onClick={() => this.clicky(props.name)}>
          Clicky
        </button>
        <div>(clicked {this.state.count} times)</div>
      </div>
    );
  }
}

render(<App name="Rob"/>, document.getElementById("app"));
