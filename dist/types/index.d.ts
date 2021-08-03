import { Placement } from '@parrotjs/popperjs';
export { default } from './Popper';
export interface IPopperTooltipProps {
    children?: any;
    placement?: Placement;
    TransitionProps?: any;
    popperRef?: any;
    target?: any;
    disablePortal?: boolean;
    modifiers?: any;
    visible?: boolean;
    popperOptions?: any;
}
export interface IPopperProps {
    disablePortal?: boolean;
    container?: any;
    children?: any;
    transition?: boolean;
    placement?: Placement;
    visible?: boolean;
    popperOptions?: any;
    popperRef?: any;
    keepMounted?: boolean;
    target?: any;
}
