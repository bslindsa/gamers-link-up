import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_GAMES } from '../../utils/queries';
import GameList from '../../components/gameList/index';

// import './style.css';

const Home = () => {
  const { loading, data } = useQuery(GET_GAMES);
  const games = data?.games || [];
  console.log(games);

  return (
    <div className="flex-row justify-center">
      <div
        className="col-12 col-md-10 mb-3 p-3"
        style={{ border: '4px groove #1a1a1a' }}
      >
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <GameList
              games={games}
            />
          )}
        </div>
      </div>

    </div>

    // <div>
    //   <div id="parallax">
    //     <h2>div1</h2>
    //   </div>
    //   <div id="dog">
    //     <h2>div2</h2>
    //   </div>
    //   <div>
    //     {/* <!-- <h2>div3</h2> --> */}
    //   </div>
    //   <div id="dog1">
    //     <h2>div4</h2>
    //   </div>
    //   <div>
    //     {/* <!-- <h2>div5</h2> --> */}
    //   </div>
    //   <div id="dog2">
    //     <h2>div6</h2>
    //   </div>
    //   <div>
    //     {/* <!-- <h2>div7</h2> --> */}
    //   </div>
    //   <div id="dog3">
    //     <h2>div8</h2>
    //   </div>
    //   <div>
    //     {/* <!-- <h2>div9</h2> --> */}
    //   </div>
    //   <div id="dog4">
    //     <h2>div10</h2>
    //   </div>
    //   <div>
    //     {/* <!-- <h2>div11</h2> --> */}
    //   </div>
    //   <div id="dog5">
    //     <h2>div12</h2>
    //   </div>
    //   <div>
    //     {/* <!-- <h2>div13</h2> --> */}
    //   </div>
    //   <div id="dog6">
    //     <h2>div14</h2>
    //   </div>
    //   <div>
    //     {/* <!-- <h2>div15</h2> --> */}
    //   </div>
    //   <div id="dog7">
    //     <h2>div16</h2>
    //   </div>
    //   <div>
    //     {/* <!-- <h2>div17</h2> --> */}
    //   </div>
    //   <div id="dog8">
    //     <h2>div18</h2>
    //   </div>
    //   <div>
    //     {/* <!-- <h2>div19</h2> --> */}
    //   </div>
    //   <div id="dog9">
    //     <h2>div20</h2>
    //   </div>
    // </div>
  );
};

export default Home;

