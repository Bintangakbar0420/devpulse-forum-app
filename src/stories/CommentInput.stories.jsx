import { BrowserRouter } from 'react-router-dom';
import CommentInput from '../components/comments/CommentInput';

export default {
  title: 'Components/CommentInput',
  component: CommentInput,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ maxWidth: '600px', margin: '20px auto' }}>
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
  argTypes: {
    onAddComment: { action: 'commentSubmitted' },
  },
};

export const LoggedInUser = {
  args: {
    authUser: {
      id: 'user-1',
      name: 'Budi Santoso',
    },
  },
};

export const GuestUser = {
  args: {
    authUser: null,
  },
};
