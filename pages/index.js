import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch('/api/listings')
      .then((res) => res.json())
      .then((data) => setListings(data));
  }, []);

  return (
    <>
      <Head>
        <title>Couch Sniper</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.container}>
        <h1 className={styles.title}>🛋️ Couch Sniper Dashboard</h1>
        <div className={styles.grid}>
          {listings.map((item, index) => (
            <div key={index} className={styles.card}>
              <img src={item.image} alt={item.title} className={styles.image} />
              <div className={styles.content}>
                <h2>{item.title}</h2>
                <p className={styles.timestamp}>Seen at {item.timestamp}</p>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  View on Facebook
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}