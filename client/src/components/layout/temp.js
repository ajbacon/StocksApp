class Navbar extends Component {
  render() {
    return (
      <div className='navbar-fixed'>
        <nav className='z-depth-50'>
          <div className='nav-wrapper white'>
            <Link
              to='/'
              style={{ fontFamily: 'monospace' }}
              className='col s5 brand-logo center black-text'
            >
              <i className='material-icons'>trending_up</i>
              StocksApp
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;

<nav>
  <div class='nav-wrapper white'>
    <Link to='/' className='brand-logo' style={{ fontFamily: 'monospace' }}>
      StocksApp
    </Link>
    <Link to='/' className='sidenav-trigger' dataTarget='mobile-demo'>
      <i className='material-icons'>menu</i>
    </Link>
    <ul className='right hide-on-med-and-down'>
      <li>
        <Link to='/'>Logout</Link>
      </li>
    </ul>
  </div>
</nav>;

<div className='navbar-fixed'>
  <nav className='z-depth-50'>
    <div className='nav-wrapper white'>
      <Link
        to='/'
        style={{ fontFamily: 'monospace' }}
        className='col s5 brand-logo center black-text'
      >
        <i className='material-icons'>trending_up</i>
        StocksApp
      </Link>
    </div>
  </nav>
</div>;
