import useEtherSWR from 'ether-swr';
import { proposalFormatterMiddleware } from './middleware/proposalFormatter';

import { Proposal } from '../../../types/types.guilds';

export const useProposal = (guildId: string, proposalId: string) => {
  return useEtherSWR<Proposal>([guildId, 'getProposal', proposalId], {
    use: [proposalFormatterMiddleware],
  });
};
