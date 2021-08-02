import React, { ReactElement } from 'react';
import { Placement } from '@parrotjs/popperjs';

export { default } from './Popper';

export interface IPopperTooltipProps{
    children?:any;
    placement?:Placement;
    TransitionProps?:any;
    popperRef?:any;
    anchorEl?:any;
    disablePortal?:boolean;
    modifiers?:any;
    visible?:boolean;
    popperOptions?:any;
}

export interface IPopperProps{
    disablePortal?:boolean;
    container?:any;
    children?:any;
    transition?:boolean;
    placement?:Placement;
    visible?:boolean;
    popperOptions?:any;
    popperRef?:any;
    keepMounted?:boolean;
    anchorEl?:any;
} 