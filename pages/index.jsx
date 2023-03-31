import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.scss";
import { getAllPosts } from "../lib/posts";
import Modeline from "../components/modeline";
import { Fragment } from "react";

export default function Index({ allPosts }) {
  return (
    <>
      <Layout>
        <Head>
          <title>Index</title>
        </Head>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <ul className={utilStyles.list}>
            {allPosts.map((post) => (
              <li className={utilStyles.listItem} key={post.slug}>
                <Fragment>
                  <Link href={`/posts/${post.slug}`}>{post.title} </Link>
                  <div className={utilStyles.lightText}>{post.date}</div>
                </Fragment>
              </li>
            ))}
          </ul>
        </section>
        <Modeline bufferName="Index" />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "author_picture",
    "cover_image",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
}
