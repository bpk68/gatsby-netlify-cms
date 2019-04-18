import React from 'react';
import Helmet from 'react-helmet';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import './all.sass';
//import 'prismjs/themes/prism-okaidia.css';
import '../scss/styles.scss';

import useSiteMetadata from './SiteMetadata'
import ScriptsLoader from '../components/ScriptsLoader';


const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();

  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link rel="apple-touch-icon" sizes="57x57" href="/img/icons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/img/icons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/img/icons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/img/icons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/img/icons/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/img/icons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/img/icons/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/img/icons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/img/icons/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/img/icons/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/img/icons/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/img/icons/favicon-16x16.png" />
        <link rel="manifest" href="/img/icons/manifest.json" />
        <link defer href="https://fonts.googleapis.com/css?family=Karla:400,700" rel="stylesheet" />
        <meta name="theme-color" content="#fff" />

        <meta property="og:site_name" content="Kendal Mint Code" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta property="og:image" content="/img/logo.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="Rob Kendal" />
        <meta name="twitter:site" content="@kendalmintcode" />
        <meta name="twitter:creator" content="@kendalmintcode" />

        {/* <script defer src="https://use.fontawesome.com/releases/v5.8.1/js/all.js" integrity="sha384-g5uSoOSBd7KkhAMlnQILrecXvzst9TdC09/VM+pjDTCM+1il8RHz5fKANTFFb+gQ" crossorigin="anonymous"></script> */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=UA-105680907-5"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'UA-105680907-5');
            `,
          }}
        /> */}
      </Helmet>
      <Navbar />
      <div>{children}</div>
      <Footer />

      {/* <script src='/js/app.js' type="text/javascript"></script> */}

      <ScriptsLoader />

      <script id="dsq-count-scr" src="//robkendal.disqus.com/count.js" async></script>
    </div>
  )
}

export default TemplateWrapper
