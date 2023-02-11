// ** React Hooks
import { useEffect, useState } from "react";

// ** Next js Imports
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import styles from "../styles/Home.module.css";

const POKEMON_BASE_URL = "https://jherr-pokemon.s3.us-west-1.amazonaws.com";

export default function Home() {
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        async function getPokemon() {
            try {
                const res = await fetch(`${POKEMON_BASE_URL}/index.json`);
                setPokemon(await res.json());
            } catch (error) {
                console.error("Cannot fetch pokemon!", error);
            }
        }

        getPokemon();
    }, []);

    return (
        <>
            <Head>
                <title>Pokemon List App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className={styles.grid}>
                    {pokemon?.map(({ id, image, name }) => (
                        <div className={styles.card} key={id}>
                            <Link href={`/pokemon/${id}`}>
                                    <Image
                                        src={`${POKEMON_BASE_URL}/${image}`}
                                        alt={name}
                                        width={200}
                                        height={200}
                                    />
                                    <h3>{name}</h3>
                            </Link>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}
