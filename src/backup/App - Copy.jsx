
import './App.css'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import ArticleList from './ArticleList'

/* App component */
function App() {

  return (

    <>
      <Header />
      <ArticleList />
      <Footer />
      
    </>

  )
}


export default App



/*

function App() {

  const [count,setCount] = useState(0);
  const [initialVal, setIntialVal] = useState(1000)

  return (
    <>
    <h1> {count} </h1>
    <h1> {initialVal} </h1>
    <button onClick= 
    { 
      () => {
        setCount(count+1)
      } 
    }> Click here </button>
    <br />
    <button onClick= 
    { 
      () => {
        setIntialVal(initialVal+1)
      } 
    }> Change (initial) value by 1 everytime </button>
   
   
    </>
  )
}


*/