import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { bookCoverStyle, type LibraryBook } from "@/lib/library";

export function BookCover({ book }: { book: LibraryBook }) {
  return (
    <div className="book-volume-cover" style={bookCoverStyle(book)}>
      <span className="book-volume-rule" aria-hidden="true" />
      <div className="book-volume-cover-top">
        <span>THE STUDY ROOM</span>
        <span>VOL. {book.number}</span>
      </div>
      <div className="book-volume-cover-title">
        <span>{book.english}</span>
        <strong>{book.coverSubtitle}</strong>
      </div>
      <div className="book-volume-cover-foot">
        <span>自习室文库</span>
        <span>{book.status === "已上架" ? "AVAILABLE" : "IN PRESS"}</span>
      </div>
    </div>
  );
}

function BookVolumeContent({
  book,
  detail,
}: {
  book: LibraryBook;
  detail: boolean;
}) {
  return (
    <>
      <BookCover book={book} />

      <div className="book-volume-info">
        <div className="book-volume-title">
          <h3>
            {book.title}
            <span>{book.subtitle}</span>
          </h3>
          <span
            className={`book-volume-status${
              book.status === "已上架" ? " is-live" : ""
            }`}
          >
            {book.status}
          </span>
        </div>
        {detail ? (
          <>
            <p>{book.description}</p>
            <div className="book-volume-topics">
              {book.topics.map((topic) => (
                <span key={topic}>{topic}</span>
              ))}
            </div>
          </>
        ) : null}
        <div className="book-volume-foot">
          <span>{book.meta}</span>
          {book.href ? (
            <span className="book-volume-open">
              打开
              <ArrowUpRight />
            </span>
          ) : (
            <span className="book-volume-quiet">尚未上架</span>
          )}
        </div>
      </div>
    </>
  );
}

export function BookVolume({
  book,
  detail = false,
  className = "",
}: {
  book: LibraryBook;
  detail?: boolean;
  className?: string;
}) {
  const classes = `book-volume${book.href ? " is-available" : " is-upcoming"}${
    className ? ` ${className}` : ""
  }`;

  if (book.href) {
    return (
      <Link className={classes} href={book.href} aria-label={`打开${book.title}`}>
        <BookVolumeContent book={book} detail={detail} />
      </Link>
    );
  }

  return (
    <article className={classes}>
      <BookVolumeContent book={book} detail={detail} />
    </article>
  );
}
