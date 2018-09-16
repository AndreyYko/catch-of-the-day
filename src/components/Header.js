import React from 'react'
import PropTypes from 'prop-types'
// if we have component contains of one render() method,
// so then we can export only variable with template,
// for improve our performance. Like this
// It`s called Stateless functional component

const Header = props => (
  <header className="top">
    <h1>
      Catch
      <span className="ofThe">
        <span className="of">Of</span>
        <span className="the">The</span>
      </span>
      Day
    </h1>
    <h3 className="tagline">
      <span>{ props.tagLine }</span>
    </h3>
  </header>
)

// export class Header extends React.Component {
//   render() {
//     return (
//       <React.Fragment>
//         <header className="top">
//           <h1>
//             Catch
//             <span className="ofThe">
//               <span className="of">Of</span>
//               <span className="the">The</span>
//             </span>
//             Day
//           </h1>
//           <h3 className="tagline">
//             <span>{ this.props.tagLine }</span>
//           </h3>
//         </header>
//       </React.Fragment>
//     )
//   }
// }

Header.propTypes = {
  tagLine: PropTypes.string.isRequired
}

export default Header