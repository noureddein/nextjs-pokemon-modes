// ** React Hooks
import { useEffect, useState } from "react";

// ** Next js Imports
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import styles from "../../styles/Details.module.css";

const POKEMON_BASE_URL = "https://jherr-pokemon.s3.us-west-1.amazonaws.com";

export default function Details() {
    const [pokemon, setPokemon] = useState(null);

    const {
        query: { id },
    } = useRouter();

    useEffect(() => {
        async function getPokemon() {
            try {
                const res = await fetch(
                    `${POKEMON_BASE_URL}/pokemon/${id}.json`
                );
                setPokemon(await res.json());
            } catch (error) {
                console.error("Cannot fetch pokemon!", error);
            }
        }

        if (id) getPokemon();
    }, [id]);

    if (!pokemon) return null;

    const { id: pokemon_id, name, image, type, stats } = pokemon;

    return (
        <div>
            <Head>
                <title>{name}</title>
            </Head>

            <div>
                <Link href="/">Back to home</Link>
            </div>

            <div className={styles.layout}>
                <div>
                    <Image
                        className={styles.picture}
                        src={`${POKEMON_BASE_URL}/${image}`}
                        alt={pokemon.name}
                        width={400}
                        height={400}
                    />
                </div>

                <div>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.type}>{type.join(", ")}</div>

                    <table>
                        <thead className={styles.header}>
                            <tr>
                                <th>Name</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.map(({ name, value }) => (
                                <tr key={name}>
                                    <td className={styles.attribute}>{name}</td>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
