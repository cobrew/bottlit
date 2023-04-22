import { Component, h } from 'preact';
import { BottleInfo } from './bottle-types.js';

interface BottleInputProps {
  id: string;
  info: BottleInfo;
  reportInvalidInputFn: (i: BottleInfo) => void;
  reportVolumeUsedFn: (i: BottleInfo, n: number) => void;
}

interface BottleInputState {
  validState: BottleInputValidState;
}

enum BottleInputValidState {
  VALID,
  INVALID_FLOAT,
}

export class BottleInput extends Component<BottleInputProps, BottleInputState> {
  constructor() {
    super();
    this.state = { validState: BottleInputValidState.VALID };
  }

  onInputChange(evt: Event, props: BottleInputProps) {
    evt.preventDefault();
    const inputEl = evt.currentTarget as HTMLInputElement;
    let bottleNum = inputEl.valueAsNumber;
    const bottleFloat = Math.ceil(parseFloat(inputEl.value) || 0);
    // For the case where the text of the number input cannot be interpreted as
    // a number, overwrite the value to '0' and select the text in the input
    // so that it can be immediately re-typed.
    if (Number.isNaN(bottleNum)) {
      bottleNum = 0;
      inputEl.value = '0';
      inputEl.select();
    }
  
    let newValidState: BottleInputValidState = BottleInputValidState.VALID;
    if (bottleNum !== bottleFloat) {
      inputEl.select();
      newValidState = BottleInputValidState.INVALID_FLOAT;
      props.reportInvalidInputFn(props.info);
    } else {
      props.reportVolumeUsedFn(props.info, bottleNum);
    }

    this.setState({ validState: newValidState });
}

  render(props: BottleInputProps) {
    return (
      <div className={this.state.validState !== BottleInputValidState.VALID ? "invalid" : ""}>
        <label for={props.id}>{props.info.name} ({props.info.bottleVolume} oz):</label>
        <input id={props.id} type="number" min="0"
               onInput={(evt) => this.onInputChange(evt, props)}></input>
        {this.state.validState === BottleInputValidState.INVALID_FLOAT ?
            (<span>← Must be a whole number!</span>) : ''
        }
      </div>
    );
  }
}
