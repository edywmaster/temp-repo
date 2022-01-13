import './styles.css';

export const SearchInput = ({ searchValue, handleSearch }) => {
    return (
        <input
            onChange={handleSearch}
            value={searchValue}
            className='input-search'
            type="search"
            placeholder='Bucar posts'
        />
    )
}