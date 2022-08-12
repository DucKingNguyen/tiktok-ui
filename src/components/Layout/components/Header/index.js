import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCircleXmark,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faSignOut,
    faSpinner,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import HeadlessTippy from '@tippyjs/react/headless';

import Button from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import images from '~/assets/images';
import styles from './Header.module.scss';
import AccountItem from '~/components/AcountItem';
import Menu from '~/components/Popper/Menu';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';
import { InboxIcon, MessageIcon, SearchIcon, UploadIcon } from '~/components/icon';
import Image from '~/components/image';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: `/feedback`,
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const [searchResult, setSearchResult] = useState([]);
    const currentUser = true;

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 0);
    }, []);

    // Handle Logic
    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: `/@king`,
        },
        {
            icon: <FontAwesomeIcon icon={faBitcoin} />,
            title: 'Get coins',
            to: `/coin`,
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: `/settings`,
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: `/settings`,
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <img src={images.logo} alt="Tiktok" />

                <HeadlessTippy
                    interactive
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder="Search accounts and videos" spellCheck={false} />
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

                        <button className={cx('search-btn')}>
                            <SearchIcon />
                        </button>
                    </div>
                </HeadlessTippy>

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy delay={(0, 50)} content="Upload Video" placement="bottom">
                                <>
                                    <button className={cx('action-btn')}>
                                        <UploadIcon />
                                    </button>
                                </>
                            </Tippy>

                            <Tippy delay={(0, 50)} content="Message" placement="bottom">
                                <>
                                    <button className={cx('action-btn')}>
                                        <MessageIcon />
                                    </button>
                                </>
                            </Tippy>

                            <Tippy delay={(0, 50)} content="Inbox" placement="bottom">
                                <>
                                    <button className={cx('action-btn')}>
                                        <InboxIcon />
                                        <span className={cx('bagde')}>20</span>
                                    </button>
                                </>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button primary>Login</Button>
                        </>
                    )}
                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/7e3ddb7c7fea2d0adca3b8526c749e7f~c5_100x100.jpeg?x-expires=1660230000&x-signature=0sRy%2FUjSQE8j%2F2U3UFEowMbKHR0%3D"
                                alt="Nguyen duc king"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
