// ** Next js Imports
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import styles from "../../styles/Details.module.css";

const POKEMON_BASE_URL = "https://jherr-pokemon.s3.us-west-1.amazonaws.com";

export async function getServerSideProps({params}){
    let res = []
    try {
        res = await fetch(`${POKEMON_BASE_URL}/pokemon/${params.id}.json`);
    } catch (error) {
        console.error("Cannot fetch pokemon!", error);
    }

    return {
        props: {
            pokemon: await res.json()
        }
    }
}

export default function Details({pokemon}) {
    const { name, image, type, stats } = pokemon;

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
