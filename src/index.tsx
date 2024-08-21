import { Component, h, render } from 'preact';
import { BottleInput } from './bottle-input.js';
import { BottleInfo, BritishBottleInfo, BomberBottleInfo, IndustryStandardBottleInfo } from './bottle-types.js';
import { LiquidVolumeInput } from './components/liquid-volume-input.js';
import { GAL, LiquidVolume, LITRE, OZ } from './units/liquid-volume.js';

interface BottlitProps {}

interface BottlitState {
  beerTotalVolume: LiquidVolume; // Ounces for now
  beerRemainingVolume: LiquidVolume;
}

/**
 * The main app class for BottLit, the beer bottling calculator.
 */
export class Bottlit extends Component<BottlitProps, BottlitState> {
  state: BottlitState = {
    beerTotalVolume: new LiquidVolume(0),
    beerRemainingVolume: new LiquidVolume(0),
  };
  volumesUsedMap: Map<BottleInfo, number> = new Map();

  constructor() {
    super();

    [IndustryStandardBottleInfo, BritishBottleInfo, BomberBottleInfo].forEach(info => {
      this.volumesUsedMap.set(info, 0);
    });
  }

  changeBeerVolume(beerTotalVolume: LiquidVolume) {
    const beerRemainingVolume = this.getRemainingVolume(beerTotalVolume);
    this.setState({ beerTotalVolume, beerRemainingVolume });
  }

  changeInBottles(bottleInfo: BottleInfo, numBottles: number) {
    // It's not great that I'm using an object as a key here...
    this.volumesUsedMap.set(bottleInfo, numBottles);
    const beerRemainingVolume = this.getRemainingVolume(this.state.beerTotalVolume);
    this.setState({ beerRemainingVolume });
  }

  invalidBottle(bottleInfo: BottleInfo) {
    this.volumesUsedMap.set(bottleInfo, NaN);
    const beerRemainingVolume = this.getRemainingVolume(this.state.beerTotalVolume);
    this.setState({ beerRemainingVolume });
  }

  /**
   * Returns the amount not bottled, given a total volume and the bottles being used.
   * Makes no state updates.
   */
  private getRemainingVolume(totalVol: LiquidVolume): LiquidVolume {
    let volumeRemaining = totalVol.get(OZ);
    for (const [bottleInfo, numBottles] of this.volumesUsedMap) {
      if (Number.isNaN(numBottles) || numBottles < 0) {
        continue;
      }
      volumeRemaining -= (bottleInfo.bottleVolume * numBottles);
    }
    return new LiquidVolume(volumeRemaining, OZ);
  }

  render() {
    return (
      <div>
        <section>
          <LiquidVolumeInput editable={true} labelString='Total Beer Volume'
              units={[GAL, LITRE, OZ]}
              updateQuantityFn={(q) => this.changeBeerVolume(q)} />
        </section>

        <hr />

        <section>
          <table>
            {Array.from(this.volumesUsedMap.keys())
                .map(info =>
                    <BottleInput id={'bottle-' + info.bottleType} info={info}
                        reportVolumeUsedFn={(i, n) => this.changeInBottles(i, n)}
                        reportInvalidInputFn={(i) => this.invalidBottle(i)}/>)}
          </table>
        </section>

        <hr />

        <section>
          <LiquidVolumeInput editable={false}
                             units={[GAL, LITRE, OZ]}
                             volume={this.state.beerRemainingVolume}
                             labelString='Remaining Beer to Bottle'/>
        </section>
      </div>
    );
  }
}

render(<Bottlit />, document.getElementById("app"));
