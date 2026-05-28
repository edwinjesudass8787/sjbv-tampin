'use client';

import { useState } from 'react';

const postsPerPage = 12;

export default function SocialBoardClient({ posts }) {
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(posts.length / postsPerPage);
  const start = (page - 1) * postsPerPage;
  const visiblePosts = posts.slice(start, start + postsPerPage);

  function goToPage(nextPage) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <section className="social-board" aria-label="Submitted community posts">
        {visiblePosts.map((post) => (
          <button className="social-card" key={post.id} type="button" onClick={() => setSelected(post)}>
            <SocialCardContent post={post} />
          </button>
        ))}
      </section>

      {pageCount > 1 ? (
        <nav className="social-pagination" aria-label="Social Board pagination">
          <button type="button" onClick={() => goToPage(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <div className="social-page-numbers">
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
              <button
                className={pageNumber === page ? 'active' : ''}
                key={pageNumber}
                type="button"
                onClick={() => goToPage(pageNumber)}
                aria-current={pageNumber === page ? 'page' : undefined}
              >
                {pageNumber}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => goToPage(page + 1)} disabled={page === pageCount}>
            Next
          </button>
        </nav>
      ) : null}

      {selected ? (
        <div className="social-modal" role="dialog" aria-modal="true" aria-label={`Post by ${selected.name}`} onClick={() => setSelected(null)}>
          <article className="social-modal-card" onClick={(event) => event.stopPropagation()}>
            <button className="social-modal-close" type="button" onClick={() => setSelected(null)}>
              Close
            </button>
            <SocialCardContent post={selected} expanded />
          </article>
        </div>
      ) : null}
    </>
  );
}

function SocialCardContent({ post, expanded = false }) {
  return (
    <>
      <header className="social-card-header">
        {post.avatarUrl ? (
          <img src={post.avatarUrl} alt="" className="social-avatar" />
        ) : (
          <div className="social-avatar social-avatar-fallback">{post.name.charAt(0)}</div>
        )}
        <div>
          <h2>{post.name}</h2>
          {post.location ? <span>{post.location}</span> : null}
        </div>
      </header>
      {post.message ? <p className="social-message">{post.message}</p> : null}
      {post.imageUrl ? (
        <img
          src={post.imageUrl}
          alt={`Submitted by ${post.name}`}
          className={expanded ? 'social-photo social-photo-expanded' : 'social-photo'}
        />
      ) : null}
      {post.submittedAt ? <time>{post.submittedAt}</time> : null}
    </>
  );
}
