export function Navbar() {
  return `
  <nav>
    <a href="index.html"><span>Client Manager</span></a>
    <div id="search-bar">
      <div id="search-btn">
        <span class="material-symbols-outlined">search</span>
      </div>
      <div id="search-field" editable>Search by name...</div>
    </div>
  </nav>
  `
}