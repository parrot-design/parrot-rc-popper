import React, { useRef, useEffect, useState } from 'react';
import { useForkRef } from '@parrotjs/react-hooks';
import { createPopper } from '@parrotjs/popperjs';
import Portal from '@parrotjs/react-portal';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function getAnchorEl(anchorEl) {
    return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}
const defaultPopperOptions = {};
const PopperTooltip = React.forwardRef((props, ref) => {
    const { children, target, disablePortal, placement: initialPlacement, TransitionProps, modifiers, popperRef: popperRefProp, popperOptions, visible } = props, other = __rest(props, ["children", "target", "disablePortal", "placement", "TransitionProps", "modifiers", "popperRef", "popperOptions", "visible"]);
    const tooltipRef = useRef(null);
    const handleRef = useForkRef(tooltipRef, ref);
    const popperRef = useRef(null);
    const handlePopperRef = useForkRef(popperRef, popperRefProp);
    const handlePopperRefRef = useRef(handlePopperRef);
    useEffect(() => {
        handlePopperRefRef.current = handlePopperRef;
    }, [handlePopperRef]);
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
        const handlePopperUpdate = (data) => {
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
                fn: ({ state }) => {
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
        const popper = createPopper(getAnchorEl(target), tooltipRef.current, Object.assign(Object.assign({ placement: initialPlacement }, popperOptions), { modifiers: popperModifiers }));
        handlePopperRefRef.current(popper);
        return () => {
            popper.destroy();
            handlePopperRefRef.current(null);
        };
    }, [target, disablePortal, modifiers, visible, popperOptions, initialPlacement]);
    const childProps = { placement };
    if (TransitionProps !== null) {
        childProps.TransitionProps = TransitionProps;
    }
    return (React.createElement("div", Object.assign({ ref: handleRef, role: 'tooltip' }, other), typeof children === 'function' ? children(childProps) : children));
});
const Popper = React.forwardRef((props, ref) => {
    const { disablePortal = false, container, children, transition = false, placement = 'bottom', visible, popperRef, keepMounted = false, popperOptions = defaultPopperOptions, target } = props, restProps = __rest(props, ["disablePortal", "container", "children", "transition", "placement", "visible", "popperRef", "keepMounted", "popperOptions", "target"]);
    const [exited, setExited] = React.useState(true);
    const popperRe1f = useRef(null);
    const handleEnter = () => {
        setExited(false);
    };
    const handleExited = () => {
        setExited(true);
    };
    if (!keepMounted && !visible && (!transition || exited)) {
        return null;
    }
    return (React.createElement(Portal, { disablePortal: disablePortal, container: container, ref: popperRe1f },
        React.createElement(PopperTooltip, Object.assign({ disablePortal: disablePortal, ref: ref, visible: transition ? !exited : visible, placement: placement, popperOptions: popperOptions, popperRef: popperRef, target: target }, restProps, { TransitionProps: transition
                ? {
                    visible: visible,
                    onEnter: handleEnter,
                    onExited: handleExited
                } : null }), children)));
});

export default Popper;
