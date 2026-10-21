import type { Metadata } from "next";
import { ArticlePage } from "@/components/article/article-page";
import { getArticle } from "@/lib/articles";

const article = getArticle("kak-zapolnit-etrn-pri-subpodryadchikah");

export const metadata: Metadata = {
  title: article.meta.title,
  description: article.meta.description,
};

export default function Page() {
  return <ArticlePage article={article} />;
}
