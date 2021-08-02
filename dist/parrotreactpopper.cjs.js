'use strict';

var React = require('react');
var reactHooks = require('@parrotjs/react-hooks');
var popperjs = require('@parrotjs/popperjs');
var Portal = require('@parrotjs/react-portal');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);

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
const PopperTooltip = React__default['default'].forwardRef((props, ref) => {
    const { children, anchorEl, disablePortal, placement: initialPlacement, TransitionProps, modifiers, popperRef: popperRefProp, popperOptions, visible } = props, other = __rest(props, ["children", "anchorEl", "disablePortal", "placement", "TransitionProps", "modifiers", "popperRef", "popperOptions", "visible"]);
    const tooltipRef = React.useRef(null);
    const handleRef = reactHooks.useForkRef(tooltipRef, ref);
    const popperRef = React.useRef(null);
    const handlePopperRef = reactHooks.useForkRef(popperRef, popperRefProp);
    const handlePopperRefRef = React.useRef(handlePopperRef);
    React.useEffect(() => {
        handlePopperRefRef.current = handlePopperRef;
    }, [handlePopperRef]);
    React__default['default'].useImperativeHandle(popperRefProp, () => popperRef.current, []);
    const [placement, setPlacement] = React.useState(initialPlacement);
    React.useEffect(() => {
        if (popperRef.current) {
            popperRef.current.forceUpdate();
        }
    });
    React.useEffect(() => {
        if (!anchorEl || !visible) {
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
        const popper = popperjs.createPopper(getAnchorEl(anchorEl), tooltipRef.current, Object.assign(Object.assign({ placement: initialPlacement }, popperOptions), { modifiers: popperModifiers }));
        handlePopperRefRef.current(popper);
        return () => {
            popper.destroy();
            handlePopperRefRef.current(null);
        };
    }, [anchorEl, disablePortal, modifiers, visible, popperOptions, initialPlacement]);
    const childProps = { placement };
    if (TransitionProps !== null) {
        childProps.TransitionProps = TransitionProps;
    }
    return (React__default['default'].createElement("div", Object.assign({ ref: handleRef, role: 'tooltip' }, other), typeof children === 'function' ? children(childProps) : children));
});
const Popper = React__default['default'].forwardRef((props, ref) => {
    const { disablePortal = false, container, children, transition = false, placement = 'bottom', visible, popperRef, keepMounted = false, popperOptions = defaultPopperOptions, anchorEl } = props, restProps = __rest(props, ["disablePortal", "container", "children", "transition", "placement", "visible", "popperRef", "keepMounted", "popperOptions", "anchorEl"]);
    const [exited, setExited] = React__default['default'].useState(true);
    const popperRe1f = React.useRef(null);
    const handleEnter = () => {
        setExited(false);
    };
    const handleExited = () => {
        setExited(true);
    };
    if (!keepMounted && !visible && (!transition || exited)) {
        return null;
    }
    return (React__default['default'].createElement(Portal__default['default'], { disablePortal: disablePortal, container: container, ref: popperRe1f },
        React__default['default'].createElement(PopperTooltip, Object.assign({ disablePortal: disablePortal, ref: ref, visible: transition ? !exited : visible, placement: placement, popperOptions: popperOptions, popperRef: popperRef, anchorEl: anchorEl }, restProps, { TransitionProps: transition
                ? {
                    visible: visible,
                    onEnter: handleEnter,
                    onExited: handleExited
                } : null }), children)));
});

module.exports = Popper;
