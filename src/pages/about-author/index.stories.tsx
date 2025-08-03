// External imports
import { ComponentMeta } from '@storybook/react';

// Local imports
import AboutAuthor from '.';

// Story placement in the story list
export default {
  title: 'Pages/CourseProgram',
  component: AboutAuthor,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof AboutAuthor>;

// Default export
export const Default = () => <AboutAuthor />;
