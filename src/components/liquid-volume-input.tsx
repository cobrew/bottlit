import { Component, h } from 'preact';
import { LiquidVolume, LITRE, OZ } from '../units/liquid-volume.js';
import { Quantity, UnitDescriptor } from '../units/quantity.js';

interface LiquidVolumeProps {
  editable: boolean;
  labelString: string;
  /** Only set when editable is false. */
  volume?: Quantity;
  updateQuantityFn?: (LiquidVolume) => void;
}

interface LiquidVolumeState {
  /** Only set when an invalid string is present. */
  errValue_L: string;
  errValue_OZ: string;
  volume: LiquidVolume;
}

const VALID_NUM_REGEX = new RegExp('^(([0-9]+)|([0-9]+[.][0-9]+))$')

/** A UI component for liquid volume that has two linked inputs representing Litres and Ounces. */
export class LiquidVolumeInput extends Component<LiquidVolumeProps, LiquidVolumeState> {
  state = { volume: new LiquidVolume(0), errValue_L: undefined, errValue_OZ: undefined };

  handleInput(e: Event, unitType: UnitDescriptor, props: LiquidVolumeProps) {
    const inputEl = e.target as HTMLInputElement;
    const amt = inputEl.value;
    if (!amt || amt.match(VALID_NUM_REGEX)) {
      this.handleChange(e, unitType, props);
    } else {
      if (unitType.description === 'L') {
        this.setState({errValue_L: amt});
      } else {
        this.setState({errValue_OZ: amt});
      }
    }
  };

  handleChange(e: Event, unitType: UnitDescriptor, props: LiquidVolumeProps) {
    const inputEl = e.target as HTMLInputElement;
    const amt = inputEl.value;
    if (!amt || amt.match(VALID_NUM_REGEX)) {
      const val = new LiquidVolume(Number(amt), unitType);
      this.setState({ volume: val, errValue_L: undefined, errValue_OZ: undefined });
      if (props.updateQuantityFn) {
        props.updateQuantityFn(val);
      }
    }
  }

  handleFocus(evt: Event) {
    const inputEl = evt.target as HTMLInputElement;
    inputEl.select();
  }

  render(props: LiquidVolumeProps) {
    return (
      <div>
        <label>{props.labelString}:</label>
        <input
          type="text"
          class={this.state.errValue_L ? "err" : ""}
          disabled={!props.editable}
          value={this.props.editable ? (this.state.errValue_L ?? this.state.volume.get(LITRE)) : this.props.volume.get(LITRE)}
          onFocus={this.handleFocus}
          onInput={(evt) => this.handleInput(evt, LITRE, props)}
          placeholder="Litres"
        />
        <span> liters</span>
        <input
          type="text"
          class={this.state.errValue_OZ ? "err" : ""}
          disabled={!props.editable}
          value={this.props.editable ? (this.state.errValue_OZ ?? this.state.volume.get(OZ)) : this.props.volume.get(OZ)}
          onFocus={this.handleFocus}
          onInput={(evt) => this.handleInput(evt, OZ, props)}
          placeholder="Ounces"
        />
        <span> ounces</span>
      </div>
    );
  }
}
