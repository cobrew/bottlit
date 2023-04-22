import { Component, h } from 'preact';
import { BottleInfo } from './bottle-types.js';

interface BottleInputProps {
  id: string;
  info: BottleInfo;
  reportInvalidInputFn: (i: BottleInfo) => void;
  reportVolumeUsedFn: (i: BottleInfo, n: number) => void;
}

interface BottleInputState {
  invalid: boolean;
}

export class BottleInput extends Component<BottleInputProps, BottleInputState> {
  constructor() {
    super();
    this.state = { invalid: false };
  }

  onInputChange(evt: Event, props: BottleInputProps) {
    evt.preventDefault();
    const inputEl = evt.currentTarget as HTMLInputElement;
    const bottleInt = parseInt(inputEl.value) || 0;
    const bottleFloat = parseFloat(inputEl.value) || 0;
  
    if (bottleInt < 0 || bottleInt !== bottleFloat) {
      props.reportInvalidInputFn(props.info);
      this.setState({ invalid: true });
    } else {
      props.reportVolumeUsedFn(props.info, bottleInt);
      this.setState({ invalid: false });
    }
  }

  render(props: BottleInputProps) {
    return (
      <div className={this.state.invalid ? "invalid" : ""}>
        <label for={props.id}>{props.info.name} ({props.info.bottleVolume} oz):</label>
        <input id={props.id} type="number"
               onInput={(evt) => this.onInputChange(evt, props)}></input>
        {this.state.invalid && <span>← Must be a positive integer or zero!</span>}
      </div>
    );
  }
}
