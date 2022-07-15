import React from 'react';
import {
  Container,
  Form,
  Col,
  Row,
  Label,
  Button
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ParentComponent from './Test';
import NavBar from './NavBar.js';
import axios from 'axios';


const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';
/*
const initialStories = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
  {

    title: 'Reducer',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 2,
  },
  {
    title: 'Bootstrap',
    url: 'https://getbootstrap.com',
    author: 'Bootstrap Core Team',
    num_comments: 2,
    points: 5,
    objectID: 3,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 4,
  },
];
const getAsyncStories = () =>
  new Promise((resolve, reject) =>
    setTimeout(reject, 2000)
  );
*/

const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          story => action.payload.objectID !== story.objectID
        ),
      };

    default:
      throw new Error();
  }

};

const Item = ({ item, onRemoveItem }) => {

  return (
    <div className="d-grid gap-2 d-md-flex justify-content-mdNavBar-start">
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <button type="button" className="btn btn-outline-secondary"
        onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </div>
  );
};

const List = ({ list, onRemoveItem }) =>
  list.map(item => (
    <Item
      key={item.objectID}
      item={item}
      onRemoveItem={onRemoveItem}
    />
  ));



const InputWithLabel = ({ id, value, type, isFocused, onInputChange, children }) => {

  return (
    <>
      <Form.Label htmlFor='search'>{children} </Form.Label>
      &nbsp;
      <Form.Control
        id={id}
        type={type}
        value={value}
        name="search"
        autoFocus={isFocused}
        onChange={onInputChange}
      />

    </>
  );
}

const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
}) => (
  <form onSubmit={onSearchSubmit}>

    <div className="rows">
      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={onSearchInput}
      >
        <strong>Search:</strong>
      </InputWithLabel>
      <Form.Text className="text-muted">
        You'r searching for: <strong>{searchTerm}</strong>
      </Form.Text>
      <div class="col-4">
        <button type="submit" className='btn btn-dark' disabled={!searchTerm}>
          Submit
        </button>
      </div>
    </div>
  </form>

);

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);
  return [value, setValue];
}

const App = () => {

  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React');
  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
  );
  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false });

  // const [isLoading, setIsLoading] = React.useState(false);
  //const [isError, setIsError] = React.useState(false);


  //use effect for async data
  const handleFetchStories = React.useCallback(async () => {
    if (searchTerm === '') return;
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
    try {
      const result = await axios.get(url);

      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }


    //setIsError(true)
    //setStories(null);
  }, [url]);
  React.useEffect(() => {
    handleFetchStories(); // C
  }, [handleFetchStories]); // D



  const handleRemoveStory = item => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };


  const handleSearchSubmit = event => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
    event.preventDefault();

  };

  const handleSearchInput = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <>

      <Container>
        <SearchForm
          searchTerm={searchTerm}
          onSearchInput={handleSearchInput}
          onSearchSubmit={handleSearchSubmit}
        />
        {/*a true && 'Hello World' always evaluates to ‘Hello World’. Afalse && 'Hello World' 
          always evaluates to false.*/
        }
        {stories.isError && <p>Something went wrong ...</p>}

        {stories.isLoading ? (
          <p>Loading ...</p>
        ) : (
          <List list={stories.data} onRemoveItem={handleRemoveStory} />
        )}
      </Container>

      <hr />
    </>

  );
}
export default App;
