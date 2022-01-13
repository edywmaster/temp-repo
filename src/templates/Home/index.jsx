import { Component } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { SearchInput } from '../../components/SearchInput';

export class Home extends Component {

  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 12,
    searchValue: ''
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  handleSearch = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }



  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filterPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLocaleLowerCase());
      })
      : posts;

    return (
      <section className="container">

        <div className='search-container'>
          {!!searchValue && (
            <h4>Busca: {searchValue}</h4>
          )}
          <SearchInput
            searchValue={this.searchValue}
            handleSearch={this.handleSearch}
          />
        </div>

        {filterPosts.length > 0 && (
          <Posts posts={filterPosts} />
        )}

        {filterPosts.length === 0 && (
          <p>Nenhum post localizado</p>
        )}

        <div className='button-container'>
          {!searchValue && (
            <Button
              text="Load More"
              click={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>


      </section>
    );
  }

}

