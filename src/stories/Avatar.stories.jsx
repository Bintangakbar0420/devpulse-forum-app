import Avatar from '../components/common/Avatar';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'range', min: 20, max: 120, step: 4 } },
  },
};

export const DefaultFallback = {
  args: {
    name: 'Budi Santoso',
    size: 44,
  },
};

export const CustomImage = {
  args: {
    image: 'https://ui-avatars.com/api/?name=Alex+Pratama&background=06b6d4&color=fff',
    name: 'Alex Pratama',
    size: 52,
  },
};

export const LargeProfile = {
  args: {
    name: 'Dimas Saputra',
    size: 80,
  },
};
