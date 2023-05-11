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
  volume: LiquidVolume;
}

export class LiquidVolumeInput extends Component<LiquidVolumeProps, LiquidVolumeState> {
  state = { volume: new LiquidVolume(0) };

  handleChangeInput(e: Event, unitType: UnitDescriptor, props: LiquidVolumeProps) {
    const inputEl = e.target as HTMLInputElement;
    const val = new LiquidVolume(inputEl.valueAsNumber, unitType);
    this.setState({
      volume: val,
    });
    if (props.updateQuantityFn) {
      props.updateQuantityFn(val);
    }
  };

  handleFocus(evt: Event) {
    const inputEl = evt.target as HTMLInputElement;
    inputEl.select();
  }

  render(props: LiquidVolumeProps) {
    return (
      <div>
        <label>{props.labelString}:</label>
        <input
          type="number"
          disabled={!props.editable}
          value={this.props.editable ? this.state.volume.get(LITRE) : this.props.volume.get(LITRE)}
          onFocus={this.handleFocus}
          onInput={(evt) => this.handleChangeInput(evt, LITRE, props)}
          placeholder="Litres"
        />
        <span> liters</span>
        <input
          type="number"
          disabled={!props.editable}
          value={this.props.editable ? this.state.volume.get(OZ) : this.props.volume.get(OZ)}
          onFocus={this.handleFocus}
          onInput={(evt) => this.handleChangeInput(evt, OZ, props)}
          placeholder="Ounces"
        />
        <span> ounces</span>
      </div>
    );
  }
}
