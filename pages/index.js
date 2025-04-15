import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [listings, setListings] = useState([]);
  const prevCount = useRef(0);
  const audioRef = useRef(null);

  const fetchListings = () => {
    fetch('/api/listings')
      .then((res) => res.json())
      .then((data) => {
        if (prevCount.current && data.length > prevCount.current) {
          audioRef.current?.play();
        }
        prevCount.current = data.length;
        setListings(data);
      });
  };

  useEffect(() => {
    fetchListings();
    const interval = setInterval(fetchListings, 60000); // refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Couch Sniper</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.container}>
        <h1 className={styles.title}>🛋️ Couch Sniper Dashboard</h1>
        <p style={{ textAlign: 'center', fontSize: '14px', color: '#888', marginBottom: '1rem' }}>
          Auto-refreshes every 60 seconds — you'll hear a sound if a new listing is added
        </p>
        <audio ref={audioRef} src="/ping.mp3" preload="auto" />
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