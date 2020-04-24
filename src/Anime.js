import React from 'react';
import './App.css';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_ANIMES = gql`
{
  Page {
        media(isAdult: false, sort: POPULARITY_DESC) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
        }
      }
  }
`;

const GET_ANIME_DETAIL = gql`
query($id: Int) {
            Page {
              media(id: $id) {
                id
                meanScore
                genres
                title {
                  romaji
                  english
                }
                characters {
                  nodes {
                    id
                    description(asHtml: false)
                    image {
                      medium
                    }
                    name {
                      full
                      native
                    }
                  }
                }
                description(asHtml: false)
                countryOfOrigin
                type
                coverImage {
                  large
                }
              }
            }
          }
`;

function AnimeDetail({ id }) {
  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_ANIME_DETAIL,
    {
      variables: { id },
      fetchPolicy: "cache-first"
    }
  );

  if (networkStatus === 4) return "Refetching!";
  if (loading) return null;
  if (error) return `Error!: ${error}`;

  console.log(data);

  return (
    <div>
      <img src={data.Page.media[0].coverImage.large} alt={data.Page.media[0].title.english} style={{ height: 200, width: 200 }} />
      <button onClick={() => refetch()}>Refetch!</button>
    </div>
  );
}

function Animes({onAnimeSelected}) {
  const { loading, error, data } = useQuery(GET_ANIMES);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <select name="anime" onChange={onAnimeSelected}>
      {data.Page.media.map(item => (
        <option key={item.id} value={item.id}>
          {item.title.english}
        </option>
      ))}
    </select>
  );
}

class Anime extends React.Component {
  state = { selectedAnime: null };

  onAnimeSelected = ({ target }) => {
    this.setState(() => ({ selectedAnime: target.value }));
  };

  render() {
    return (
      <div>
      {this.state.selectedAnime && (
            <AnimeDetail id={this.state.selectedAnime} />
          )}
      <Animes onAnimeSelected={this.onAnimeSelected}/>
      </div>
    );
  }
}

export default Anime;
