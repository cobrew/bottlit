import { Component, h } from 'preact';
import { BottleInfo } from './bottle-types.js';

interface BottleInputProps {
  id: string;
  info: BottleInfo;
  reportVolumeUsedFn: (i: BottleInfo, n: number) => void;
}

interface BottleInputState {}

export class BottleInput extends Component<BottleInputProps, BottleInputState> {
  constructor() {
    super();
    this.state = { numBottles: 0 };
  }

  onInputChange(evt: Event, props: BottleInputProps) {
    evt.preventDefault();
    const inputEl = evt.currentTarget as HTMLInputElement;
    const newNumBottles = parseInt(inputEl.value) || 0;
    props.reportVolumeUsedFn(props.info, newNumBottles);
  }

  render(props: BottleInputProps) {
    return (
      <div>
        <label for={props.id}>{props.info.name} ({props.info.bottleVolume} oz):</label>
        <input id={props.id} type="number"
               onInput={(evt) => this.onInputChange(evt, props)}></input>
      </div>
    );
  }
}
