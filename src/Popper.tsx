import React, { useState, useRef, useEffect } from 'react';
import { IPopperProps, IPopperTooltipProps } from '.';
import { useForkRef } from '@parrotjs/react-hooks';
import { createPopper } from '@parrotjs/popperjs';
import Portal from '@parrotjs/react-portal';
import './index.scss';

function getAnchorEl(anchorEl: any) {
    return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

const defaultPopperOptions = {};

const PopperTooltip = React.forwardRef((props: IPopperTooltipProps, ref) => {

    const {
        children,
        target,
        disablePortal,
        placement: initialPlacement,
        TransitionProps,
        modifiers,
        popperRef: popperRefProp,
        popperOptions,
        visible,
        ...other
    } = props;

    const tooltipRef = useRef(null);
    const handleRef = useForkRef(tooltipRef, ref); 

    const popperRef = useRef<any>(null);
    const handlePopperRef = useForkRef(popperRef, popperRefProp);

    const handlePopperRefRef = useRef<any>(handlePopperRef);

    useEffect(() => {
        handlePopperRefRef.current = handlePopperRef;
    }, [handlePopperRef])
    React.useImperativeHandle(popperRefProp, () => popperRef.current, []);

    const [placement, setPlacement] = useState(initialPlacement);

    useEffect(() => {
        if (popperRef.current) {
            popperRef.current.forceUpdate();
        }
    });

    useEffect(() => {
        if (!target || !visible) {
            return undefined;
        }

        const handlePopperUpdate = (data: any) => {
            setPlacement(data.placement);
        };

        let popperModifiers = [
            {
                name: 'preventOverflow',
                options: {
                    altBoundary: disablePortal,
                },
            },
            {
                name: 'flip',
                options: {
                    altBoundary: disablePortal,
                },
            },
            {
                name: 'onUpdate',
                enabled: true,
                phase: 'afterWrite',
                fn: ({ state }: any) => {
                    handlePopperUpdate(state);
                },
            },
        ];

        if (modifiers != null) {
            popperModifiers = popperModifiers.concat(modifiers);
        }
        if (popperOptions && popperOptions.modifiers != null) {
            popperModifiers = popperModifiers.concat(popperOptions.modifiers);
        }

        const popper: any = createPopper(getAnchorEl(target), tooltipRef.current, {
            placement: initialPlacement,
            ...popperOptions,
            modifiers: popperModifiers,
        });

        handlePopperRefRef.current(popper);

        return () => {
            popper.destroy();
            handlePopperRefRef.current(null);
        };
    }, [target, disablePortal, modifiers, visible, popperOptions, initialPlacement]);

    const childProps: any = { placement };

    if (TransitionProps !== null) {
        childProps.TransitionProps = TransitionProps;
    } 

    return (
        <div ref={handleRef} role='tooltip' {...other}>
            {typeof children === 'function' ? children(childProps) : children}
        </div>
    )
});

const Popper = React.forwardRef((props: IPopperProps, ref) => {

    const {
        disablePortal = false,
        container,
        children,
        transition = false,
        placement = 'bottom',
        visible,
        popperRef,
        keepMounted = false,
        popperOptions = defaultPopperOptions,
        target,
        ...restProps
    } = props;

    const [exited, setExited] = React.useState(true);

    const popperRe1f=useRef(null);

    const handleEnter = () => {
        setExited(false);
    }

    const handleExited = () => {
        setExited(true);
    }

    if (!keepMounted && !visible && (!transition || exited)) {
        return null;
    }  
  
    return (
        <Portal disablePortal={disablePortal} container={container} ref={popperRe1f}>
            <PopperTooltip
                disablePortal={disablePortal}
                ref={ref}
                visible={transition ? !exited : visible}
                placement={placement}
                popperOptions={popperOptions}
                popperRef={popperRef}
                target={target}
                {...restProps}
                TransitionProps={
                    transition
                        ? {
                            visible: visible,
                            onEnter: handleEnter,
                            onExited: handleExited
                        } : null
                }
            >
                {children}
            </PopperTooltip>
        </Portal>
    )

});

export default Popper;