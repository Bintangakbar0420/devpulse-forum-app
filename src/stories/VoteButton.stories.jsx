import VoteButton from '../components/common/VoteButton';

export default {
  title: 'Components/VoteButton',
  component: VoteButton,
  tags: ['autodocs'],
  argTypes: {
    onUpVote: { action: 'upVoted' },
    onDownVote: { action: 'downVoted' },
  },
};

export const Default = {
  args: {
    upVotesBy: ['user-1', 'user-2'],
    downVotesBy: [],
    authUserId: null,
  },
};

export const UserUpvoted = {
  args: {
    upVotesBy: ['user-1', 'user-2'],
    downVotesBy: [],
    authUserId: 'user-1',
  },
};

export const UserDownvoted = {
  args: {
    upVotesBy: ['user-2'],
    downVotesBy: ['user-1'],
    authUserId: 'user-1',
  },
};

export const HighVoteCounts = {
  args: {
    upVotesBy: Array.from({ length: 42 }, (_, i) => `user-${i}`),
    downVotesBy: Array.from({ length: 3 }, (_, i) => `user-${i}`),
    authUserId: null,
  },
};
