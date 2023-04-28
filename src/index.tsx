import { Component, h, render } from 'preact';
import { BottleInput } from './bottle-input.js';
import { BottleInfo, BritishBottleInfo, BomberBottleInfo, IndustryStandardBottleInfo } from './bottle-types.js';

interface BottlitProps {}

interface BottlitState {
  beerTotalVolume: number; // Ounces for now
  beerRemainingVolume: number;
}

/**
 * The main app class for BottLit, the beer bottling calculator.
 */
export class Bottlit extends Component<BottlitProps, BottlitState> {
  state: BottlitState = { beerTotalVolume: 0, beerRemainingVolume: 0 };
  volumesUsedMap: Map<BottleInfo, number> = new Map();

  constructor() {
    super();

    this.state = {
      beerTotalVolume: 0,
      beerRemainingVolume: 0,
    };

    [IndustryStandardBottleInfo, BritishBottleInfo, BomberBottleInfo].forEach(info => {
      this.volumesUsedMap.set(info, 0);
    });
  }

  changeBeerVolume(evt: Event) {
    evt.preventDefault();
    const totalVolumeEl = evt.currentTarget as HTMLInputElement;

    const beerTotalVolume = parseInt(totalVolumeEl.value);
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
  private getRemainingVolume(totalVol: number): number {
    let volumeRemaining = totalVol;
    for (const [bottleInfo, numBottles] of this.volumesUsedMap) {
      if (Number.isNaN(numBottles) || numBottles < 0) {
        continue;
      }
      volumeRemaining -= (bottleInfo.bottleVolume * numBottles);
    }
    return volumeRemaining;
  }

  render() {
    return (
      <div>
        <section>
          <label for="total-volume">Total Beer Volume:</label>
          <input type="number" id="total-volume" autofocus
                 onInput={(evt) => this.changeBeerVolume(evt)}></input>
          <span>(oz)</span>
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
          <label for="remaining-volume">Remaining Beer to Bottle:</label>
          <span id="remaining-volume">{this.state.beerRemainingVolume} (oz)</span>
        </section>
      </div>
    );
  }
}

render(<Bottlit />, document.getElementById("app"));
