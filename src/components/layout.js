import Footer from './Footer'
import Header from './Header'



export default function Layout({ children }) {
  return (
       <>
        <Header/>
        <div className='mainbody'>
        {children}
        </div>
        <Footer/>
        </>
  )
}
