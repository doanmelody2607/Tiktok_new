import HeadlessTippy from '@tippyjs/react/headless'; // different import path!
import classNames from 'classnames/bind';
import { useCallback, useEffect, useRef, useState } from 'react';
import AccountItem from '~/components/AccountItem';
import { ClearInputIcon, LoadingInputIcon, SearchIcon } from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import useDebounce from '~/hooks/useDebounce';
import * as searchServices from '~/services/searchServices';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    // State
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    // Ref
    const inputRef = useRef();

    const debouncedValue = useDebounce(searchValue, 600);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        // If has debouncedValue
        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debouncedValue);
            setSearchResult(result);

            setTimeout(() => setLoading(false), 500);
        };

        fetchApi();
    }, [debouncedValue]);

    // Kiểm soát sự thay đổi của input tìm kiếm
    const handleInputChange = (e) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    // Xóa giá trị tìm kiếm
    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = useCallback(() => {
        setShowResult(false);
    }, []);

    // Render dữ liệu tìm kiếm
    const renderSearchResult = (attrs) => (
        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
                <h4 className={cx('search-title')}>Accounts</h4>
                {searchResult.map((result) => (
                    <AccountItem key={result.id} data={result} onClick={handleHideResult} />
                ))}
            </PopperWrapper>
        </div>
    );

    return (
        <div>
            <HeadlessTippy
                visible={showResult && searchResult.length > 0}
                interactive
                render={renderSearchResult}
                onClickOutside={() => setShowResult(false)} // Khi click ra ngoài thì ẩn đi popper search
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        value={searchValue}
                        onChange={handleInputChange}
                        onFocus={() => setShowResult(true)}
                    />

                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <ClearInputIcon />
                        </button>
                    )}

                    {loading && <LoadingInputIcon className={cx('loading')} />}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
