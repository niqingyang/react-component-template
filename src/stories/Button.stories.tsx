import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Button} from './Button';

export default {
    title: 'Example/Button',
    component: Button,
    argTypes: {
        backgroundColor: {control: 'color'},
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = TemplateBind(Template, {});
Primary.args = {
    primary: true,
    label: 'Button',
};

export const Secondary = TemplateBind(Template, {});
Secondary.args = {
    label: 'Button',
};

export const Large = TemplateBind(Template, {});
Large.args = {
    size: 'large',
    label: 'Button',
};

export const Small = TemplateBind(Template, {});
Small.args = {
    size: 'small',
    label: 'Button',
};
