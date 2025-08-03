// External imports
import { ComponentMeta } from '@storybook/react';

// Local imports
import GetConsultation from '.';

// Story placement in the story list
export default {
  title: 'Pages/CourseProgram',
  component: GetConsultation,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof GetConsultation>;

// Default export
export const Default = () => <GetConsultation />;
