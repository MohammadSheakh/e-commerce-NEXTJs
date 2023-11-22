import '@/styles/globals.css'
import {MyProvider} from '../utils/authcontext';

import Layout from "@/layout/layout";

export default function App({ Component, pageProps }) {
  return(

    <Layout>
      <div >
        <Component {...pageProps} />
      </div>
      
    </Layout>
  )
   
}
