import "./home.css"

function Homepage() {
    return(
        <>
        <nav>
            <ul className="nav-list">
                <li className="active">
                    <a href="index.html" aria-current="page">Home</a>
                </li>
                <li>
                    <a href="about.html">About</a>
                </li>
                <li>
                    <a href="blog.html">Blog</a>
                </li>
                
            </ul>
        </nav>
        <main>
            <h1>Home</h1>
        </main>
    </>
    )
}
export default Homepage