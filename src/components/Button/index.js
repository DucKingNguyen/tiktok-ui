import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    rounded = false,
    text = false,
    disabled = false,
    small = false,
    large = false,
    primary = false,
    outline = false,
    rightIcon, // Them icon
    leftIcon,
    className,
    onClick,
    children,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    // Remove evenListener when btn disable
    if (disabled) {
        // cach 1
        // delete props.onClick;
        // cach 2
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className, // custom login
        primary,
        outline,
        small,
        large,
        text,
        disabled,
        rounded,
        rightIcon, // Them icon
        leftIcon,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
