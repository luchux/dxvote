import styled from 'styled-components';
import { observer } from 'mobx-react';
import { useContext } from '../contexts';
import BlockchainLink from '../components/common/BlockchainLink';
import Question from '../components/common/Question';
import { bnum } from '../utils';
import moment from 'moment';

const SchemesInformationWrapper = styled.div`
  width: 100%;
  background: white;
  font-weight: 400;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ProposalTableHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: var(--dark-text-gray);
  padding: 20px 40px 8px 24px;
  font-size: 16px;
  text-align: center;
`;

const TableHeader = styled.div`
  width: ${props => props.width || '25%'};
  text-align: ${props => props.align};
  align-items: center;
`;

const TableRowsWrapper = styled.div`
  overflow-y: scroll;
`;

const TableRow = styled.div`
  font-size: 16px;
  line-height: 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid var(--line-gray);
  padding: 16px 24px;
  color: var(--dark-text-gray);
  text-align: right;
`;

const TableCell = styled.div`
  a {
    text-decoration: none;
    width: 100%;

    &:hover {
      color: var(--turquois-text-onHover);
    }
  }
  color: ${props => props.color};
  width: ${props => props.width || '25%'};
  text-align: ${props => props.align};
  font-weight: ${props => props.weight};
  white-space: ${props => (props.wrapText ? 'nowrap' : 'inherit')};
  overflow: ${props => (props.wrapText ? 'hidden' : 'inherit')};
  text-overflow: ${props => (props.wrapText ? 'ellipsis' : 'inherit')};
`;

const SchemesInformation = observer(() => {
  const {
    context: { providerStore, daoStore },
  } = useContext();
  const { library } = providerStore.getActiveWeb3React();

  const schemes = daoStore.getAllSchemes();
  return (
    <SchemesInformationWrapper>
      <ProposalTableHeaderWrapper>
        <TableHeader width="15%" align="left">
          {' '}
          Name{' '}
        </TableHeader>
        <TableHeader width="40%" align="center">
          {' '}
          Configuration <Question question="9" />{' '}
        </TableHeader>
        <TableHeader width="25%" align="center">
          {' '}
          Permissions <Question question="9" />{' '}
        </TableHeader>
        <TableHeader
          width="20%"
          align="center"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <span>Boosted</span> - <span>Active</span> - <span>Total</span>
        </TableHeader>
      </ProposalTableHeaderWrapper>
      <TableRowsWrapper>
        {schemes.map((scheme, i) => {
          const schemeProposals = daoStore.getSchemeProposals(scheme.address);
          const votingMachineParameters = daoStore.getVotingParametersOfScheme(
            scheme.address
          );
          if (votingMachineParameters)
            return (
              <div key={'scheme' + i}>
                <TableRow>
                  <TableCell
                    width="15%"
                    align="left"
                    weight="500"
                    wrapText="true"
                  >
                    {scheme.name}
                    <br />
                    <BlockchainLink size="short" text={scheme.address} toCopy />
                  </TableCell>
                  <TableCell width="40%" align="center">
                    <small>Params Hash: {scheme.paramsHash}</small>
                    <br />
                    <small>
                      Queued Proposal Period:{' '}
                      {moment
                        .duration(
                          votingMachineParameters.queuedVotePeriodLimit.toString(),
                          'seconds'
                        )
                        .humanize()}
                    </small>
                    <br />
                    <small>
                      Boosted Proposal Period:{' '}
                      {moment
                        .duration(
                          votingMachineParameters.boostedVotePeriodLimit.toString(),
                          'seconds'
                        )
                        .humanize()}
                    </small>
                    <br />
                    <small>
                      PreBoosted Proposal Period:{' '}
                      {moment
                        .duration(
                          votingMachineParameters.preBoostedVotePeriodLimit.toString(),
                          'seconds'
                        )
                        .humanize()}
                    </small>
                    <br />
                    <small>
                      Quiet Ending Period:{' '}
                      {moment
                        .duration(
                          votingMachineParameters.quietEndingPeriod.toString(),
                          'seconds'
                        )
                        .humanize()}
                    </small>
                    <br />
                    {scheme.type === 'WalletScheme' ? (
                      <small>
                        Max time for execution:{' '}
                        {moment
                          .duration(
                            scheme.maxSecondsForExecution.toString(),
                            'seconds'
                          )
                          .humanize()}
                        <br />
                      </small>
                    ) : (
                      <div />
                    )}
                    {scheme.type === 'WalletScheme' ? (
                      <small>
                        Max REP % to change in proposal:{' '}
                        {scheme.maxRepPercentageChange.toString()} %<br />
                      </small>
                    ) : (
                      <div />
                    )}
                    {scheme.type === 'WalletScheme' ? (
                      <small>
                        Required Percentage for boosted approval:{' '}
                        {bnum(scheme.boostedVoteRequiredPercentage)
                          .div('100')
                          .toString()}{' '}
                        %<br />
                      </small>
                    ) : (
                      <div />
                    )}
                    <small>
                      Rep Proposing Reward:{' '}
                      {Number(
                        library.utils.fromWei(
                          votingMachineParameters.proposingRepReward.toString()
                        )
                      ).toFixed(2)}{' '}
                      REP
                    </small>
                    <br />
                    <small>
                      Reputation Loss Ratio:{' '}
                      {votingMachineParameters.votersReputationLossRatio.toString()}{' '}
                      %
                    </small>
                    <br />
                    <small>
                      Minimum Dao Boost:{' '}
                      {Number(
                        library.utils.fromWei(
                          votingMachineParameters.minimumDaoBounty.toString()
                        )
                      ).toFixed(2)}{' '}
                      DXD
                    </small>
                    <br />
                    <small>
                      Proposal Boost Bounty Const:{' '}
                      {votingMachineParameters.daoBountyConst.toString()}
                    </small>
                    <br />
                    <small>
                      Boost Threshold Constant:{' '}
                      {votingMachineParameters.thresholdConst
                        .div(10 ** 12)
                        .toString()}
                    </small>
                    <br />
                    <small>
                      Boost Limit Exponent Value:{' '}
                      {votingMachineParameters.limitExponentValue.toString()}
                    </small>
                  </TableCell>
                  <TableCell width="25%" align="center" wrapText>
                    <strong>Controller Permissions</strong>
                    <br />
                    <small>
                      {scheme.permissions.canGenericCall ? 'Can' : 'Cant'} make
                      generic call
                    </small>
                    <br />
                    <small>
                      {scheme.permissions.canUpgrade ? 'Can' : 'Cant'} upgrade
                      controller
                    </small>
                    <br />
                    <small>
                      {scheme.permissions.canChangeConstraints ? 'Can' : 'Cant'}{' '}
                      change constraints
                    </small>
                    <br />
                    <small>
                      {scheme.permissions.canRegisterSchemes ? 'Can' : 'Cant'}{' '}
                      register schemes
                    </small>
                  </TableCell>

                  <TableCell
                    width="20%"
                    align="center"
                    style={{ display: 'flex', justifyContent: 'space-around' }}
                  >
                    <span>{scheme.boostedProposals}</span>-
                    <span>
                      {
                        schemeProposals.filter(proposal => {
                          return proposal.stateInVotingMachine > 2;
                        }).length
                      }
                    </span>
                    -
                    <span>
                      {scheme.proposalIds ? scheme.proposalIds.length : 0}
                    </span>
                  </TableCell>
                </TableRow>
              </div>
            );
          else return <div />;
        })}
      </TableRowsWrapper>
    </SchemesInformationWrapper>
  );
});

export default SchemesInformation;
