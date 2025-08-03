// External imports
import { ComponentMeta } from '@storybook/react';

// Local imports
import CourseProgram from '.';

// Story placement in the story list
export default {
  title: 'Pages/CourseProgram',
  component: CourseProgram,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CourseProgram>;

// Default export
export const Default = () => <CourseProgram />;
