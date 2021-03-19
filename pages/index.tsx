import Head from 'next/head';
// @ts-ignore
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Landing() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mintprint.io | Mint and Print!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://mintprint.io">Mintprint.io!</a>
        </h1>

        <p className={styles.description}>
          Mint and Print NFT Merch!
        </p>

        <div className={styles.grid}>
          <Link href="/mint">
            <a className={styles.card}>
              <h3>Mint and Print &rarr;</h3>
              <p>Click to start minting.</p>
            </a>
          </Link>

          <Link href="/how">
            <a className={styles.card}>
              <h3>How it works? &rarr;</h3>
              <p>Learn how the process works!</p>
            </a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://valist.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/valist.png" alt="Valist Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
