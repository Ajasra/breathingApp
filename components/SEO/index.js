import Head from "next/head";

const description = "Breathing timer based on Wim Hof method";
const currentURL = "https://breathing.vasily.onl/";
const previewImage = "https://breathing.vasily.onl/favicon.png";
const siteName = "Breathing app";
const twitterHandle = "@vasily_onl";

export default function SEO({ title }) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="author" content="Vasily Betin" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta charSet="utf-8" />

            {/* Twitter https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup */}
            <meta name="twitter:card" content="summary" key="twcard" />
            <meta name="twitter:title" content={title} key="twtitle" />
            <meta name="twitter:description" content={description} key="twdesc" />
            <meta name="twitter:creator" content={twitterHandle} key="twhandle" />

            {/* Open Graph */}
            <meta property="og:url" content={currentURL} key="ogurl" />
            <meta property="og:image" content={previewImage} key="ogimage" />
            <meta property="og:site_name" content={siteName} key="ogsitename" />
            <meta property="og:title" content={title} key="ogtitle" />
            <meta property="og:type" content="website" key="ogtype" />
            <meta property="og:description" content={description} key="ogdesc" />
            <link rel="icon" href="/favicon.png" />
        </Head>
    );
}
