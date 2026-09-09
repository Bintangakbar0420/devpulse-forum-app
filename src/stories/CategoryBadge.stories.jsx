import CategoryBadge from '../components/common/CategoryBadge';

export default {
  title: 'Components/CategoryBadge',
  component: CategoryBadge,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export const Default = {
  args: {
    category: 'react',
  },
};

export const WithHashtag = {
  args: {
    category: '#redux',
  },
};

export const Clickable = {
  args: {
    category: 'javascript',
    onClick: () => {},
  },
};
