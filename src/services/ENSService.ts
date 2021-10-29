import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import RootContext from '../contexts';

export default class ENSService {
  context: RootContext;
  web3Context: Web3ReactContextInterface;

  constructor(context: RootContext) {
    this.context = context;
    this.web3Context = null;
  }

  getENSWeb3Context(): Web3ReactContextInterface {
    return this.web3Context;
  }

  setENSWeb3Context(context: Web3ReactContextInterface) {
    console.debug('[ENSService] Setting Mainnet Web3 context', context);
    this.web3Context = context;
  }

  async resolveContentHash(ensAddress: string) {
    const web3 = this.web3Context.library;
    const contentHash = await web3.eth.ens.getContenthash(ensAddress);
    return contentHash;
  }
}
