import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../services/prismic";
import Head from "next/head";

import styles from "../../styles/postSlug.module.scss"

interface PostSlugProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

export default function PostSlug( { post }: PostSlugProps ) {

  return (
    <>
      <Head>
        <title>ig.news | {post.title}</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          
          <div 
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content}}
          />
        </article>
      </main>
    </>
  )
}



export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({req});
  const {slug} = params;

  // console.log('session:',session)

  if(!session?.activeSubscription) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  const prismic = getPrismicClient(req);

  const response = await prismic.getByUID("post", String(slug), {});

  try {
    const post = {
      slug,
      title: RichText.asText(response.data.title),
      content: RichText.asHtml(response.data.content),
      updatedAt: new Date(response.last_publication_date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      })
    }

    return {
      props: {post}
    }
  } catch {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }
}