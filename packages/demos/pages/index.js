import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel='icon' href='/static/favicon.ico' />
    </Head>

    <Nav />

    <div className='hero'>
      <h1 className='title'>Camera Stuff with Jimmy</h1>
      <p className='description'>
        Playing with <code>WebRTC</code>
      </p>

      <div className='row'>
        <a href='/hello-world' className='card'>
          <h3>Hello World &rarr;</h3>
          <p>
            Getting started with <code>WebRTC</code>.
          </p>
        </a>
        <a href='/cleanup' className='card'>
          <h3>Cleanup &rarr;</h3>
          <p>
            Stopping the <code>mediaDevices</code>.
          </p>
        </a>
        <a href='/viewfinder' className='card'>
          <h3>Viewfinder &rarr;</h3>
          <p>Making things composable.</p>
        </a>
      </div>

      <div className='row'>
        <a href='/lens' className='card'>
          <h3>Lens &rarr;</h3>
          <p>Even more composable.</p>
        </a>
      </div>

      <div className='row'>
        <a href='/camera' className='card'>
          <h3>Camera &rarr;</h3>
          <p>A full camera.</p>
        </a>
        <a href='/photo-booth' className='card'>
          <h3>Photo Booth &rarr;</h3>
          <p>A basic photo booth.</p>
        </a>
        <a href='/face-detection' className='card'>
          <h3>Face Detection &rarr;</h3>
          <p>Exploring facial recognition.</p>
        </a>
      </div>
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </div>
)

export default Home
