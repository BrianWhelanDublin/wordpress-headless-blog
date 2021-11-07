import Layout from "../components/Layout"
import "../styles/main.scss"
import Nav from "../components/Nav"

const MyApp = ({ Component, pageProps }) => {
    return (
        <Layout>
            <Nav />
            <Component {...pageProps} />
        </Layout>
    )
}

export default MyApp