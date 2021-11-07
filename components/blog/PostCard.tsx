import Image from "next/image";
import styles from "../../styles/modules/PostCard.module.scss";
import { format } from "date-fns";
import Link from "next/link";

const PostCard = ({ post }) => {
  const { author, categories, date, excerpt, featuredImage, id, slug, title } =
    post;

  const dateFormated = format(new Date(date), "MM/dd/yyyy");

  return (
    <div className={styles.blogcard}>
      <Link href="[slug]" as={`/${post.slug}`}>
        <a>
          <div className={styles.image}>
            <Image
              src={featuredImage.node.link}
              alt=""
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        </a>
      </Link>
      <div className={styles.content}>
        <div className={styles.author}>
          <div className={styles["author-image"]}>
            <Image
              src={author.node.avatar.url}
              alt=""
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
          <div className={styles.date}>{dateFormated} -</div>
          <div className={styles["author-name"]}>
            {author.node.firstName} {author.node.lastName}
          </div>
        </div>
        <Link href="[slug]" as={`/${post.slug}`}>
          <a className={styles.title}>{title}</a>
        </Link>
        <div
          className="excerpt"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
        <ul className={styles.categories}>
          {categories &&
            categories.nodes.map((category, index) => (
              <li key={index}> {category.name}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default PostCard;
