import { Component, Fragment, h, createRef } from 'preact';
import { LiquidVolume, LITRE, OZ } from '../units/liquid-volume.js';
import { Quantity, UnitDescriptor } from '../units/quantity.js';

interface LiquidVolumeProps {
  editable: boolean;
  labelString: string;
  units: UnitDescriptor[];
  updateQuantityFn?: (LiquidVolume) => void;
  /** Only set when editable is false. */
  volume?: Quantity;
}

interface LiquidVolumeState {
  /** Only set when an invalid string is present. */
  errValueMap: Map<UnitDescriptor, string>;
  volume: LiquidVolume;
}

const VALID_NUM_REGEX = new RegExp('^(([0-9]+)|([0-9]+[.][0-9]+))$')

/** A UI component for liquid volume that has two linked inputs representing Litres and Ounces. */
export class LiquidVolumeInput extends Component<LiquidVolumeProps, LiquidVolumeState> {
  myRef;
  state = {
    volume: new LiquidVolume(0),
    errValueMap: new Map(),
    errValue_L: undefined,
    errValue_OZ: undefined,
  };

  constructor(props: LiquidVolumeProps) {
    super(props);
    this.myRef = createRef();
  }

  handleInput(e: Event, unitType: UnitDescriptor, props: LiquidVolumeProps) {
    const inputEl = e.target as HTMLInputElement;
    const amt = inputEl.value;
    if (!amt || amt.match(VALID_NUM_REGEX)) {
      this.handleChange(e, unitType, props);
    } else {
      this.state.errValueMap.set(unitType, amt);
      this.setState({errValueMap: this.state.errValueMap});
    }
  };

  handleChange(e: Event, unitType: UnitDescriptor, props: LiquidVolumeProps) {
    const inputEl = e.target as HTMLInputElement;
    const amt = inputEl.value;
    if (!amt || amt.match(VALID_NUM_REGEX)) {
      const val = new LiquidVolume(Number(amt), unitType);
      this.setState({ volume: val, errValueMap: new Map() });
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
      <div ref={this.myRef}>
        <label>{props.labelString}:</label>
        {
          props.units.map(unitDesc => (
            <Fragment>
              <input
                type="text"
                class={this.state.errValue_L ? 'err' : ''}
                disabled={!props.editable}
                value={this.props.editable ? (this.state.errValueMap.get(unitDesc) ?? this.state.volume.get(unitDesc)) : this.props.volume.get(unitDesc)}
                onFocus={(evt) => this.handleFocus(evt)}
                onInput={(evt) => this.handleInput(evt, unitDesc, props)}
                placeholder={unitDesc.unitString + 's'}
              />
              <span> {unitDesc.unitString}s</span>
            </Fragment>
          ))
        }
      </div>
    );
  }
}
