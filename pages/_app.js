import Layout from "../components/Layout"
import "../styles/main.scss"
import Nav from "../components/Nav"
import { ApolloProvider } from "@apollo/client"
import client from "../lib/apollo"

const MyApp = ({ Component, pageProps }) => {
    return (
        <ApolloProvider client={client} >
            <Layout>
                <Nav />
                <Component {...pageProps} />
            </Layout>
        </ApolloProvider >
    )
}

export default MyApp