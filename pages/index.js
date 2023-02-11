// ** React Hooks
import { useEffect, useState } from "react";

// ** Next js Imports
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import styles from "../styles/Home.module.css";

const POKEMON_BASE_URL = "https://jherr-pokemon.s3.us-west-1.amazonaws.com";

export async function getStaticProps(){
    let res = []
    try {
        res = await fetch(`${POKEMON_BASE_URL}/index.json`);
    } catch (error) {
        console.error("Cannot fetch pokemon!", error);
    }

    return {
        props: {
            pokemon: await res.json()
        }
    }
}

export default function Home({pokemon}) {

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
