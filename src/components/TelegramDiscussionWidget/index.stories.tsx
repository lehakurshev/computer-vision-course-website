import React from 'react';
import { Story, Meta } from '@storybook/react';
import TelegramDiscussionWidget from './index';
import { BrowserRouter } from 'react-router-dom'; // Оборачиваем компонент в Router

export default {
  title: 'Components/TelegramDiscussionWidget',
  component: TelegramDiscussionWidget,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} as Meta;

const Template: Story = (args) => <TelegramDiscussionWidget {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Здесь можно передавать пропсы, если компонент их принимает
};

export const CustomStyle = Template.bind({});
CustomStyle.args = {
  className: 'custom-navigation-style', // Пример добавления класса для стилизации
};
CustomStyle.parameters = {
  backgrounds: { default: 'dark' },
};
