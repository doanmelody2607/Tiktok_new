import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { CheckCircleIcon } from '../Icons';
import AccountPreview from './AccountPreview/AccountPreview';
import styles from './SuggestedAccounts.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview data={data} />
                </PopperWrapper>
            </div>
        );
    };

    return (
        <div>
            <Tippy
                interactive
                delay={[800, 0]}
                offset={[-20, 0]}
                placement="bottom"
                render={renderPreview}
            >
                <div className={cx('account-item')}>
                    <Image className={cx('avatar')} src={data.avatar} alt={data.nickname} />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>{data.nickname}</strong>
                            {data.tick && <CheckCircleIcon className={cx('check')} />}
                        </p>
                        <p className={cx('name')}>{data.name}</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
