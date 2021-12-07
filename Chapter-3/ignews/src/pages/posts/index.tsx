import { GetStaticProps } from "next"
import Prismic from "@prismicio/client"
import Head from "next/head"
import React from "react"
import { getPrismicClient } from "../../services/prismic"
import styles from "../../styles/posts.module.scss"
import { RichText } from "prismic-dom"
import Link from "next/link"

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

type PostsProps = {
  posts: Post[]
}

export default function Posts({posts}: PostsProps) {

  return (
    <>
      <Head>
        <title>ig.news | Posts</title>
      </Head>
      
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
          
          
        </div>
      </main>
      
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.predicates.at("document.type", "post")
  ], {
    fetch: ["title", "content"],
    pageSize: 100,
  });

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find(content => content.type === "paragraph")?.text ?? "",
      updatedAt: new Date(post.last_publication_date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      })
    }
  })

  // console.log(JSON.stringify(response, null, 2)) logar com objetos ocultos

  return {
    props: {posts}
  }
}
