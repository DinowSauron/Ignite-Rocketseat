import { GetStaticPaths, GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../../services/prismic";
import Head from "next/head";
import Link from "next/link";

import styles from "../../../styles/postSlug.module.scss"
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";

interface PostPreviewSlugProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

export default function PostPreviewSlug( { post }: PostPreviewSlugProps ) {
  const session = useSession().data;
  const router = useRouter();

  useEffect(() => {
    if(session?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }
  }, [session]);

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
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content}}
          />

          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
              <a>Subscribe Now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}



export const getStaticPaths: GetStaticPaths = async () => {
  // paths: [ { params: {slug: "slug-name"} } ],
  return {
    paths: [],
    fallback: "blocking"
  }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const {slug} = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID("post", String(slug), {});
  
  try {
    const post = {
      slug,
      title: RichText.asText(response.data.title),
      content: RichText.asHtml(response.data.content.splice(0, 3)),
      updatedAt: new Date(response.last_publication_date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      })
    }

    return {
      props: {post},
      revalidate: 3600 * 1 // 1 day
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