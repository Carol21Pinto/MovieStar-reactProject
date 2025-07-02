import './Navbar.css';

const Navbar = ({ onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value); // calls function from parent (App.js) with the input value
  };
  

  return (
    <nav className="navbar">
      <div className="logo">MOVIE|STAR</div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a movie..."
          onChange={handleInputChange}
        />
      </div>
    </nav>
  );
};
 
export default Navbar;