import React from 'react'
import Layout from '../../components/Layout'

export default () => (
  <Layout>
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="content">
              <h1>Who's awesome? You're awesome!</h1>
              <img src="https://media.giphy.com/media/111ebonMs90YLu/giphy.gif" alt="Thumbs up" />
              <p>Thank you for signing up for my regular update email. You'll barely regret it!</p>
              <p>In true 'choose your own adventure' style, you can choose where to go next:</p>
              <ul>
                <li>Go <a href="#previous-page" onClick={() => window.location = document.referrer}>back to the previous page</a></li>
                <li><a href="/">Visit the home page</a> or,</li>
                <li>Read some more <a href="/blog">lovely articles</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)
